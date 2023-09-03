import { IEntry } from "@/interfaces";
import mongoose, { Model, Schema } from "mongoose";

const entrySchema = new Schema({
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true }
});

const entryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default entryModel;