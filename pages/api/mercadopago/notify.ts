import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';

type Data = {
    name: string
}

mercadopago.configure({
    access_token: process.env.SECRET_MP!
})

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const topic = req.query.topic || req.query.type;

    console.log(req.query, topic);
    console.log("asdasd");

    try {

        if (topic === "payment") {
            const paymentId = req.query.id || req.query["data.id"];
            const payment = await mercadopago.payment.findById(Number(paymentId));

            return res.status(200).json({ message: "OK", payment })
        }

        return res.status(200).json({ message: "NO" })

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "OFF" })
    }

}