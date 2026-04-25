import { Injectable } from "@nestjs/common";

@Injectable()
export class PaginationHelper {
    genPagination<T>(resources: T[] | any, limit: number, resourcesName: string) {

        const hasNext = resources.length > limit;
        if (hasNext) resources.pop();
        return {
            [resourcesName]: resources,
            pageInfo: {
                nextCursor: resources.length ? resources[resources.length - 1].createdAt.toISOString() : null,
                hasNext
            }
        }
    }
}