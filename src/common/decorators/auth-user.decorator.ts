import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';

//export const AuthUser = createParamDecorator((data, request): User => request.user);
export const AuthUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );