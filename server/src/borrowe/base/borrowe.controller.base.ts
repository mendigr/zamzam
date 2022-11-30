/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/docs/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { BorroweService } from "../borrowe.service";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { BorroweCreateInput } from "./BorroweCreateInput";
import { BorroweWhereInput } from "./BorroweWhereInput";
import { BorroweWhereUniqueInput } from "./BorroweWhereUniqueInput";
import { BorroweFindManyArgs } from "./BorroweFindManyArgs";
import { BorroweUpdateInput } from "./BorroweUpdateInput";
import { Borrowe } from "./Borrowe";
@swagger.ApiBearerAuth()
@common.UseGuards(defaultAuthGuard.DefaultAuthGuard, nestAccessControl.ACGuard)
export class BorroweControllerBase {
  constructor(
    protected readonly service: BorroweService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Borrowe",
    action: "create",
    possession: "any",
  })
  @common.Post()
  @swagger.ApiCreatedResponse({ type: Borrowe })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(@common.Body() data: BorroweCreateInput): Promise<Borrowe> {
    return await this.service.create({
      data: data,
      select: {
        amount: true,
        comments: true,
        createdAt: true,
        event: true,
        id: true,
        itemId: true,
        personId: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Borrowe",
    action: "read",
    possession: "any",
  })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Borrowe] })
  @swagger.ApiForbiddenResponse()
  @ApiNestedQuery(BorroweFindManyArgs)
  async findMany(@common.Req() request: Request): Promise<Borrowe[]> {
    const args = plainToClass(BorroweFindManyArgs, request.query);
    return this.service.findMany({
      ...args,
      select: {
        amount: true,
        comments: true,
        createdAt: true,
        event: true,
        id: true,
        itemId: true,
        personId: true,
      },
    });
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Borrowe",
    action: "read",
    possession: "own",
  })
  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: Borrowe })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: BorroweWhereUniqueInput
  ): Promise<Borrowe | null> {
    const result = await this.service.findOne({
      where: params,
      select: {
        amount: true,
        comments: true,
        createdAt: true,
        event: true,
        id: true,
        itemId: true,
        personId: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @nestAccessControl.UseRoles({
    resource: "Borrowe",
    action: "update",
    possession: "any",
  })
  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: Borrowe })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: BorroweWhereUniqueInput,
    @common.Body() data: BorroweUpdateInput
  ): Promise<Borrowe | null> {
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          amount: true,
          comments: true,
          createdAt: true,
          event: true,
          id: true,
          itemId: true,
          personId: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @nestAccessControl.UseRoles({
    resource: "Borrowe",
    action: "delete",
    possession: "any",
  })
  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: Borrowe })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: BorroweWhereUniqueInput
  ): Promise<Borrowe | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          amount: true,
          comments: true,
          createdAt: true,
          event: true,
          id: true,
          itemId: true,
          personId: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}