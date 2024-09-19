import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({timestamps:true})
export class User {
    @Prop({
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength:3
  })
  name: string;
    @Prop({
      type: String,
        required: true,
        trim: true,
         unique: true
  })
  email: string;
    @Prop(
        {
          type: String,
            required: true,
        minlength:6
      }
  )
  password: string;

  @Prop()
  age: number;

    @Prop({
        type: String,
        enum: ["admin", "user"],
        default: "user"
  })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

export const UserModel=MongooseModule.forFeature([{name:User.name,schema:UserSchema}])