//angular
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatMenuModule, MatIconModule, MatButtonModule, MatTabsModule } from '@angular/material';

//libs

//this
import { NavbarRoutingModule } from './navbar.routing.module';
import { PessoaModule } from './../pessoa/pessoa.module';
import { FavoritosModule } from './../favoritos/favoritos.module';
import { EscalaModule } from './../escala/escala.module';
import { DocumentosModule } from './../documentos/documentos.module';
import { MinisterioModule } from './../ministerio/ministerio.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { PessoaRouteResolver } from './../pessoa/pessoa.route.resolver';


@NgModule({
    imports: [
        CommonModule,

        MatMenuModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule,

        NavbarRoutingModule,
        PessoaModule,
        MinisterioModule,
        DocumentosModule,
        EscalaModule,
        FavoritosModule,
        
    ],
    exports: [
    ],
    declarations: [
        NavBarComponent,
        ToolBarComponent
    ],
    providers: [
        PessoaRouteResolver
    ]
})

export class NavbarModule { }     