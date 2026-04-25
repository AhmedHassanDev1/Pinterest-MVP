import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {

    let request: any;

    if (ctx.getType() === 'http') {
      request = ctx.switchToHttp().getRequest();
    } else {
      const gqlCtx = GqlExecutionContext.create(ctx);
      request = gqlCtx.getContext().req;
    }

    const user = request.user;

    return data ? user?.[data] : user;
  },
);