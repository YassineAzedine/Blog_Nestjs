import { UserEntity } from './user/models/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),   
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: process.env.DB_Name,
    entities: [UserEntity],
    synchronize: true,
  }), UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
