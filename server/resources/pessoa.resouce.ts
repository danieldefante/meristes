import { Contato } from './../commun/entitys/contato.entity';
import "reflect-metadata";
import { Pessoa } from './../commun/entitys/pessoa.entity';
import { PessoaController } from './../modules/pessoa/pessoa.controller';
import { AppRoutes } from './../app.routes';
import { Get, QueryParam, Param, Post, Put, Body, Delete, JsonController } from 'routing-controllers';
import { plainToClass, classToClass } from 'class-transformer';
import { PessoaDTO } from '../commun/dtos/pessoaDTO';
import { Endereco } from "../commun/entitys/endereco.entity";

@JsonController(AppRoutes.PATH_PESSOA)
export class PessoaResource {

    @Get("/test")
    getAll() {
       return "This action returns all users";
    }

    @Get('/:id')
    async findOneById( @Param("id") id: number) {

        try {
            let pessoaController: PessoaController = new PessoaController();
            let pessoa = await pessoaController.findOneById(id);
            let pessoaDTO: PessoaDTO = classToClass(pessoa);
            return pessoaDTO;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get()
    async getPaged( @QueryParam("page") page: number, @QueryParam("size") size: number) {
        try {
            let pessoaController: PessoaController = new PessoaController();

            return await pessoaController.getPaged(page, size);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Post()
    async create( @Body() pessoaDTO: PessoaDTO) {
        try {

            let pessoaController: PessoaController = new PessoaController();
            let pessoa: Pessoa = plainToClass(Pessoa, pessoaDTO);

            return await pessoaController.create(pessoa);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Put('/:id')
    async updateById( @Param("id") id: number, @Body() pessoaDTO: PessoaDTO) {
        try {

            let pessoaController: PessoaController = new PessoaController();
            let pessoa: Pessoa = plainToClass(Pessoa, pessoaDTO);

            return pessoaController.updateById(id, pessoa);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Delete('/:id')
    async removeById( @Param("id") id: number) {
        try {
            let pessoaController: PessoaController = new PessoaController();

            return pessoaController.removeById(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}