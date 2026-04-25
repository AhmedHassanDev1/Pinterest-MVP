import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from '../schema/board.schema';
import { PaginationHelper } from '@app/shared/utils/helpers/pagination.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), "./apps/boards/.env"),
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL as string),
    MongooseModule.forFeature([{
      name: Board.name,
      schema: BoardSchema
    }])
  ],
  controllers: [BoardsController],
  providers: [BoardsService,PaginationHelper],
})
export class BoardsModule { }
