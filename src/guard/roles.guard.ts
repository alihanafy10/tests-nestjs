import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean>  {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);
    
      if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
      const user = request["authUser"];

      console.log("role",user,"************************");
    //   console.log(roles.includes(user.role));
     
      
      
    //  if(!roles.includes(user.role))  throw new ForbiddenException('You do not have permission to access this route');
      return true
  }
}



