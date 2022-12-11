import { UserEntity } from './../models/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable ,throwError } from 'rxjs';
import { User } from '../models/user.intrface';
import { AuthService } from 'src/auth/auth.service';
import { switchMap , map, catchError ,} from 'rxjs/operators'

@Injectable()
export class UserService {
constructor(
    @InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity> ,
    private authService : AuthService

){}
create(user:User):Observable<User>{
    console.log(user)

    return this.authService.hashpassword(user.password).pipe(
        switchMap((passwordHash:string)=>{
            const newUser = new UserEntity();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash ; 
            console.log(newUser)
            return from(this.userRepository.save(newUser)).pipe(
                map((user:User)=>{
                    const {password , ...result} = user
                    return result
                }),
                catchError(err =>throwError(err))
            )


        })
    )

}
findOne(id : number):Observable<User>{
    return from(this.userRepository.findOneBy({id})).pipe(
        map((user:User)=>{const {password , ...result } = user ; return result })
    )
}
findAll():Observable<User[]>{
    return from(this.userRepository.find()).pipe(map((users)=>{users.forEach(function(v){delete v.password }) ;return users}))
}
deleteOne(id:number) : Observable<any>{
    return from(this.userRepository.delete(id))
}
updateOne(id:number , user:User): Observable<any>{
    delete user.email ;
    delete user.password

return from(this.userRepository.update(id , user))
}
login(user:User) : Observable<string>{
    console.log(user)
    return this.validateUser(user.email , user.password).pipe(
        switchMap((user : User)=>{
            if(user){
                return this.authService.generateJWT(user).pipe(map((jwt:string)=>jwt))
            }
        })
    )
}
validateUser(email:string , password : string): Observable<User>{
    console.log(email)

    return this.findbyMail(email).pipe(switchMap((user:User)=>this.authService.comparePassword(password,user.password).pipe(
        map((match:boolean)=>{
            if(match){
                const {password,...result} = user
                return result
            }
        })
    )))
   

}
findbyMail(email : string) : Observable<User>{
    console.log(email)
    return from(this.userRepository.findOneBy({email}))
    
    }



}
