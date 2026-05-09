import {
  ExecutionContext,
  createParamDecorator,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../strategy/acces-token-strategy';
import { RefreshTokenPayload } from '../strategy/refresh-token-strategy';

interface RequestWithUser extends Request {
  user: JwtPayload | RefreshTokenPayload;
}

export const GetUserFromToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload | RefreshTokenPayload => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    if (!request.user) throw new UnauthorizedException();

    return request.user;
  },
);
