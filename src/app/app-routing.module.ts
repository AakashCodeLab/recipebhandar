import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthGuard} from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    NgbModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
