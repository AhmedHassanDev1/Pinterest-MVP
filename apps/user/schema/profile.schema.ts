import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type ProfileDocument = Profile & Document;

@Schema({ _id: false })
class Avatar {
    @Prop({ required: true })
    publicId: string;

    @Prop({ required: true })
    url: string;
}

@Schema({ timestamps: true })
export class Profile {
    @Prop({ type: Avatar })
    avatar?: Avatar;

    @Prop()
    about?: string;

    @Prop({ enum: ['male', 'female'], default: 'male' })
    gender: string;

    @Prop()
    location?: string;

    @Prop()
    language?: string;

    @Prop()
    website?: string;

    @Prop({ type: Date })
    birthDate?: Date;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({ default: 0 })
    followerCount: number;

    @Prop({ default: 0 })
    followingsCount: number;

    @Prop({ type: Types.ObjectId, required: true, unique: true , ref:User.name })
    user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);