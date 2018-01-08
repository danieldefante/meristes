import { EnumMessageMinisterio } from './../../utils/messages/enum.message.ministerio';
import { MinisterioQuery } from './ministerio.query';
import { Ministerio } from './../../commun/ministerio.entity';
import * as repository from '../../config/db.repository';
import { MeristesException } from '../../utils/excessao';
import * as HttpStatus from 'http-status';


export class MinisterioValidator {

    constructor() {
    }
    
    public async validate(ministerio: Ministerio) {

        await this.nomeConflito(ministerio);
        
        return true;
    }

    private async nomeConflito(ministerio: Ministerio) {
        try {
            let sql: string = MinisterioQuery.NOME_CONFLITO;
            console.log('no validador', typeof ministerio.getNome());
            let params: any = [ministerio.getNome()];

            
            if(ministerio.getIdMinisterio()){
                sql = sql.concat(' AND idMinisterio <> ?');
                params.push(ministerio.getIdMinisterio());
            }
            
            const ministerioConflito = await repository.query(sql, params);
            console.log('o retorno da consulta', ministerioConflito);
            if(ministerioConflito.length > 0) {
                throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessageMinisterio.NOME_CONFLITO, 'warn', '');
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}