import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema()
export class PinInterest {

    @Prop({ type: Types.ObjectId, ref: 'Pin', required: true })
    pinId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Interest', required: true })
    interestId: Types.ObjectId;

}

export const PinInterestSchema = SchemaFactory.createForClass(PinInterest)