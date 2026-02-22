import { Routes } from '@angular/router';
import { LoginComponent } from './login';
import { PagesComponent } from './pages';
import { AuthGuard } from './guards/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: PagesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
