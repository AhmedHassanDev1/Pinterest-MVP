import { Controller, Post, Body, Res, Req, Put, Delete } from "@nestjs/common";
import type { Response, Request } from "express";
import { LogInDTO, RegisterDTO } from "@app/shared/dto/Auth.dto";
import { AuthService } from "../services/auth.service";
import { lastValueFrom } from "rxjs";
import { RpcException } from "@nestjs/microservices";
import { cookiesOptions } from "../constants/cookies.config";
import { publicDecrypt } from "crypto";
import { PublicRoute } from "../decorators/publicRoute.decorator";
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller("/auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @PublicRoute()
    @Post("/register")
    async register(@Body() body: RegisterDTO, @Res({ passthrough: true }) res: Response) {
        try {
            let { userId, accessToken, refreshToken } = await this.authService.register(body)
            res.cookie("refresh-token", refreshToken, cookiesOptions)
            res.status(201).json({ userId, accessToken })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    @ApiOperation({ summary: 'Log in as a user' })
    @ApiResponse({ status: 201, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @PublicRoute()
    @Post("/login")
    async logIn(
        @Body() body: LogInDTO,
        @Res({ passthrough: true }) res: Response) {
        try {
            const { userId, accessToken, refreshToken } = await this.authService.logIn(body)
            res.cookie("refresh-token", refreshToken, cookiesOptions)
            res.status(201).json({ userId, accessToken })
        } catch (error) {
            throw new RpcException(error)
        }
    }

    @ApiOperation({ summary: 'Log out a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged out.' })
    @PublicRoute()
    @Delete("/logout")
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie("refresh-token")
    }

    @ApiOperation({ summary: 'Refresh authentication token' })
    @ApiResponse({ status: 200, description: 'Token refreshed successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiCookieAuth()
    @PublicRoute()
    @Post("/refresh-token")
    async refreshToken(@Req() req: Request) {
        const refreshToken = req.cookies["refresh-token"]


        return await this.authService.refreshToken({ refreshToken })

    }


}