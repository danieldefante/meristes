import { MeristesException } from './../../utils/excessao';
import { Pessoa } from './../../commun/entitys/pessoa.entity';
import { ValidatorEntity } from './../../utils/validatorEntity';
import { EnumMessagePessoa } from '../../utils/messages/enum.message.pessoa';
import * as repository from '../../config/db.repository';
import { PessoaQuery } from './pessoa.query';
import * as HttpStatus from 'http-status';
import { HttpError } from 'routing-controllers';
import { EnumMessage } from '../../utils/messages/enum.message';

export class PessoaValidator extends ValidatorEntity{

    constructor() {
        super();
    }

    public async validate(pessoa: Pessoa) {
        try{
            await this.validateFields(pessoa, ['endereco', 'contato']);
            await this.nomeConflito(pessoa);
        }catch(error){
            throw error;
        }
    }

    private async nomeConflito(pessoa: Pessoa) {
        try {
            let sql: string = PessoaQuery.NOME_EM_CONFLITO;
            let params: any = [pessoa.getNome(), pessoa.getSobrenome()];

            if (pessoa.getApelido()) {
                sql = sql.concat(' AND UPPER(apelido) = UPPER(?)')
                params.push(pessoa.getApelido());
            }

            if (pessoa.getIdPessoa()) {
                sql = sql.concat(' AND idPessoa <> ?');
                params.push(pessoa.getIdPessoa());
            }

            const pessoaConflito = await repository.query(sql, params);
            if (pessoaConflito.length > 0) {
                throw new MeristesException(HttpStatus.CONFLICT, 
                    EnumMessage.VALIDATOR_ERROR, EnumMessagePessoa.NOME_CONFLITO).toJSON([pessoaConflito[0].nome, pessoaConflito[0].sobrenome]);
            }
        } catch (error) {
            throw error;
        }
    }
}