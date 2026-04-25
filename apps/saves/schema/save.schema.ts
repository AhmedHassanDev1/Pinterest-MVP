import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Save {
    @Prop({ type: Types.ObjectId, required: true })
    userId: string

    @Prop({ type: Types.ObjectId, required: true })
    pinId: string

    @Prop({ type: Types.ObjectId, default: null })
    boardId: Types.ObjectId

    @Prop({ type: Date, default: new Date() })
    createdAt: Date
}

export const SaveSchema = SchemaFactory.createForClass(Save)

SaveSchema.index({
    pinId: 1,
    boardId: 1
}, { unique: true })