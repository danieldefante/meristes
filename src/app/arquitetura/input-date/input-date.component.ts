/////angular
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

/////libs

/////this
import { ValidatorFields } from '../commun/validatorFields';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class InputDateComponent implements OnInit , OnChanges {

  @Input() model: Date;
  @Input() label: string;
  @Input() name: string;
  @Input() formgroup: FormGroup;
  @Output() bind: EventEmitter<Date> = new EventEmitter<Date>();

  private validatorFields: ValidatorFields = new ValidatorFields();
  
  constructor() {
  }
  
  ngOnInit() {
    this.verificarRequired();
  }
  
  ngOnChanges(): void {
    if (typeof this.model === 'string') {
      this.model = this.validatorFields.stringToDate(this.model);
    }
  }
  
  public changeValue(ev) {
    let value: any = this.model;
    if(value) {
      this.bind.emit(value._d);
    } else {
      this.bind.emit(undefined);
    }
  }

  public changeKeyUp(ev) {
    this.addMask(ev);
  }

  private addMask(ev) {
    let value: string = ev.target.value;
    let re = /\//gi;
    value = value.replace(re, '');
    let l = value.length;

    if (ev.keyCode !== 8 && ev.keyCode !== 37 && ev.keyCode !== 39) {
      if (l == 2) {
        ev.target.value = value.concat('/');
      } else if (l >= 4) {
        let day = value.slice(0, 2);
        let month = value.slice(2, 4);
        let year = value.slice(4, 8);
        ev.target.value = day.concat('/').concat(month.concat('/')).concat(year);
      }
    }
  }

  private verificarRequired() {
    let required = this.formgroup.controls[this.name].errors;

    if (required && required.required) {
      this.label = this.label.concat('*');
    }
  }

  // private setModel(day: number, month: number, year: number) {
  //   this.model = new Date(year, month, day);
  // }
}