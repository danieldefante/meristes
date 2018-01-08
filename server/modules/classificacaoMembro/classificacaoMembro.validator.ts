import { ClassificacaoMembro } from './../../commun/classificacaoMembro.entity';
import * as repository from '../../config/db.repository';
import { ClassificacaoMembroQuery } from './classificacaoMembro.query';
import { EnumMessageClassificacaoMembro } from '../../utils/messages/enum.message.classificacaoMembro';

export class ClassificacaoMembroValidator {

    constructor() {
    }

    public async validate(classificacaoMembro: ClassificacaoMembro) {

        try {
            const descricaoConflito = await this.descricaoConflito(classificacaoMembro);
            if (descricaoConflito) return descricaoConflito;

            return undefined;
        } catch (error) {
            console.log('Error validação Classificação Membro', error);
        }
    }

    private async descricaoConflito(classificacaoMembro: ClassificacaoMembro) {

        try {
            let sql: string = ClassificacaoMembroQuery.FIND_DESCRICAO_CONFLITO;
            let params: any = [classificacaoMembro.getDescricao()];

            if (classificacaoMembro.getIdClassificacaoMembro()) {
                sql.concat(' AND idClassificacaoMembro <> ?');
                params.push(classificacaoMembro.getIdClassificacaoMembro());
            }

            const classificacaoMembroConflito = await repository.query(sql, params);

            return classificacaoMembroConflito.length > 0 ? EnumMessageClassificacaoMembro.DESCRICAO_CONFLITO : undefined;
        } catch (error) {
            console.log('Error validação descricao Classificação Membro em conflito', error);
        }
    }
}