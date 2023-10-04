import mongoose, { Model, Schema } from "mongoose";
import { IMatch } from "@/interfaces";

export const matchSchema = new Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    objectiveAmount: { type: Number, required: true },
    dateEvent: { type: String, required: true },
}, {
    timestamps: {
        currentTime: () => new Date().getTime() - 3 * 60 * 60 * 1000,
    }
});

const matchModel: Model<IMatch> = mongoose.models.Match || mongoose.model('Match', matchSchema);

export default matchModel;