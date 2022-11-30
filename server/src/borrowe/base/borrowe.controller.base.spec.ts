import { Test } from "@nestjs/testing";
import {
  INestApplication,
  HttpStatus,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { map } from "rxjs";
import { BorroweController } from "../borrowe.controller";
import { BorroweService } from "../borrowe.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  amount: 42,
  comments: "exampleComments",
  createdAt: new Date(),
  event: "exampleEvent",
  id: "exampleId",
  itemId: "exampleItemId",
  personId: "examplePersonId",
};
const CREATE_RESULT = {
  amount: 42,
  comments: "exampleComments",
  createdAt: new Date(),
  event: "exampleEvent",
  id: "exampleId",
  itemId: "exampleItemId",
  personId: "examplePersonId",
};
const FIND_MANY_RESULT = [
  {
    amount: 42,
    comments: "exampleComments",
    createdAt: new Date(),
    event: "exampleEvent",
    id: "exampleId",
    itemId: "exampleItemId",
    personId: "examplePersonId",
  },
];
const FIND_ONE_RESULT = {
  amount: 42,
  comments: "exampleComments",
  createdAt: new Date(),
  event: "exampleEvent",
  id: "exampleId",
  itemId: "exampleItemId",
  personId: "examplePersonId",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

const aclFilterResponseInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle().pipe(
      map((data) => {
        return data;
      })
    );
  },
};
const aclValidateRequestInterceptor = {
  intercept: (context: ExecutionContext, next: CallHandler) => {
    return next.handle();
  },
};

describe("Borrowe", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: BorroweService,
          useValue: service,
        },
      ],
      controllers: [BorroweController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .overrideInterceptor(AclFilterResponseInterceptor)
      .useValue(aclFilterResponseInterceptor)
      .overrideInterceptor(AclValidateRequestInterceptor)
      .useValue(aclValidateRequestInterceptor)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /borrowes", async () => {
    await request(app.getHttpServer())
      .post("/borrowes")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
      });
  });

  test("GET /borrowes", async () => {
    await request(app.getHttpServer())
      .get("/borrowes")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
        },
      ]);
  });

  test("GET /borrowes/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/borrowes"}/${nonExistingId}`)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        statusCode: HttpStatus.NOT_FOUND,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /borrowes/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/borrowes"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
