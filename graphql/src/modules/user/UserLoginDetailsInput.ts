import { InputType, Field } from "type-graphql"

@InputType()
export class UserLoginDetailsInput {
  @Field() userName: string;
  @Field() password: string;
}