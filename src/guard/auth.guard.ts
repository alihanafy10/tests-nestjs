import { Injectable, CanActivate, ExecutionContext,  BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/schemas/user.schemas';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {
      const request = context.switchToHttp().getRequest();
      
    //check if there is a token in headers
    const { token } = request.headers
    if(!token) throw new BadRequestException('token not found')

    //check tocken prefex
    if(!token.startsWith('test'))throw new BadRequestException('token not valid')
    //split token
    const originalToken = token.split(' ')[1];
    //decode token
    const data=this.jwtService.verify(originalToken,{secret:"mysecretKey"})
    if(!data._id)throw new BadRequestException('token not valid')
    //find user in db
    const user = await this.userModel.findById(data._id)
    if(!user)throw new BadRequestException('token not valid')
    //inject user data in request
    request.authUser = user
    console.log("auth",request.authUser,"************************");
    
    return true;
  }
}