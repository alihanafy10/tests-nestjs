import { MiddlewareConsumer, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { LoggerMiddleware } from "./midlleware/logger.middleware";
import { UserModel } from "src/schemas/user.schemas";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [UserModel],
    controllers: [UserController],
    providers:[UserService,JwtService],
})
export class UserModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(UserController);
  }
}