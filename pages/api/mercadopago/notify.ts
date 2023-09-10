import type { NextApiRequest, NextApiResponse } from 'next'
import mercadopago from 'mercadopago';

import { db } from '@/database';
import { Entry } from '@/models';

mercadopago.configure({
    access_token: process.env.SECRET_MP!
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const topic = req.query.topic || req.query.type;
    const paymentId = req.query.id || req.query["data.id"];

    try {

        if (topic === "payment") {
            
            const { body } = await mercadopago.payment.findById(Number(paymentId));

            await db.connect()
            const entry = await Entry.findOne({ paymentId });

            if (!entry) {
                const newEntry = new Entry({
                    name: body.additional_info.payer.first_name,
                    amount: body.transaction_details.total_paid_amount,
                    method: 'mercadopago',
                    status: body.status,
                    paymentId
                })
                await newEntry.save();
                await db.disconnect();
                return;
            }

            entry.status = body.status;
            await entry.save();
            await db.disconnect();
        }
        return res.status(200).json({ message: "Payment approved." })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error, check logs in server." })
    }

}