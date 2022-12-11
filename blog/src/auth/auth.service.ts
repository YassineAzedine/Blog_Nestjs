import { Observable , from , of} from 'rxjs';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/service/user.service';
import { User } from 'src/user/models/user.intrface';
import bcrypt =  require ('bcrypt')

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService) { }
    generateJWT(user: User): Observable<string> {
        return from(this.jwtService.signAsync({ user }))

    }
    hashpassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12))
    }
    comparePassword(newPassword: string, passwordHash: string): Observable<any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassword, passwordHash))


    }
}
