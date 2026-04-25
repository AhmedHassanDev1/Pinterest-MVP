import { Inject, Module } from '@nestjs/common';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Pin, PinSchema } from '../schema/pin.schema';
import { PaginationHelper } from '@app/shared/utils/helpers/pagination.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), "./apps/pins/.env"),
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string,),

    MongooseModule.forFeature([{
      name: Pin.name,
      schema: PinSchema
    }])
  ],
  controllers: [PinsController],
  providers: [PinsService,PaginationHelper],
})
export class PinsModule { }

