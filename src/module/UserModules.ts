import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "../controller/AuthController";
import { UserRepository } from "../repository/UserRepository";
import { UserService } from "../service/UserService";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [UserService],
})

export class UserModule {
}