import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://localhost/nest-test')],
  controllers: [],
  providers: [
     {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
