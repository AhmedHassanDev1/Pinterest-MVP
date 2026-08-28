import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CheckEmailDTO } from "@app/shared/dto/Auth.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@Controller("/users")
export class UserController {
    constructor(
        private readonly userSerivce: UserService
    ) { }

    @ApiOperation({ summary: 'Check if an email exists' })
    @ApiResponse({ status: 200, description: 'Email existence checked successfully.' })
    @ApiBearerAuth()
    @Get("/exists")
    async emailIsExists(
        @Query() query: CheckEmailDTO
    ) {
        return await this.userSerivce.emailIsExists(query.email)
    }
    
}