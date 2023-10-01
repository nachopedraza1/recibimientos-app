import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '@/database';
import { Match } from '@/models';
import { format } from '@/utils';

import { IMatch, PaginationData } from '@/interfaces'

type Data =
    | { message: string }
    | PaginationData

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {

        case 'GET':
            return getMatches(req, res);

        case 'POST':
            return createMatch(req, res);

        default:
            return res.status(400).json({ message: 'Method not allowed.' })
    }

}

const getMatches = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const page = parseInt(req.query.page as string) || 1;
    const perPage = 10;

    await db.connect();

    try {

        const [
            rows,
            totalRows,
        ] = await Promise.all([
            Match.find()
                .sort({ createdAt: -1 })
                .select('name active objectiveAmount dateEvent')
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean(),
            Match.find().count(),
        ]);

        /* await db.disconnect(); */

        const formatRows = rows.map(row => {
            return {
                ...row,
                objectiveAmount: `$${format(row.objectiveAmount)}`
            }
        })

        return res.status(200).json({
            rows: formatRows,
            totalRows,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' })
    }
}


const createMatch = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { dateEvent, name, objectiveAmount }: IMatch = req.body;

    if (!dateEvent) return res.status(400).json({ message: 'La fecha es requerida.' });
    if (!name) return res.status(400).json({ message: 'El título es requerido.' })
    if (!objectiveAmount) return res.status(400).json({ message: 'El objetivo es requerido.' });

    try {
        await db.connect();

        const exist = await Match.findOne({ name });
        if (exist) return res.status(400).json({ message: 'Este recibimiento ya existe.' });

        const newMatch = new Match({
            name,
            dateEvent,
            objectiveAmount,
            active: false,
        })

        await newMatch.save();

        return res.status(200).json({ message: 'Recibimiento creado con éxito.' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar logs del servidor.' });
    }

}