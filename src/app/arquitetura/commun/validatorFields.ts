import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms/src/forms';
import { isUndefined, isNullOrUndefined } from 'util';

export class ValidatorFields {

  constructor() {
  }

  public regex = {
    email: '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*',
    words: '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+',
    wordsSpace: '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+',
    wordsSpaceNumber: '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9]+',
    wordsSpaceEnterNumber: '[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ 0-9 \n]+',
    cpf: '[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}',
    rgMaior: '([0-9]{2}|[0-9]{1})[.][0-9]{3}[.][0-9]{3}[-][0-9]{1}[ ]*',
    cell: '[\(][0-9]{2}[\)] [0-9]{5}[-][0-9]{4}',
    telephone: '[\(][0-9]{2}[\)] [0-9]{5}[-][0-9]{4}',
    // date: '[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}'
    date: '[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}',
    date2: '([0-9]){4}[-]([0-9]){2}[-]([0-9]){2}'
  };

  private msg = {
    fieldObrigatorio: 'Ops! Este campo é obrigatório.',
    words: 'Ops! Este campo não aceita números e espaços.',
    wordsSpace: 'Ops! Este campo aceita somente letras.',
    email: 'Ops! Este email não é válido.',
    cpf: 'Ops! Este cpf não é válido.',
    rgMaior: 'Ops! Este rg não é válido.',
    cell: 'Ops! Este celular não é válido.',
    telephone: 'Ops! Este telefone não é válido.',
    date: 'Ops! Esta data não é válida.',

    //deletar
    pattern: {
      default: 'Ops! Informação não é válida.',
      // words: 'Ops! Este campo não aceita carácteres especiais e espaços.',
      wordsSpaceNumber: 'Ops! Este campo aceita somente letras e números.',
      wordsSpaceEnterNumber: 'Ops! Este campo aceita somente letras e números.',
      numbers: 'Ops! Este campo aceita somente números.',
      date: 'Ops! A data é inválida.'
    }
  }

  public validateForm(formGroup: FormGroup) {
    // formGroup.updateValueAndValidity()
  }

  public validate(formulario: NgForm, field, msg?) {
    msg = msg ? msg : 'default';
    return (formulario.form.controls[field] &&
      formulario.form.controls[field].touched &&
      formulario.form.controls[field].errors) &&
      (formulario.form.controls[field].errors.required ||
        formulario.form.controls[field].errors.pattern) ?
      this.getMessage(formulario.form.controls[field].errors, msg) : true;
  }

  private getMessage(errors, msg) {
    if (errors.required) {
      return this.msg['fieldObrigatorio'];
    } else if (errors.pattern) {
      return this.msg.pattern[msg];
    }
  }

  public resolveDate(value): Date {
    let regex = /(\d+)[\/-](\d+)[\/-](\d+)/;
    value.replace(regex, '$1, $2, $3');

    if (RegExp.$3.length == 4 && RegExp.$2.length == 2 && RegExp.$1.length == 2) {

      return new Date(+RegExp.$3, +RegExp.$2 - 1, +RegExp.$1);
    } else if (RegExp.$1.length == 4 && RegExp.$2.length == 2 && RegExp.$3.length == 2) {

      return new Date(+RegExp.$1, +RegExp.$2 - 1, +RegExp.$3);
    } else {

      return undefined;
    }
  }

