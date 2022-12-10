import { UserEntity } from './models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([UserEntity])
    ] , 
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}