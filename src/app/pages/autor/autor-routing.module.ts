import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutorListComponent } from "./autor-list/autor-list.component";

const routes: Routes = [{
    path: 'list',
    component: AutorListComponent
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AutorRoutingModule { }