  public resolveDateTime(value): Date {
    if (value) {
      let regex = /(\d+)[\/-](\d+)[\/-](\d+)[ ](\d+)[h][:](\d+)/;
      value.replace(regex, '$1, $2, $3', '$4', '$5');

      if (RegExp.$3.length == 4 && RegExp.$2.length == 2 && RegExp.$1.length == 2 && RegExp.$4.length == 2 && RegExp.$5.length == 2) {

        return new Date(+RegExp.$3, +RegExp.$2 - 1, +RegExp.$1, +RegExp.$4, +RegExp.$5);
      } else if (RegExp.$1.length == 4 && RegExp.$2.length == 2 && RegExp.$3.length == 2 && RegExp.$4.length == 2 && RegExp.$5.length == 2) {

        return new Date(+RegExp.$1, +RegExp.$2 - 1, +RegExp.$3, +RegExp.$4, +RegExp.$5);
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  public validateDate(date_inicio, date_fim): Date[] | boolean {

    let dateValid1 = this.validateOneDate(date_inicio);
    let dateValid2 = this.validateOneDate(date_fim);

    return dateValid1 != undefined && dateValid2 != undefined ? [dateValid1, dateValid2] : false;
  }

  private validateOneDate(value): Date {
    let regex = /(\d{2})[\/](\d{2})[\/](\d{4})[ ](\d{2})[h][:](\d{2})/;

    let strInicio = value + '';
    let day = strInicio.replace(regex, '$1');
    let month = strInicio.replace(regex, '$2');
    let year = strInicio.replace(regex, '$3');
    let hours = strInicio.replace(regex, '$4');
    let minutes = strInicio.replace(regex, '$5');

    if (day.length == 2 && month.length == 2 && year.length == 4 && hours.length == 2 && minutes.length == 2) {
      return new Date(+year, +month, +day, +hours, +minutes);
    }

    return undefined;
  }

  // public validateRG(str, nameField: string, form_control: NgForm): boolean {
  //   return this.validateInput(str, 7, nameField, form_control);
  // }

  public validateCPF(str, form_control: NgForm) {
    console.log('blur', str);

    if (str) {
      let regex = /[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}/gi;

      if (!regex.test(str)) {
        const field = form_control.form.get('cpf');
        field
          .valueChanges
          .subscribe(val => {
            field.setErrors({ incorrect: true });
            console.log('blur', field);
          });
        console.log(field);
      }

    }
  }

  public validateInput(str, strLength: number, nameField: string, form_control: NgForm): boolean {
    if (str) {
      let regex = /[.\-_\s]*/gi;
      let newstr: string = str.replace(regex, '');

      if (newstr.length == strLength) {
        if (form_control) {
          const field = form_control.form.get(nameField);
          console.log(nameField, newstr, newstr.length, field);


          field
            .valueChanges
            .subscribe(val => {
              field.setErrors(undefined);
            });

          return true;
        }

      } else if (newstr.length < strLength) {
        if (form_control) {
          let field = form_control.form.get(nameField);
          console.log(nameField, newstr, newstr.length, field);
          this.setErrorForm(field, { incorrect: true });
          return false;
        }
      }
    }
  }

  public validateInputs(str, strLength: number, nameField: string, form_control: NgForm): boolean {
    if (str) {
      let regex = /[_.-\s]/gi;
      let newstr: string = str.replace(regex, '');

      if (newstr.length > strLength) {
        if (form_control) {
          let field = form_control.form.get(nameField);
          console.log(field);
          this.setErrorForm(field, undefined);
          return true;
        }

      } else {
        if (form_control) {
          let field = form_control.form.get(nameField);
          this.setErrorForm(field, { incorrect: true });
          return false;
        }
      }
    }
  }

  private setErrorForm(field, value) {
    if (field) {
      field
        .valueChanges
        .subscribe(val => {
          console.log(field, value);
          field.setErrors(value);
        });
    }
  }

  public dateTimeToString(valueDate: Date): string {
    let day: String = valueDate.getDate() < 10 ? '0' + valueDate.getDate() : valueDate.getDate().toString();
    let month: String = (valueDate.getMonth() + 1) < 10 ? '0' + (valueDate.getMonth() + 1) : (valueDate.getMonth() + 1).toString();
    let year: String = valueDate.getFullYear().toString();
    let hours: String = valueDate.getHours() < 10 ? '0' + valueDate.getHours() : valueDate.getHours().toString();
    let minutes: String = valueDate.getMinutes() < 10 ? '0' + valueDate.getMinutes() : valueDate.getMinutes().toString();

    return day + '/' + month + '/' + year + ' ' + hours + 'h:' + minutes;
  }

  public removeSpaceString(str): string {
    if (str) {
      let regex = /\s/gi;
      let newStr: string = str.replace(regex, '');
      return newStr;
    } else {
      return undefined;
    }
  }

  //////////////novo methods//////////////////

  // public stringToDate(value): Date {
  //   let regex = /(\d+)[\/-](\d+)[\/-](\d+)/gi;

  //   if (regex.test(value)) {
  //     return new Date(+RegExp.$3, +RegExp.$2 - 1, +RegExp.$1);
  //   } else {
  //     return undefined;
  //   }
  // }

  public stringToDate(value): Date {
    if (!isNullOrUndefined(value)) {
      let regex = /(\d+)[\/-](\d+)[\/-](\d+)/gi;

      if (regex.test(value)) {
        value.replace(regex, '$1, $2, $3');

        if (RegExp.$3.length == 4 && RegExp.$2.length == 2 && RegExp.$1.length == 2) {

          return new Date(+RegExp.$3, +RegExp.$2 - 1, +RegExp.$1);
        }

        if (RegExp.$1.length == 4 && RegExp.$2.length == 2 && RegExp.$3.length == 2) {

          return new Date(+RegExp.$1, +RegExp.$2 - 1, +RegExp.$3);
        }
      }

      throw new Error("Erro em carregar data.");
    }
  }

  public dateToString(valueDate: Date): string {
    let day: String = valueDate.getDate() < 10 ? '0' + valueDate.getDate() : valueDate.getDate().toString();
    let month: String = (valueDate.getMonth() + 1) < 10 ? '0' + (valueDate.getMonth() + 1) : (valueDate.getMonth() + 1).toString();
    let year: String = valueDate.getFullYear().toString();

    return day + '/' + month + '/' + year;
  }



  // public resolveDateStringToString(value): String {
  //   let regex = /(\d+)[\/-](\d+)[\/-](\d+)/;
  //   value.replace(regex, '$1, $2, $3');
  //   let day = RegExp.$3;
  //   let month = RegExp.$2;
  //   let year = RegExp.$1; 

  //   return day +'/'+ month +'/'+ year;
  // }

}