import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { BorroweServiceBase } from "./base/borrowe.service.base";

@Injectable()
export class BorroweService extends BorroweServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
