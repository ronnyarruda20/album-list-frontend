export class PaginationModel<T>{
    contents: Array<T>
    pageInfo: PageInfo
}

export class PageInfo {
    numberOfElements: number
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
}

