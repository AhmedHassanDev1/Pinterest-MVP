import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./service/user.service";
import { getModelToken } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import { Profile } from "../schema/profile.schema";
import { Follower } from "../schema/follower.schema";
import { RpcException } from "@nestjs/microservices";

const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
};

const mockProfileModel = {
    create: jest.fn(),
    updateOne: jest.fn(),
};

describe("user serives", () => {
    let userService: UserService;


    beforeEach(async () => {
        let module: TestingModule = await Test.createTestingModule({
            providers: [UserService,
                { provide: getModelToken(User.name), useValue: mockUserModel },
                { provide: getModelToken(Profile.name), useValue: mockProfileModel },
                { provide: getModelToken(Follower.name), useValue: {} }
            ]
        }).compile();

        userService = module.get<UserService>(UserService);

    })

    it("should create user successfully", async () => {
        const request = {
            email: "test@test.com",
            password: "123456",
            userName : "test@test.com".split("@")[0]
        };

        const createdUser = {
            id: "1",
            email: request.email
        };

        mockUserModel.create.mockResolvedValue(createdUser);

        const result = await userService.CreateUser(request);

        expect(result).toEqual({
            user: createdUser
        });

        expect(mockUserModel.create).toHaveBeenCalledWith(request);
    });

    it("should throw RpcException if email already exists", async () => {
        const request = {
            email: "test@test.com",
            password: "123456"
        };

        const mongoError = {
            code: 11000
        };

        mockUserModel.create.mockRejectedValue(mongoError);

        await expect(userService.CreateUser(request))
            .rejects
            .toThrow(RpcException);
    });

    it("should throw unknown error", async () => {
        const request = {
            email: "test@test.com",
            password: "123456",
            userName : "test@test.com".split("@")[0]
        };

        const error = new Error("Database crashed");

        mockUserModel.create.mockRejectedValue(error);

        await expect(userService.CreateUser(request))
            .rejects
            .toThrow("Database crashed");
    });
    
    it("should returen user by email",async ()=>{
          const request = {
            email: "test@test.com",
       };

        mockUserModel.findOne.mockResolvedValue(request)

    })

})
