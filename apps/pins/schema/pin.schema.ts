import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "apps/user/schema/user.schema";
import { Types } from "mongoose";



@Schema({ timestamps: true })
export class Pin {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId


  @Prop({ required: true })
  publicId: string

  @Prop({ enum: ["image", "video"], required: true })
  type: "image" | "video"

  @Prop({ required: true })
  url: string

  @Prop()
  width: number

  @Prop()
  height: number

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  link: string

  @Prop({ default: [] })
  tags: string[]

  @Prop({ default: "draft" })
  status: "draft" | "published"

  @Prop({ default: true })
  allowComments: boolean

  @Prop({ default: 0, min: 0 })
  likesCount: number
 
  @Prop({ default: 0, min: 0 })
  CommentsCount: number

  @Prop({ type: Date })
  createdAt: Date
}

export const PinSchema = SchemaFactory.createForClass(Pin)