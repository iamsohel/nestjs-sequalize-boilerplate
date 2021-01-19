import { sequalizeConfig } from './config/sequalize.config';
import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TasksModule,  SequelizeModule.forRoot(sequalizeConfig), AuthModule, UserModule]
})
export class AppModule {}
