// import { ObjectType, Field } from 'type-graphql';

// @ObjectType()
export class AccessToken {
  // @Field({ nullable: true })
  access_token: string;

  // @Field({ nullable: true })
  refresh_token: string;

  // @Field()
  id: string;
}
