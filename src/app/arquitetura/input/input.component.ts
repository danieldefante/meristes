import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import { ValidatorFields } from './../commun/validatorFields';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() model: string;
  @Input() label: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() maxLength: number;
  @Input() pattern: any;
  @Input() formgroup: FormGroup;
  @Input() fontCase: string;
  @Input() change: Function;
  @Output() bind: EventEmitter<string> = new EventEmitter<string>();

  private validatorFields: ValidatorFields = new ValidatorFields();

  constructor() {
  }

  ngOnInit() {
    this.verificarRequired();
  }

  private changeValue(value: string) {
    if (value) {
      value = this.executeFontCase(value);

      if (this.change) {
        this.change(value);
      }

      this.model = value;

      this.bind.emit(this.model);
    }
  }

  private executeFontCase(value: string): any {
    switch (this.fontCase) {
      case 'upper':
        return value.toUpperCase();
      case 'lower':
        return value.toLowerCase();
      case 'null':
        return value;
      default:
        return  value.replace(/\w\S*/g,
          function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
    }
  }

  private verificarRequired() {
    let required = this.formgroup.controls[this.name].errors;

    if (required && required.required) {
      this.label = this.label.concat('*');
    }
  }
}

/*
 
<!-- [formGroup]="formgroup -->
<mat-input-container fxFlex="100%">
  <input matInput 
    name={{name}}
    [matDatepicker]="dp" 
    placeholder={{label}}
    (dateChange)="changeValue($event)"
    (keyup)="changeKeyUp($event)"
    (blur)="b()"
    [value]="date.value"
    >
    <!-- [(ngModel)]="model"  -->
    <!--[value]="model" 
      formControlName="{{name}}"
      [formControl]="formControlField"
      (ngModelChange)="n($event)" 
          (dateChange)="changeValue($event)"-->
    <mat-error>
      <div *ngIf="formgroup.controls[name].errors?.required && !formgroup.controls[name].errors?.matDatepickerParse">
        {{validatorFields.msg.fieldObrigatorio}}
      </div>
      <div *ngIf="formgroup.controls[name].errors?.matDatepickerParse">
        {{validatorFields.msg.pattern.date}}
      </div>
    </mat-error>
  <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
  <mat-datepicker #dp></mat-datepicker>
</mat-input-container>*/