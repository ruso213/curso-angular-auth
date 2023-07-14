import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from './guard/token.guard';
import { RedirectGuard } from './guard/redirect.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate:[RedirectGuard]
  },
  {
    path: 'app',
    loadChildren: () => import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate:[TokenGuard],
  },
  {
    path:'rxjs',
    loadChildren: ()=> import('./modules/rx-js/rx-js.module').then((m)=> m.RxJsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
