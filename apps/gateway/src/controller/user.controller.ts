import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CheckEmailDTO } from "@app/shared/dto/Auth.dto";


@Controller("/users")
export class UserController {
    constructor(
        private readonly userSerivce: UserService
    ) { }

    @Get("/exists")
    async emailIsExists(
        @Query() query: CheckEmailDTO
    ) {
        return await this.userSerivce.emailIsExists(query.email)
    }
    
}