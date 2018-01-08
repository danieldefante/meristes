//angular

//libs
import "reflect-metadata";
import { Get, QueryParam, Param, Post, Put, Body, Delete, JsonController } from 'routing-controllers';
import { plainToClass, classToClass } from 'class-transformer';

//this
import { AppRoutes } from './../app.routes';
import { Ministerio } from './../commun/ministerio.entity';
import { MinisterioDTO } from './../commun/dtos/ministerioDTO';
import { MinisterioController } from './../modules/ministerio/ministerio.controller';

@JsonController(AppRoutes.PATH_MINISTERIO)
export class MinisterioResource {

    // @Get('/:id')
    // async findOneById( @Param("id") id: number) {

    //     try {
    //         let pessoaController: PessoaController = new PessoaController();
    //         let pessoa = await pessoaController.findOneById(id);
    //         let pessoaDTO: PessoaDTO = classToClass(pessoa);
    //         return pessoaDTO;

    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }

    @Get()
    async getPaged( @QueryParam("page") page: number, @QueryParam("size") size: number) {
        try {
            let ministerioController: MinisterioController = new MinisterioController();

            return await ministerioController.getPaged(page, size);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Post()
    async create( @Body() ministerioDTO: MinisterioDTO) {
        try {

            let ministerioController: MinisterioController = new MinisterioController();
            let ministerio: Ministerio = plainToClass(Ministerio, ministerioDTO);

            return await ministerioController.create(ministerio);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // @Put('/:id')
    // async updateById( @Param("id") id: number, @Body() pessoaDTO: PessoaDTO) {
    //     try {

    //         let pessoaController: PessoaController = new PessoaController();
    //         let pessoa: Pessoa = plainToClass(Pessoa, pessoaDTO);

    //         return pessoaController.updateById(id, pessoa);
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }

    // @Delete('/:id')
    // async removeById( @Param("id") id: number) {
    //     try {
    //         let pessoaController: PessoaController = new PessoaController();

    //         return pessoaController.removeById(id);
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }

}