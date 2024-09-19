import { IsEmail, IsInt, IsString, Length, Min } from "class-validator";

export class SignUpDto{
    @IsString()
    @Length(3,10)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsInt()
    @Min(10)    
    age: number;
}