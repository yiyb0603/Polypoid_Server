import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModules } from 'module/CategoryModules';
import { PostModule } from 'module/PostModule';
import { UserModule } from 'module/UserModules';

@Module({
  imports: [
    TypeOrmModule.forRoot(), UserModule, CategoryModules, PostModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
}