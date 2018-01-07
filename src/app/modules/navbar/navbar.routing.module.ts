//angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//this
import { MinisterioListComponent } from './../ministerio/ministerio.list/ministerio.list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PessoaFormComponent } from './../pessoa/pessoa.form/pessoa.form.component';
import { PessoaListComponent } from './../pessoa/pessoa.list/pessoa.list.component';
import { MinisterioFormComponent } from './../ministerio/ministerio.form/ministerio.form.component';
import { DocumentosFormComponent } from './../documentos/documentos.form/documentos.form.component';
import { FavoritosFormComponent } from './../favoritos/favoritos.form/favoritos.form.component';
import { EscalaFormComponent } from './../escala/escala.form/escala.form.component';
import { PessoaRouteResolver } from './../pessoa/pessoa.route.resolver';

const navbarRoutes: Routes = [
    {
        path: '',
        component: NavBarComponent,
        children: [
            {path: 'pessoa/add', component: PessoaFormComponent},
            {path: 'pessoa', component: PessoaListComponent},
            {path: 'pessoa/:idPessoa', component: PessoaFormComponent,
                resolve: { pessoa: PessoaRouteResolver }
            },
            {path: 'ministerio/add', component: MinisterioFormComponent},
            {path: 'ministerio', component: MinisterioListComponent},
            {
                path: 'escala',
                component: EscalaFormComponent,
            },
            {
                path: 'favoritos',
                component: FavoritosFormComponent,
            },
            {
                path: 'documentos',
                component: DocumentosFormComponent,
            },
        ]
    }
    // {path: 'aa', component: VdvEscalaComponent}
];
@NgModule({
    imports: [RouterModule.forChild(navbarRoutes)],
    exports: [RouterModule]
})
export class NavbarRoutingModule { }