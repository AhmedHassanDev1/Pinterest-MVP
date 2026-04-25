import { join } from "path";

export const protoFiles = {
    auth: join(process.cwd(), '/libs/proto/auth.proto'),
    user: join(process.cwd(), '/libs/proto/user.proto'),
    pins: join(process.cwd(), '/libs/proto/pins.proto'),
    board: join(process.cwd(), '/libs/proto/boards.proto'),
    saves: join(process.cwd(), '/libs/proto/saves.proto'),
    likes: join(process.cwd(), '/libs/proto/likes.proto'),
}

