import { Test, TestingModule } from "@nestjs/testing";
import { BoardsService } from "./boards.service";
import { Board } from "../schema/board.schema";
import { getModelToken } from "@nestjs/mongoose";

describe("Boards Service Testing.", async () => {
    const mockBoardModel = {
        create: jest.fn(),
        findById: jest.fn(),
        find: jest.fn(),
        deleteOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
        updateOne: jest.fn(),
    };

    const mockPaginationHelper = {
        genPagination: jest.fn(),
    };

    let service: BoardsService;
    let boardModel: any;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BoardsService,
                {
                    provide: getModelToken(Board.name),
                    useValue: mockBoardModel,
                },
                {
                    provide: 'PaginationHelper',
                    useValue: mockPaginationHelper,
                },
            ],
        }).compile();

        service = module.get<BoardsService>(BoardsService);
        boardModel = module.get(getModelToken(Board.name));
    });

    
})  