import { SafeUrl } from "@angular/platform-browser"
import { AutorModel } from "../autor/autor.model"


export class AlbumModel {
    id: number
    nome: string
    imagem: string
    autor: AutorModel
    fileUrl: SafeUrl
    file: string
}
