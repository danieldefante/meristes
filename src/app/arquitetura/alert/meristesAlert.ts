import { EnumMSG } from './../commun/enumMSG';
import { NotificationsService } from "angular2-notifications";

export class MeristesAlert {

    constructor(private notificationsService: NotificationsService) {
    }

    public options(): any {
        return {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true,
            maxLength: 1000,
            position: ["top", "right"],
            timeOut: 15000,
            lastOnBottom: true
        };
    }

    public show(data) {
        console.log('dentro do alert', data);
        let message;
        let descricao;
        let typeNotification;

        switch (data.status) {
            case 404:
                message = EnumMSG.ERROR_COMUNICACAO_SERVER;
                // descricao = EnumMSG.TENTE_NOVAMENTE;
                typeNotification = 'error';
                break;
            case 500:
            case 400:
                message = EnumMSG.ERROR_SERVER;
                // descricao = EnumMSG.TENTE_NOVAMENTE;
                typeNotification = 'error';
                break;
            default:
                if (typeof data._body === 'object') {
                    message = data._body.message;
                    descricao = data._body.descricao;
                    typeNotification = data._body.typeNotification;
                } else {
                    let body = JSON.parse(data._body);
                    message = body.message;
                    descricao = body.descricao;
                    typeNotification = body.typeNotification;
                }

                break;
        }


        this.notificationsService[typeNotification](message, descricao);
    }
}