import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { BoardsClient, CreateBoardRequest, EditeBoardRequest, MergeBoardRequest, ListBoardsRequest } from "@app/shared/types/proto/boards";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as microservices from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class BoardService implements OnModuleInit {
    constructor(
        @Inject(GRPC_SERVICES.BOARDS) private client: microservices.ClientGrpc,
    ) { }
    
    boardRPC: BoardsClient;

    onModuleInit() {
        this.boardRPC = this.client.getService<BoardsClient>(GRPC_SERVICES.BOARDS);
    }

    async createBoard(data: CreateBoardRequest) {
        return await lastValueFrom(this.boardRPC.createBoard(data));
    } 

    async getBoardById(boardId: string) { 
        return await lastValueFrom(this.boardRPC.getBoard({ id: boardId }));
    }

    async deleteBoard(boardId: string) {
        return await lastValueFrom(this.boardRPC.deleteBoard({ id: boardId }));
    }

    async editBoard(data: EditeBoardRequest) {
        return await lastValueFrom(this.boardRPC.editeBoard(data));
    }

    async mergeBoard(data: MergeBoardRequest) {
        return await lastValueFrom(this.boardRPC.mergeBoard(data));
    }

    async listBoards(data: ListBoardsRequest) {
        return await lastValueFrom(this.boardRPC.listBoards(data));
    }
}
