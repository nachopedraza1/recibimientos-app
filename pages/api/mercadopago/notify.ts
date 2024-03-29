import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';

import { db } from '@/database';
import { Entry, Match } from '@/models';

mercadopago.configure({
    access_token: process.env.SECRET_MP!
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const topic = req.query.topic || req.query.type;
    const paymentId = req.query.id || req.query["data.id"];
    
    try {

        if (topic === "payment") {

            const { body } = await mercadopago.payment.findById(Number(paymentId)); 

            if (body.status === "rejected") return res.status(400).json({ message: "Pago rechazado." });


            if (body.status === 'approved') {
                await db.connect();
                const entry = await Entry.findOne({ paymentId });

                const category = await Match.findOne({ active: true });

                if (!entry) {
                    const newEntry = new Entry({
                        userId: body.additional_info.items[0].id,
                        name: body.additional_info.payer.first_name,
                        amount: body.transaction_details.total_paid_amount,
                        category: category?.name,
                        method: 'mercadopago',
                        status: body.status,
                        paymentId
                    });
                    
                    await newEntry.save();
                    /* await db.disconnect(); */
                    return res.status(200).json({ message: "Pago completado con éxito." });
                }

                entry.status = body.status;
                await entry.save();
                /* await db.disconnect(); */
                return res.status(200).json({ message: "Pago actualizado con éxito." });
            }

            return res.status(200).json({ message: "Pago pendiente." });
        }

        return res.status(200).json({ message: "Pago pendiente." });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Algo ha salido mal. Por favor, comuníquese con un administrador.' });
    }

}