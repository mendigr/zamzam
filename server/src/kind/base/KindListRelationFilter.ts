/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { KindWhereInput } from "./KindWhereInput";
import { ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class KindListRelationFilter {
  @ApiProperty({
    required: false,
    type: () => KindWhereInput,
  })
  @ValidateNested()
  @Type(() => KindWhereInput)
  @IsOptional()
  @Field(() => KindWhereInput, {
    nullable: true,
  })
  every?: KindWhereInput;

  @ApiProperty({
    required: false,
    type: () => KindWhereInput,
  })
  @ValidateNested()
  @Type(() => KindWhereInput)
  @IsOptional()
  @Field(() => KindWhereInput, {
    nullable: true,
  })
  some?: KindWhereInput;

  @ApiProperty({
    required: false,
    type: () => KindWhereInput,
  })
  @ValidateNested()
  @Type(() => KindWhereInput)
  @IsOptional()
  @Field(() => KindWhereInput, {
    nullable: true,
  })
  none?: KindWhereInput;
}
export { KindListRelationFilter };
