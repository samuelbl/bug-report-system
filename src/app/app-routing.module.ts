import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugListComponent } from './bug-list/bug-list.component';
import { BugCreateComponent } from './bug-create/bug-create.component';

const routes: Routes = [
  { path: '', component: BugListComponent },
  { path: 'create', component: BugCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
