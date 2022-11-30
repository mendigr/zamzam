import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { KindServiceBase } from "./base/kind.service.base";

@Injectable()
export class KindService extends KindServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
