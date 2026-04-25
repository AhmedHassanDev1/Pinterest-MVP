import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Like {

    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId

    @Prop({ type: Types.ObjectId, required: true })
    pinId: Types.ObjectId

    @Prop({ type: Date })
    createdAt: Date

}

export const LikeSchema = SchemaFactory.createForClass(Like)

LikeSchema.index({ userId: 1, pinId: 1 }, { unique: true })