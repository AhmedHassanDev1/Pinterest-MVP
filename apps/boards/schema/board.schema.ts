import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({ timestamps: true })
export class Board {

    @Prop({ type: Types.ObjectId, required: true })
    userId: Types.ObjectId

    @Prop()
    name: string

    @Prop()
    description: string

    @Prop({ default: false })
    private: boolean

    @Prop({ default: 0, min: 0 })
    pinsCount: number

    @Prop({ type: Types.ObjectId, default: null })
    parentBoard: Types.ObjectId | null

}

export const BoardSchema = SchemaFactory.createForClass(Board)

BoardSchema.index({
    userId: 1,
    name: 1
}, { unique: true })