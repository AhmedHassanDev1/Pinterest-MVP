import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { LikesService } from "./likes.service";
import { of, throwError } from "rxjs";
import { RABBITMQ_SERVICE } from "@app/shared/constants/RabbitMQ.constansts";
import { GRPC_SERVICES } from "@app/shared/constants/grpc.constants";
import { RpcException } from "@nestjs/microservices";
const mockPinsService = {
    getPin: jest.fn(),
};

const mockLikeModel = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn()
};

const mockProducer = {
    emit: jest.fn(),
};

describe("like service Testing.", () => {
    let service: LikesService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LikesService,
                {
                    provide: GRPC_SERVICES.PINS,
                    useValue: mockPinsService
                }, {
                    provide: getModelToken("Like"),
                    useValue: mockLikeModel
                }, {
                    provide: RABBITMQ_SERVICE,
                    useValue: mockProducer
                }

            ]
        }).compile()
        service = module.get<LikesService>(LikesService);
        (service as any).pinsService = mockPinsService;
        jest.clearAllMocks();
        mockLikeModel.findOne.mockResolvedValue(null);
        mockLikeModel.updateOne.mockResolvedValue({ upsertedCount: 0 });
        mockLikeModel.deleteOne.mockResolvedValue({ deletedCount: 0 });
    })

    const data = { pinId: '1', userId: 'u1' };
    it("should add like and emit event", async () => {

        mockPinsService.getPin.mockReturnValue(of({ id: '1' }));

        mockLikeModel.updateOne.mockResolvedValue({
            upsertedCount: 1,
        });

        const result = await service.addLike(data);

        expect(mockLikeModel.updateOne).toHaveBeenCalled();

        expect(mockProducer.emit).toHaveBeenCalledWith(
            'pin.like',
            expect.objectContaining(data),
        );
        expect(result).toHaveProperty('createdAt');
    })

    it('should throw error if pin not found', async () => {
        const data = { pinId: '1', userId: 'u1' };


        mockPinsService.getPin.mockReturnValue(
            throwError(() => new Error('Pin not found')),
        );

        await expect(service.addLike(data)).rejects.toThrow(RpcException);
    });

    // =========================================

    it('should call updateOne with correct params', async () => {


        mockPinsService.getPin.mockReturnValue(of({ id: '1' }));

        mockLikeModel.updateOne.mockResolvedValue({
            upsertedCount: 1,
        });

        await service.addLike(data);

        expect(mockLikeModel.updateOne).toHaveBeenCalledWith(
            { pinId: '1', userId: 'u1' },
            expect.any(Object),
            { upsert: true },
        );
    });

    it('should NOT emit event if like already exists', async () => {
        mockPinsService.getPin.mockReturnValue(of({ id: '1' }));

        mockLikeModel.updateOne.mockResolvedValue({
            upsertedCount: 0,
        });

        await service.addLike(data);

        expect(mockProducer.emit).not.toHaveBeenCalled();
    });

    it("should remove like and emit event", async () => {
        mockLikeModel.findOne.mockResolvedValue(data)
        mockLikeModel.deleteOne.mockResolvedValue({
            deletedCount: 1,
        });

        await service.removeLike(data, data.userId)
        expect(mockProducer.emit).toHaveBeenCalledWith(
            'pin.unlike',
            expect.objectContaining(data),
        );
    })

    it("should throw Error if user Unauthorized", async () => {
        mockLikeModel.findOne.mockResolvedValue({
            pinId: data.pinId,
            userId: "k1"
        })
        await expect(service.removeLike(data, data.userId))
            .rejects.toThrow(RpcException)
        expect(mockProducer.emit).not.toHaveBeenCalled()
    })

    it("should NOT emit event if like not found", async () => {
        mockLikeModel.findOne.mockResolvedValue(data)
        mockLikeModel.deleteOne.mockResolvedValue({
            deletedCount: 0,
        });

        await service.removeLike(data, data.userId)

        expect(mockProducer.emit).not.toHaveBeenCalled()

    })

})

