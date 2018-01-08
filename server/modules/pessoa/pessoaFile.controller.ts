import "reflect-metadata";
import * as repository from './../../config/db.repository';
import { EnumMessagePessoa } from "../../utils/messages/enum.message.pessoa";
import { CrudRespost } from '../../utils/crudRespost';
import { PessoaFile } from '../../commun/entitys/pessoaFile.entity';
import { PessoaQuery } from "./pessoa.query";

export class PessoaFileController {

    async findOneById(id: number) {

        try {
            let file: PessoaFile = await repository.findOneById<PessoaFile>(PessoaFile, id);

            return file;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findPorPessoa(idPessoa: number) {
        
                try {
                    let file = await repository.query(PessoaQuery.FILL_PESSOAFILE_SEM_BUFFER, idPessoa);
        
                    return file;
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }

    async create(pessoaFile: PessoaFile) {
        try {

            let respost: CrudRespost = await repository.create(pessoaFile, false);

            return respost.success(EnumMessagePessoa.SAVE_SUCCESS_FILE);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateById(id: number, pessoaFile: PessoaFile) {
        try {

            let respost: CrudRespost = await repository.updateById(PessoaFile, id, pessoaFile);

            return respost.success(EnumMessagePessoa.SAVE_SUCCESS_FILE);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
