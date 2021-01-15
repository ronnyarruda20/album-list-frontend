

export class AlbumModel  {
    id: number
    nome: string
    imagem: string
    autor: AutorModel
    file: string
}

export class AutorModel {
    id: number
    nome: string
}