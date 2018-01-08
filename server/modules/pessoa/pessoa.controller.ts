import { Endereco } from './../../commun/entitys/endereco.entity';
import { Contato } from './../../commun/entitys/contato.entity';
import { PagedResult } from './../../utils/pagedResult';
import { ImageUtil } from './../../utils/imageUtil';
import { PessoaQuery } from './../../modules/pessoa/pessoa.query';
import { BeanConsultGroup } from './../../utils/beanConsultGroup';
import { PessoaValidator } from './../../modules/pessoa/pessoa.validator';
import * as repository from './../../config/db.repository';
import { EnumMessagePessoa } from "../../utils/messages/enum.message.pessoa";
import { CrudRespost } from '../../utils/crudRespost';
import { Pessoa } from '../../commun/entitys/pessoa.entity';
import { PessoaFile } from '../../commun/entitys/pessoaFile.entity';

import "reflect-metadata";

export class PessoaController {

    async getPaged(page: number, size: number) {
        try {
            let beanConsultGroup: BeanConsultGroup = new BeanConsultGroup(page, size);
            let params = beanConsultGroup.resolver();

            let pagedResult: PagedResult =  await repository.getPaged('pessoa', PessoaQuery.FILL_PAGED, params);
            let imageUtil: ImageUtil = new ImageUtil();

            return imageUtil.resolverPagedResultBlobToBase64(pagedResult, 'imagem');

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findOneById(id: number) {

        try {
            
            let pessoa = await repository.findOneById(Pessoa, id);

            let imageUtil: ImageUtil = new ImageUtil();
            return imageUtil.resolverBlobToBase64(pessoa, 'pessoaFile', 'buffer');

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(pessoa: Pessoa) {
        try {
            pessoa.setDataNascimento(new Date(pessoa.getDataNascimento()));
            await new PessoaValidator().validate(pessoa);

            let respost: CrudRespost = await repository.create(pessoa);

            return respost.success(EnumMessagePessoa.SAVE_SUCCESS);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateById(id: number, pessoa: Pessoa) {
        try {
            pessoa.setDataNascimento(new Date(pessoa.getDataNascimento()));
            
            await new PessoaValidator().validate(pessoa);
           
//retirar quando, verificar cascate update
let endereco: Endereco = pessoa.getEndereco();
await repository.updateById(Endereco, endereco.getIdEndereco(), endereco);
let contato: Contato = pessoa.getContato();
await repository.updateById(Contato, contato.getIdContato(), contato);
//retirar quando, verificar cascate update

            let respost: CrudRespost = await repository.updateById(Pessoa, id, pessoa);

            return respost.success(EnumMessagePessoa.SAVE_SUCCESS);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async removeById(id: number) {
        try {
            let respost: CrudRespost = await repository.removeById(Pessoa, id);

            return respost.success(EnumMessagePessoa.DELETE_SUCCESS);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}
