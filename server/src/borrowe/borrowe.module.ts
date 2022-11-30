import { Module } from "@nestjs/common";
import { BorroweModuleBase } from "./base/borrowe.module.base";
import { BorroweService } from "./borrowe.service";
import { BorroweController } from "./borrowe.controller";

@Module({
  imports: [BorroweModuleBase],
  controllers: [BorroweController],
  providers: [BorroweService],
  exports: [BorroweService],
})
export class BorroweModule {}
