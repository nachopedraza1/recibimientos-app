import mongoose, { Model, Schema } from "mongoose";
import { IExpenses } from "@/interfaces";

const ExpenseSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
}, {
    timestamps: true
});

const expenseModel: Model<IExpenses> = mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);

export default expenseModel;