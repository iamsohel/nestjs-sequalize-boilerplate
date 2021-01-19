import { User } from './../../user/user.model';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(@InjectModel(User) private userModel: typeof User) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'this si buy not'//process.env.JWT_SECRET_KEY || //config.get('jwt.secret')
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userModel.findOne({ where: {email: email} });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}