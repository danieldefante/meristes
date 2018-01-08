import { SubgrupoQuery } from './subgrupo.query';
import { Subgrupo } from './../../commun/subgrupo.entity';
import * as repository from '../../config/db.repository';
import { EnumMessageSubgrupo } from '../../utils/messages/enum.message.subgrupo';

export class SubgrupoValidator {

    constructor() {
    }

    public async validate(ministerio: Subgrupo) {

        try {
            const nomeConflito = await this.nomeConflito(ministerio);
            if (nomeConflito) return nomeConflito;

            return undefined;
        } catch (error) {
            console.log('Error validação Subgrupo', error);
        }
    }

    private async nomeConflito(subgrupo: Subgrupo) {

        try {
            let sql: string = SubgrupoQuery.FIND_NOME_CONFLITO;
            let params: any = [subgrupo.getNome()];

            if (subgrupo.getIdSubgrupo()) {
                sql.concat(' AND idSubgrupo <> ?');
                params.push(subgrupo.getIdSubgrupo());
            }

            const subgrupoConflito = await repository.query(sql, params);

            return subgrupoConflito.length > 0 ? EnumMessageSubgrupo.NOME_CONFLITO : undefined;
        } catch (error) {
            console.log('Error validação Nome Subgrupo em conflito', error);
        }
    }




    // static msg(errors): string {

    //     var keyNames = Object.keys(errors);

    //     if (keyNames[0]) {
    //         return errors[keyNames[0]].message;
    //     }
    //     return 'desconhecido';
    // }

    // static validator(v, cb) {
    //     setTimeout(function () {
    //         var phoneRegex = /\d{3}-\d{3}-\d{4}/;
    //         var msg = v + ' is not a valid phone number! chamou aquiiii';
    //         cb(phoneRegex.test(v), msg);
    //     }, 5);
    // }

}

// const jesus = async() => {

//     const params = {
//         id: {
//             _id: '59e2ce55e46cf91b16f6fce0'
//         }
//     }

//     try {
//         const pessoa = await repository.getById(params);
//         return pessoa;
//     } catch (error) {
//         console.log('falhouuu meu guri',error);
//     }

// }