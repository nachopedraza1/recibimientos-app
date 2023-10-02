import mongoose, { Model, Schema } from "mongoose";


const configSchema = new Schema({
    activeMatch: { type: String, required: true },
}, {
    timestamps: {
        currentTime: () => new Date().getTime() - 3 * 60 * 60 * 1000,
    }
});

const configModel: Model<{ activeMatch: string }> = mongoose.models.Config || mongoose.model('Config', configSchema);

export default configModel;