import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { BorroweService } from "./borrowe.service";
import { BorroweControllerBase } from "./base/borrowe.controller.base";

@swagger.ApiTags("borrowes")
@common.Controller("borrowes")
export class BorroweController extends BorroweControllerBase {
  constructor(
    protected readonly service: BorroweService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
