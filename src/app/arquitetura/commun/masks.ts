export class Masks {
    
      public cell = ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      public telephone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      public dateTime = [/[0-1-2-3]/, /[0-9]/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1-2]/, /\d/, 'h', ':', /[0-1-2-3-4-5-6]/, /\d/];
      public date = [/[0-1-2-3]/, /[0-9]/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
      public rgMaior = [ /\d/ , /\d/ ,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
      public rgMenor = [ /\d/ ,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
      public cpf = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/];
      
    
      ///deletar
      public masks = {
        cell: ['(', /[1-9]/, /\d/, ')', ' ', /\d/ , /\d/ , /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        dateTime: [/[0-1-2-3]/, /[0-9]/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /[0-1-2]/, /\d/, 'h', ':', /[0-1-2-3-4-5-6]/, /\d/],
        date: [/[0-1-2-3]/, /[0-9]/, '/', /[0-1]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
        rgMaior: [ /\d/ , /\d/ ,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/],
        rgMenor: [ /\d/ ,'.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        cpf: [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/],
      }
    
      constructor() { 
      }
    
      public getRG(str) {
        let regex = /[_.-\s]/gi;
        let mask = this.rgMaior;
        let placeholderChar = '_';
    
        if(str){
          let newstr: string = str.replace(regex, '');
          if (newstr.length > 8) {
            placeholderChar = ' ';
            mask = this.rgMaior;
          }else if(newstr.length == 8){
            placeholderChar = ' ';
            mask =  this.rgMenor;
          }else {
            placeholderChar = '_';
            mask =  this.rgMenor;
          }
        }
    
        return {mask: mask, placeholderChar: placeholderChar};
      }
    }