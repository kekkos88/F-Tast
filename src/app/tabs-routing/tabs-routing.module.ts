import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const tabRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(tabRoutes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
