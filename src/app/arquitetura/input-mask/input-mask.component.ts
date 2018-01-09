/////angular
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';

/////libs

/////this
import { Masks } from '../commun/masks';
import { ValidatorFields } from '../commun/validatorFields';

@Component({
  selector: 'app-input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.css']
})
export class InputMaskComponent implements OnInit {

  @Input() model: string;
  @Input() label: string;
  @Input() name: string;
  @Input() icon: string;
  @Input() hint: number;
  @Input() type: string;
  @Input() formgroup: FormGroup;
  @Output() bind: EventEmitter<string> = new EventEmitter<string>();
  
  public validatorFields: ValidatorFields = new ValidatorFields() ;
  public masks: Masks = new Masks();
  
  constructor() {
  }

  ngOnInit() {
    this.verificarRequired();
  }
  
  private verificarRequired(){
    let required = this.formgroup.controls[this.name].errors;

    if(required && required.required){
      this.label = this.label.concat('*'); 
    }
  }

  public changeValue(value: string) {
    this.model = value;
    this.bind.emit(this.model);
  }
}
