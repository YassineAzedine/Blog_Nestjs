import { AuthModule } from './../auth/auth.module';
import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthService } from './../auth/auth.service';


@Module({
    imports : [
        TypeOrmModule.forFeature([UserEntity]),
AuthModule 
    ] , 
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
