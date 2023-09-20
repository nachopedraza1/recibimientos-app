import { Model, Schema, model, models } from "mongoose";
import { IUser } from "@/interfaces";

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    totalDonated: { type: Number, required: true },
    countDonations: { type: Number, required: true },
    role: {
        type: String,
        enum: {
            required: true,
            values: ['user', 'admin'],
            message: '{VALUE} is an invalid role.'
        }
    }
}, {
    timestamps: true
});

const userModel: Model<IUser> = models.User || model('User', userSchema);

export default userModel;