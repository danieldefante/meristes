import { EnumMessage } from './messages/enum.message';
import { MeristesException } from './excessao';
import * as HttpStatus from 'http-status';
import { Validator } from 'class-validator';

export class ValidatorEntity {
    constructor() {
    }

    protected async validateFields(entity: any, childrens?: any[]) {
        let validator = new Validator();
        let valuesValidate = await validator.validate(entity);
        let desc: string = '';
        let lancarExcessao: boolean = false;

        valuesValidate.forEach(element => {
            if (element.constraints) {
                lancarExcessao = true;
                let valueConstraints: string = '';
                let nameConstraints = Object.keys(element.constraints);

                let isUndefined = this.verificarUndefined(nameConstraints);

                if (!isUndefined) {
                    nameConstraints.forEach(e => {
                        valueConstraints = this.translate(valueConstraints, element, e);
                    });
                } else {
                    valueConstraints = this.translate(valueConstraints, element, 'isNotEmpty');
                }

                desc = desc.concat(valueConstraints.slice(0, valueConstraints.length));
            }
        });

        if (lancarExcessao) {
            throw new MeristesException(HttpStatus.EXPECTATION_FAILED,
                EnumMessage.VALIDATOR_ERROR, desc.slice(0, desc.length - 2)).toJSON();
        }

        if (childrens) {
            await this.validateChieldrens(entity, childrens);
        }

    }

    private translate(valueConstraints: string, element: any, e: string) {
        let msg: string = element.constraints[e];
        switch (e) {
            case 'minLength':
                msg = msg.replace('must be longer than or equal to', 'deve ser maior ou igual a').replace('characters', 'caracteres');
                break;
            case 'maxLength':
                msg = msg.replace('must be shorter than or equal to', 'deve ser menor ou igual a').replace('characters', 'caracteres');
                break;
            case 'isNotEmpty':
                msg = msg.replace('should not be empty', 'não deve estar vazio').replace('characters', 'caracteres');
                break;
            default:
                break;
        }
        valueConstraints = valueConstraints.concat(msg + ', ');
        return valueConstraints;
    }

    private verificarUndefined(nameConstraints) {
        let isNotEmpty = nameConstraints.find(e => e === 'isNotEmpty');
        if (isNotEmpty) return true;
        return false;
    }

    private async validateChieldrens(entity, values: any[]) {
        for (let i = 0; i < values.length; i++) {
            await this.validateFields(entity[values[i]]);
        }
    }

}