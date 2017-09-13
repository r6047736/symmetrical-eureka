import { NgModule }             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MembersComponent} from './members/members.component';
import {TaskDetailComponent} from './task-detail/task-detail.component';


const routes: Routes=[

  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: 'index', component: MembersComponent
  },
  {
    path: 'detail/:memberId', component: TaskDetailComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
