import { User } from './../user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'this si buy not',//process.env.JWT_SECRET_KEY || jwtConfig.secret,
      signOptions: {
        expiresIn: 3600 * 24*30 // 30 days,  //Number(process.env.JWT_EXPIRATION_TIME)|| jwtConfig.expiresIn,
      },
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
