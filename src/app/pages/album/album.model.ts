

export class AlbumModel  {
    id: number
    nome: string
    image: string
    autor: AutorModel
}

export class AutorModel {
    id: number
    nome: string
}