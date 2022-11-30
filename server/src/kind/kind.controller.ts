import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { KindService } from "./kind.service";
import { KindControllerBase } from "./base/kind.controller.base";

@swagger.ApiTags("kinds")
@common.Controller("kinds")
export class KindController extends KindControllerBase {
  constructor(
    protected readonly service: KindService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
