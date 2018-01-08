import { HttpError } from "routing-controllers";

export class CrudRespost {

    constructor(private data?: any) {

    }

    public success(message: string, descricao?: string, ) {
        return {
            _body: {
                typeNotification: 'success',
                message: message,
                descricao: descricao
            },
            data: this.data
        };
    }

    public warn(message: string, descricao?: string) {
        return {
            _body: {
                typeNotification: 'warn',
                message: message,
                descricao: descricao
            }
        };
    }

    public alert(message: string, descricao?: string) {
        return {
            _body: {
                typeNotification: 'alert',
                message: message,
                descricao: descricao
            }
        };
    }

    public info(message: string, descricao?: string) {
        return {
            _body: {
                typeNotification: 'info',
                message: message,
                descricao: descricao
            }
        };
    }

    public error(message: string, descricao?: string) {
        return {
            _body: {
                typeNotification: 'error',
                message: message,
                descricao: descricao
            }
        };
    }
}