import mongoose, { Model, Schema } from "mongoose";
import { IExpenses } from "@/interfaces";

const ExpenseSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
}, {
    timestamps: {
        currentTime: () => new Date().getTime() - 3 * 60 * 60 * 1000,
    }
});

ExpenseSchema.index({ name: 'text' });

const expenseModel: Model<IExpenses> = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default expenseModel;