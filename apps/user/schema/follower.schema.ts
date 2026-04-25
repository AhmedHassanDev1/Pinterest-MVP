import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema()
export class Follower {
  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
  followerId: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
  followingId: mongoose.Types.ObjectId
}

export const FollowerSchema = SchemaFactory.createForClass(User)

FollowerSchema.index({followerId: 1, followingId: 1}, { unique: true })