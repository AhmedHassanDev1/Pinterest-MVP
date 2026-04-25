import { Field, InputType, Int, ObjectType, registerEnumType, } from "@nestjs/graphql";


export enum PinStatus {
    draft="draft",
    publish="publish"
}

registerEnumType(PinStatus, {
    name: 'PinStatus',
});



@ObjectType() 
export class Pin {
    @Field()
    id: string;

    @Field()
    userId: string

    @Field()
    url: string;

    @Field(() => Int)
    width: number

    @Field(() => Int)
    height: number

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    link: string;

    @Field(() => [String],{nullable:true})
    tags: string[];

    @Field(() => PinStatus)
    status: PinStatus

    @Field(() => Boolean)
    allowComments: Boolean;

    @Field(() => Int)
    likesCount: number

    @Field(() => Int)
    CommentsCount: number

    @Field()
    createdAt: string;


}


@InputType()
export class CreatePinInput {
    @Field()
    userId:string

    @Field()
    type: string

    @Field()
    url: string

    @Field()
    publicId: string
  
    @Field(() => Int)
    width: Number

    @Field(() => Int)
    height: Number
}


@InputType()
export class PublishPinInput {

    @Field()
    userId:string

    @Field()
    type: string

    @Field()
    url: string

    @Field()
    publicId: string

  
    @Field(() => Int)
    width: Number

    @Field(() => Int)
    height: Number

}