import mongoose, { Model, Schema } from "mongoose";
import { User } from "@/models";
import { IEntry } from "@/interfaces";
import moment from 'moment-timezone';

const entrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: User },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, },
    paymentId: { type: String, unique: true },
    method: {
        type: String,
        required: true,
        enum: {
            values: ['mercadopago', 'paypal', 'transferencia'],
            message: '{VALUE} not a valid value',
        }
    },
}, {
    timestamps: {
        //@ts-ignore
        currentTime: () => {
            let date = new Date();
            let newDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000 * -1));
            return newDate;
        },
    }
});

const entryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default entryModel;