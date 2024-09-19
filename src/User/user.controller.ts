import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Req, Res, UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { Response } from "express";
import { SignUpDto } from "./dto";
import { signUpResponse } from "./interfaces";
import { ZodValidationPipe } from "./validation/zod.validation";
import { createCatSchema, querySchema } from "./user.schema";
import { AuthGuard } from "src/guard/auth.guard";
import { Roles } from "src/decorator/roles.decorator";
import { RolesGuard } from "src/guard/roles.guard";
// import { HttpExceptionFilter } from "src/filter/http-exception.filter";


@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService){}
    @Post()
    async signUp(
    @Body(new ZodValidationPipe(createCatSchema)) body,
    @Query(new ZodValidationPipe(querySchema)) query,
    @Res() res:Response,
    ):Promise<Response> {
       const response=await this.userService.signUp(body)
        return res.json({response})
    }
    @Post('login')
    async login(
        @Body() body,
        @Res() res:Response,
    ):Promise<Response> {
        const token=await this.userService.login(body)
        
        return res.json({message:"login",token})
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    @Roles(['admin'])
    async profile(
        @Req() request: Request,
        @Res() res:Response
    ):Promise<Response> {
        const data=await this.userService.gitUserData(request)
        return res.status(200).json({message:"profile",data})
    }
}