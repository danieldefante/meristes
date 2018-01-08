import { Favorito } from './../../commun/favorito.entity';
import { EnumMessageFavorito } from '../../utils/messages/enum.message.favorito';
import * as repository from '../../config/db.repository';
import { FavoritoQuery } from './favorito.query';

export class FavoritoValidator {

    constructor() {

    }

    public async validate(favorito: Favorito) {

        try {
            const descricaoConflito = await this.descricaoConflito(favorito);
            if (descricaoConflito) return descricaoConflito;

            return undefined;
        } catch (error) {
            console.log('Error validação Favorito', error);
        }
    }

    private async descricaoConflito(favorito: Favorito) {

        try {
            let sql: string = FavoritoQuery.DESCRICAO_EM_CONFLITO;
            let params: any = [favorito.getDescricao()];

            const favoritoConflito = await repository.query(sql, params);

            return favoritoConflito.length > 0 ? EnumMessageFavorito.DESCRICAO_CONFLITO : undefined;
        } catch (error) {
            console.log('Error validação Descrição Favorito em conflito', error);
        }
    }

    static msg(errors): string {

        var keyNames = Object.keys(errors);

        if (keyNames[0]) {
            return errors[keyNames[0]].message;
        }
        return 'desconhecido';
    }

    static validator(v, cb) {
        setTimeout(function () {
            var phoneRegex = /\d{3}-\d{3}-\d{4}/;
            var msg = v + ' is not a valid phone number! chamou aquiiii';
            cb(phoneRegex.test(v), msg);
        }, 5);
    }
}