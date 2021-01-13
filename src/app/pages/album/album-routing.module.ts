import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlbumListComponent } from "./album-list/album-list.component";

const routes: Routes = [{
  path: 'list',
  component: AlbumListComponent,
  data: { endPoint: 'album' }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule { }