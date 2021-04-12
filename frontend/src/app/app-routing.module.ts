import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { HomeComponent } from './components/home/home.component';
import { MylistComponent } from './components/mylist/mylist.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'mylist', component:MylistComponent},
  {path: 'watch/:media_type/:id',component:DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
