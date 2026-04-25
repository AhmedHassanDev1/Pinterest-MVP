import { Args, Field, Int, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../schema/user.schema';
import { CurrentUser } from '../decorators/currentUser.decorator';
import { UserService } from '../services/user.service';
import { Avatar } from '../schema/profile.schema';




@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService
  ) { }

  @Query(() => User)
  async me(@CurrentUser("id") id: string) {
    return await this.userService.getUserById(id);
  }


  @Query(() => User)
  async getUserById(@Args("id") id: string) {
    return await this.userService.getUserById(id);
  }

}

