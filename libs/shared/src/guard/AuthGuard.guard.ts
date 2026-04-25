import { CanActivate, ExecutionContext, Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core/services/reflector.service";
import { GqlExecutionContext } from "@nestjs/graphql/dist/services/gql-execution-context.js";
import { firstValueFrom, Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { HttpService } from "@nestjs/axios";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { getVaultSecrets } from "../utils/helpers/vault.helper";


@Injectable()
export class AuthGuard implements CanActivate, OnModuleInit {
    private secrets: { access: string } | null = null;

    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async onModuleInit() {
        try {


            this.secrets = await getVaultSecrets(
                this.configService.get<string>('VAULT_URL')!,
                this.configService.get<string>('VAULT_TOKEN')!,
            );

            if (!this.secrets?.access) {
                console.error('⚠️ Vault secrets missing access key');
            } else {
                console.log('✅ Vault secrets loaded');
            }
        } catch (err) {
            console.error('❌ Error fetching secrets from Vault:', err);
            this.secrets = null;
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) return true;

        let request: any;

        if (context.getType() === 'http') {
            request = context.switchToHttp().getRequest();
        } else {
            const gqlCtx = GqlExecutionContext.create(context);
            request = gqlCtx.getContext().req;
        }

        const authHeader = request.headers?.authorization;


        if (!authHeader?.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid authorization header');
        }

        const accessToken = authHeader.split(' ')[1];

        if (!accessToken) {
            throw new UnauthorizedException('Access token missing');
        }

        if (!this.secrets?.access) {
            throw new UnauthorizedException('Auth service not ready');
        }

        try {
            const payload = this.jwtService.verify(accessToken, {
                secret: this.secrets.access,
            });

            request.user = payload;
            return true;
        } catch (err) {
            console.error('JWT verify error:', err);
            throw new UnauthorizedException('Invalid or expired access token');
        }
    }
}