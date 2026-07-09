import mongoose, { Schema, type Document} from "mongoose";

export interface IMessage extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
    updatedAT: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        chat: {
            type: Schema.Types.ObjectId, 
            ref: "Message",
            require: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
)

MessageSchema.index({chat:1,createdAt:1})
// 1 means ascending order, for descending use -1

export const Message = mongoose.model('Message', MessageSchema)