import mongoose, { Model, Schema } from "mongoose";
import { User } from "@/models";
import { IMatch } from "@/interfaces";

export const matchSchema = new Schema({
    matchName: { type: String, required: true },
    entries: [{
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
            currentTime: () => new Date().getTime() - 3 * 60 * 60 * 1000,
        }
    }]
});

const matchModel: Model<IMatch> = mongoose.models.Match || mongoose.model('Match', matchSchema);

export default matchModel;