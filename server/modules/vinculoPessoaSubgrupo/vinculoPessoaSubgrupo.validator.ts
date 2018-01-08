import { VinculoPessoaSubgrupo } from './../../commun/vinculoPessoaSubgrupo.entity';
import * as repository from './../../config/db.repository';
import { EnumMessageVinculoPessoaSubgrupo } from '../../utils/messages/enum.message.vinculoPessoaSubgrupo';
import { VinculoPessoaSubgrupoQuery } from './vinculoPessoaSubgrupo.query';

export class VinculoPessoaSubgrupoValidator {

    constructor() {

    }

    public async validate(vinculoPessoaSubgrupo: VinculoPessoaSubgrupo) {

        try {
            const isVinculada = await this.isVinculada(vinculoPessoaSubgrupo);
            if (isVinculada) return isVinculada;

            return undefined;
        } catch (error) {
            console.log('Error validação Vinculo Pessoa Subgrupo', error);
        }
    }

    private async isVinculada(vinculoPessoaSubgrupo: VinculoPessoaSubgrupo) {

        const params = [vinculoPessoaSubgrupo.getPessoa().getIdPessoa(),
        vinculoPessoaSubgrupo.getSubgrupo().getIdSubgrupo(),
        vinculoPessoaSubgrupo.getClassificacaoMembro().getIdClassificacaoMembro()
        ];

        try {
            const vinculoPessoaSubgrupoConflito = await repository.query(VinculoPessoaSubgrupoQuery.FIND_VINCULO, params);

            return (vinculoPessoaSubgrupoConflito.length > 0) ? vinculoPessoaSubgrupoConflito[0] : null;
        } catch (error) {
            console.log('Error validação vínculo pessoa subgrupo', error);
        }
    }

}
