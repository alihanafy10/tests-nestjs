import { ConflictException, Injectable } from "@nestjs/common";
import { signUpResponse } from "./interfaces";
import { User } from "src/schemas/user.schemas";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
    ) { }
    async signUp(body):Promise<any> {
        const { name, email, password, age } = body
        const isEmailExist = await this.userModel.findOne({ email })
        if (isEmailExist) throw new ConflictException('email already exists')
        //hash password
        const hashPass=bcrypt.hashSync(password,10)
        const data = new this.userModel({
            name,email,password:hashPass,age
        })

        const savedUser=await data.save()
        return {
            message: "success",
            data:savedUser
        }
    }
    
    async login(body): Promise<string> {
        const { email, password } = body
         const isEmailExist = await this.userModel.findOne({ email })
        if (!isEmailExist) throw new ConflictException('invalid credentials')
        const isPasswordMatch = bcrypt.compareSync(password, isEmailExist.password)
        if(!isPasswordMatch) throw new ConflictException('invalid credentials')

        //generate token
        const token:string=this.jwtService.sign({_id:isEmailExist._id,email:isEmailExist.email,role:isEmailExist.role},{secret:"mysecretKey",expiresIn:'1h'})
        return token
    }
    
    async gitUserData(req:Request):Promise<User> {
        return await this.userModel.findById(req["authUser"]._id)
    }
    }
 