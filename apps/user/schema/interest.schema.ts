import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schema";

@Schema({ id: true })
export class Interest {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    parentId?: Types.ObjectId;
}

export const InterestSchema = SchemaFactory.createForClass(Interest)
