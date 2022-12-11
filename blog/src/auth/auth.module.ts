import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';

@Module({
    imports : [
        JwtModule.registerAsync({
            imports : [ ConfigModule],
            inject : [ConfigService],
            useFactory : async (configService : ConfigService)=>({
                secret : configService.get('JWT_SECRETE'),
                signOptions : {expiresIn :'100s'}
            })
        })
    ],
    providers : [AuthService],
    exports : [AuthService]
})
export class AuthModule {}
