import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlbumListComponent } from "./album-list/album-list.component";
import { AlbumComponent } from "./album.component";

const routes: Routes = [{
  path: '',
  component: AlbumComponent,
  children: [{
    path: 'list',
    component: AlbumListComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule { }