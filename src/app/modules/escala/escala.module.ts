/////angular
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatNativeDateModule, MatDatepickerModule, MatIconModule, MatListModule, MatCardModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

/////libs
import { ResourceModule } from 'ngx-resource';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SimpleNotificationsModule } from 'angular2-notifications';
// import { UtilsModule } from 'app/components/utils/utils.module';
// import { ImageUploadModule } from 'angular2-image-upload';
// import { TextMaskModule } from 'angular2-text-mask';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PessoaRoutingModule } from './pessoa.routing.module';
// import { ResourceModule } from "ngx-resource";

/////this
import { MeristesFormModule } from './../../arquitetura/form.module';
import { EscalaFormComponent } from './escala.form/escala.form.component';
// import { PessoaFormComponent, DialogImagePessoa } from './pessoa.form/pessoa.form.component';
// import { PessoaListComponent } from './pessoa.list/pessoa.list.component';
// import { PessoaDialogComponent } from './pessoa.list/pessoa.list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatDialogModule,

        MeristesFormModule,
        ResourceModule.forRoot(),
        SimpleNotificationsModule.forRoot(),
        FlexLayoutModule,
        // MatDatepickerModule,
        // MatNativeDateModule,
        // TextMaskModule,
        // PessoaRoutingModule,
        // MaterialModule,
        // ImageUploadModule,
        // UtilsModule,
    
    ],
    exports: [],
    declarations: [
        // PessoaListComponent,
        // PessoaFormComponent,
        // PessoaDialogComponent,
        // DialogImagePessoa
    EscalaFormComponent],
    providers: [
        // {provide: LOCALE_ID, useValue: 'pt-BR'}
    ],
    entryComponents: [
        // PessoaDialogComponent,
        // DialogImagePessoa
    ]
})       

export class EscalaModule {}     