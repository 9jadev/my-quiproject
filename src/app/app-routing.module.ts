import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { UnauthGuardService } from './core/services/unauth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [UnauthGuardService]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
    canActivate: [UnauthGuardService]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuardService] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
