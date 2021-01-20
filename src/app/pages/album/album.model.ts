import { SafeUrl } from "@angular/platform-browser"


export class AlbumModel {
    id: number
    nome: string
    imagem: string
    autor: AutorModel
    fileUrl: SafeUrl
    file: string

}

export class AutorModel {
    id: number
    nome: string
}
