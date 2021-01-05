import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatchException } from 'exception/CatchException';
import { CategoryModules } from 'module/CategoryModules';
import { PostModule } from 'module/PostModule';
import { UserModule } from 'module/UserModules';

@Module({
  imports: [
    TypeOrmModule.forRoot(), UserModule, CategoryModules, PostModule
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CatchException,
  }],
})

export class AppModule {
}