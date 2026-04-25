import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.schema";
import { Interest } from "./interest.schema";

@Schema()
export class UserInterest {

  @Prop({ type: Types.ObjectId, ref: User.name , required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Interest.name, required: true })
  interestId: Types.ObjectId;

}

export const UserInterestSchema = SchemaFactory.createForClass(UserInterest)

UserInterestSchema.index({userId:1,interestId:1},{unique:true})