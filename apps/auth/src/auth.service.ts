import { GRPC_SERVICES } from '@app/shared/constants/grpc.constants';
import { status } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as microservices from '@nestjs/microservices';
import { RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { hash, compare, genSalt } from "bcryptjs"
import { AuthPayload } from '@app/shared/dto/Auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { accessTokenExpire, refreshTokenExpire } from '@app/shared/constants/jwt.contansts';
import { UsersClient } from '@app/shared/types/proto/user';
import { AuthProvider, LoginRequest, RefreshTokenRequest } from '@app/shared/types/proto/auth';
import { getVaultSecrets } from '@app/shared/utils/helpers/vault.helper';



@Injectable()
export class AuthService implements OnModuleInit {
  private secrets: Record<string, string>;
  constructor(  
    @Inject(GRPC_SERVICES.USER) private client: microservices.ClientGrpc,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { } 
  private usersService: UsersClient;
  onModuleInit() {
    this.usersService = this.client.getService<UsersClient>(GRPC_SERVICES.USER)
      getVaultSecrets(
      this.configService.get<string>('VAULT_URL')!,
      this.configService.get<string>('VAULT_TOKEN')!,
    ).then((secrets) => {
      this.secrets = secrets;
      console.log('Secrets fetched from Vault successfully:' );
    }).catch((error) => {   
      console.error('Error fetching secrets from Vault:', error);
    });
  }

  async genHash(password: string): Promise<string> {
    const salt = await genSalt()
    return await hash(password, salt)
  }
  async verificationHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash)
  }

  async genToken(payload: AuthPayload | {}, secret: string | undefined, expiresIn): Promise<string> {
    return await this.jwtService.signAsync(JSON.parse(JSON.stringify(payload)), {
      secret: secret || this.configService.get<string>("SECRET"),
      expiresIn: expiresIn || '15m',
    })
  }

  async verificationToken(token: string, secret: string) {
    return await this.jwtService.verify(token, {
      secret
    })
  }

  async register(data: any) {
    const { email, password, provider, providerId, idToken } = data;

    let existingUser;

    try {
      existingUser = await lastValueFrom(this.usersService.getUserByEmail({ email }));

    } catch (error) {
      if (error.code !== status.NOT_FOUND) {
        throw error;
      }
    }

    if (existingUser) {
      throw new RpcException({ code: status.ALREADY_EXISTS, message: 'User already exists' });
    }

    let userPayload: { email: any; password?: string } = { email };

    if (provider == AuthProvider.LOCAL) {
      if (!password) {
        throw new RpcException({ code: status.DATA_LOSS, message: "Password is required." })
      }
      userPayload.password = await this.genHash(password);
    }


    const { user } = await lastValueFrom(this.usersService.createUser(userPayload));
    const tokenPayload = {
      id: user?.id,
      email,
      userName: user?.userName
    }

    const accessToken = await this.genToken(tokenPayload, this.secrets?.access, accessTokenExpire)
    const refreshToken = await this.genToken(tokenPayload, this.secrets?.refresh, refreshTokenExpire)
    return {
      userId: user?.id,
      accessToken,
      refreshToken,
    };
  }
  async logIn(data: LoginRequest) {
    const { email, password } = data


    try {
      const { user } = await lastValueFrom(this.usersService.getUserByEmail({ email }));
      const tokenPayload = {
        id: user?.id,
        email,
        userName: user?.userName
      }
      let validPassword = await this.verificationHash(password, user?.password as string)
      if (!validPassword) throw new RpcException({ code: status.UNAUTHENTICATED, message: "invalid password." })
      const accessToken = await this.genToken(tokenPayload, this.secrets?.access, accessTokenExpire)
      const refreshToken = await this.genToken(tokenPayload, this.secrets?.refresh, refreshTokenExpire)
      return {
        userId: user?.id,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      if (error.code == status.NOT_FOUND) throw new RpcException({ code: status.NOT_FOUND, message: "Not Found user." })
      else throw error
    }
  }
 
  async refreshToken({ refreshToken }: RefreshTokenRequest) {
    const refreshTokenSecret = this.secrets?.refresh
    const accessTokenSecret = this.secrets?.access
    const payload = await this.verificationToken(refreshToken, refreshTokenSecret)

    if (!payload) throw new RpcException({ code: status.UNAUTHENTICATED, message: "invalid token pleace login." })
    const { id } = payload
    const { user } = await lastValueFrom(this.usersService.getUser({ id }))

    const tokenPayload = {
      id: user?.id,
      email: user?.email,
      userName: user?.userName
    }
    const accessToken = await this.genToken(tokenPayload, accessTokenSecret, accessTokenExpire)
    return {
      userId: user?.id,
      accessToken,
      refreshToken,
    };
  }
}
