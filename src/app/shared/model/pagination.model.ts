export class PaginationModel<T>{
    contents: Array<T>
    pageInfo: PageInfo
}

export class PageInfo {
    numberOfElements: number
    pageNumber: number = 0
    pageSize: number = 5
    totalElements: number = 0
    totalPages: number
}

