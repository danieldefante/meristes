import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatNativeDateModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextMaskModule } from 'angular2-text-mask';

import { RowComponent } from './row/row.component';
import { InputComponent } from './input/input.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputMaskComponent } from './input-mask/input-mask.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        MatNativeDateModule,
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,

        FlexLayoutModule,
        TextMaskModule,
    ],
    exports: [
        RowComponent,
        InputComponent,
        InputDateComponent,
        InputMaskComponent
    ],
    declarations: [
        RowComponent,
        InputComponent,
        InputDateComponent,
        InputMaskComponent,
    ],
    providers: [
    ],
    entryComponents: [
    ]
})

export class MeristesFormModule { }     