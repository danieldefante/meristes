import { HttpError } from "routing-controllers";

// export class MeristesException extends HttpError {
//     // readonly typeNotification: string;
//     // readonly message: string;
//     // httpCode: number;

//     constructor(httpCode: number, typeNotification: string, message: string, descricao?: any) {
//         super(httpCode, message);

//     }

//     // public static msg(message: string, params: string[]): string {
//     //     for (var i = 0; i < params.length; i++) {
//     //         message = message.replace('{' + i + '}', params[i]);
//     //     }

//     //     return message;
//     // }
// }




export class MeristesException extends HttpError {
    public httpCode: number;
    public message: string;
    public descricao: string;
    public typeNotification: string;

    // constructor(httpCode: number, message: string, descricao?: string, args: any[] = []) {
    constructor(httpCode: number, message: string, descricao?: string, typeNotification?: string) {

        super(httpCode);
        Object.setPrototypeOf(this, MeristesException.prototype);

        this.httpCode = httpCode;
        this.message = message;
        this.descricao = descricao;
        this.typeNotification = typeNotification ? typeNotification : 'error'; // can be used for internal logging
    }

    toJSON(params?: any[]) {

        if (params) {
            let _descricao: string;

            for (let i = 0; i < params.length; i++) {
                _descricao = this.descricao.replace('{' + i + '}', params[i]);
                this.descricao = _descricao;
            }

        }

        let retorno = {
            httpCode: this.httpCode,
            message: this.message,
            descricao: this.descricao,
            typeNotification: this.typeNotification
        }

        return retorno;
    }
}












// export class MeristesException {
//     readonly descricao: string;
//     // readonly stack: string
//     readonly message: string;
//     constructor(message: string, a: string) {
//       const error = new Error(message)
//     //   this.stack  = error.stack
//       this.message = error.message
//       this.descricao = a; 
//     }
//   }