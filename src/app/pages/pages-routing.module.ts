import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';
import {AuthGuard} from '../shared/guard/auth.guard';

const routes: Routes = [
    {
        path: '',  canActivate: [AuthGuard], component: PageComponent,
        children: [
            { path: 'home', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'add', loadChildren: './component/addrecipe/addrecipe.module#AddrecipeModule' },
          { path: 'edit/:id', loadChildren: './component/addrecipe/addrecipe.module#AddrecipeModule' },

          { path: '', redirectTo: 'home', pathMatch: 'full', },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes,{ useHash: true })],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
