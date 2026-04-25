import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class User {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop({ unique: true, index: true, lowercase: true, trim: true })
    userName: string

    @Prop({ unique: true, required: true })
    email: string

    @Prop({ enum: ["LOCAL", "GOOGLE"], default: "LOCAL", required: true })
    provider: "LOCAL" | "GOOGLE"

    @Prop()
    password: string

    @Prop({ default: 0, min: 0 })
    onboardingStep: number

    @Prop()
    createdAt: Date


}

export const UserSchema = SchemaFactory.createForClass(User)

