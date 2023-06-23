import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'protected',
    loadChildren: () => import('./protected/protected.module').then((m) => m.ProtectedModule),
    canActivate:[ValidarTokenGuard],//evitar que usuarios no autorizados accedan a ciertas rutas
    canLoad:[ValidarTokenGuard]//evitar que la aplicación cargue módulos completos de forma perezosa si el usuario no está autorizado para hacerlo.
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
