import { Module } from "@nestjs/common";
import { KindModuleBase } from "./base/kind.module.base";
import { KindService } from "./kind.service";
import { KindController } from "./kind.controller";

@Module({
  imports: [KindModuleBase],
  controllers: [KindController],
  providers: [KindService],
  exports: [KindService],
})
export class KindModule {}
