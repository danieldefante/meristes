import { LoaderService } from './../../services/loaderService';
import { NotificationsService } from 'angular2-notifications';
import { MeristesAlert } from '../alert/meristesAlert';

export class CommunComponent {
    
    protected meristesAlert: MeristesAlert;
    public optionsMeristesAlert;
    protected loaderService: LoaderService = new LoaderService();
    constructor(notificationsService: NotificationsService) {

        this.meristesAlert = new MeristesAlert(notificationsService);
        this.optionsMeristesAlert = this.meristesAlert.options();
        // this.loaderService = loaderService;
    }

    protected spinner(value){
        this.loaderService.display(value);
    }

    protected alertShow(value){
        this.meristesAlert.show(value);
    }

    protected resolver(data: any, fields?: any[]) {

        let res: any = {};
        let dataNameFields = Object.keys(data);
        let test: number;
        dataNameFields.forEach(element => {
            if (fields) {

                test = this.findIndexElement(fields, element);
                if (test > -1) {
                    res[element] = fields[test].valueField;
                } else {
                    res[element] = data[element];
                }
            } else {
                res[element] = data[element];
            }
        });

        return res;
    }

    private findIndexElement(fields: any[], el): number {
        let _index: number = -1;
        let i = 0;
        fields.forEach(element => {
            if (element.nameField === el) {
                _index = i;
            }
            i++;
        });

        return _index;
    }

}