import { PessoaFileController } from './../modules/pessoa/pessoaFile.controller';
import "reflect-metadata";
import { Pessoa } from './../commun/entitys/pessoa.entity';
import { PessoaFileDTO } from './../commun/dtos/pessoaFileDTO';
import { PessoaFile } from './../commun/entitys/pessoaFile.entity';
import { AppRoutes } from './../app.routes';
import { PessoaDTO } from '../commun/dtos/pessoaDTO';
import { plainToClass, classToClass } from 'class-transformer';
import { Controller, UploadedFile, Param, Get, Post, Put } from 'routing-controllers';

@Controller(AppRoutes.PATH_PESSOA +'/:idPessoa/file')
export class PessoaFileResource {

    @Get("/porpessoa/sembuffer")
    async findPorPessoa( @Param("idPessoa") idPessoa: number) {
        try {
            let pessoaFileController: PessoaFileController = new PessoaFileController();
            let pessoaFile = await pessoaFileController.findPorPessoa(idPessoa);
            
            let pessoaFileDTO: PessoaFileDTO = classToClass(pessoaFile);

            return pessoaFileDTO[0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get('/:id')
    async findOneById( @Param("id") id: number) {

        try {
            let pessoaFileController: PessoaFileController = new PessoaFileController();
            let pessoaFile :PessoaFile = await pessoaFileController.findOneById(id);

            let pessoaFileDTO: PessoaFileDTO = {};
            pessoaFileDTO.idPessoaFile = pessoaFile.getIdPessoaFile();
            pessoaFileDTO.mimetype = pessoaFile.getMimetype();
            pessoaFileDTO.size = pessoaFile.getSize();
            pessoaFileDTO.buffer = pessoaFile.getBuffer().toString('base64'); 

            return pessoaFileDTO;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Post()
    async create( @Param("idPessoa") idPessoa: number, @UploadedFile("file") file: any) {

        let pessoaFileController: PessoaFileController = new PessoaFileController();

        let pessoa: Pessoa = new Pessoa();
        pessoa.setIdPessoa(idPessoa);

        let pessoaFile: PessoaFile = new PessoaFile();
        pessoaFile.setPessoa(pessoa);
        pessoaFile.setMimetype(file.mimetype);
        pessoaFile.setSize(file.size);
        pessoaFile.setBuffer(file.buffer);

        return await pessoaFileController.create(pessoaFile);
    }

    @Put('/:id')
    async updateById( @Param("idPessoa") idPessoa: number, @Param("id") id: number, @UploadedFile("file") file: any) {

        let pessoaFileController: PessoaFileController = new PessoaFileController();

        let pessoa: Pessoa = new Pessoa();
        pessoa.setIdPessoa(idPessoa);

        let pessoaFile: PessoaFile = new PessoaFile();
        pessoaFile.setPessoa(pessoa);
        pessoaFile.setIdPessoaFile(id);
        pessoaFile.setMimetype(file.mimetype);
        pessoaFile.setSize(file.size);
        pessoaFile.setBuffer(file.buffer);

        return await pessoaFileController.updateById(id, pessoaFile);
    }
}