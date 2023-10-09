import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { InstagramResponse, Post } from '@/interfaces';

type Data =
    | { message: string }
    | Post[]

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method === 'GET') {

        try {
            const { data: { data } } = await axios.get<InstagramResponse>(`https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp,username&access_token=${process.env.INSTAGRAM_TOKEN!}&limit=8`);
            const postsData = data.filter(({ media_type }) => media_type === "IMAGE" || media_type === "CAROUSEL_ALBUM");
            return res.status(200).json(postsData);

        } catch (error) {
            console.log(error);
            return res.status(400).json([])
        }

    }

    return res.status(500).json({ message: 'Method not allowed.' })
}