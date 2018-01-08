//angular

//libs
import "reflect-metadata";
import * as HttpStatus from 'http-status';
import { JsonController, Get, QueryParam, Param, Post, Put, Body, Delete, Controller, BodyParam } from 'routing-controllers';

//this
import { EnumMessageMinisterio } from './../../utils/messages/enum.message.ministerio';
import { CrudRespost } from './../../utils/crudRespost';
import { AppRoutes } from './../../app.routes';
import { MinisterioQuery } from './../../modules/ministerio/ministerio.query';
import { BeanConsultGroup } from './../../utils/beanConsultGroup';
import * as repository from './../../config/db.repository';
// import { Ministerio } from './../../commun/ministerio.entity';
// import { MinisterioValidator } from './../../modules/ministerio/ministerio.validator';
// import { EnumMessageMinisterio } from "../../utils/messages/enum.message.ministerio";
// import { EnumMessage } from "../../utils/messages/enum.message";
// import { CrudRespost } from '../../utils/crudRespost';
// import { MeristesException } from '../../utils/excessao';
import { PagedResult } from '../../utils/pagedResult';
import { Ministerio } from "../../commun/ministerio.entity";

@JsonController()
export class MinisterioController {

    async getPaged(page: number, size: number) {
        try {
            let beanConsultGroup: BeanConsultGroup = new BeanConsultGroup(page, size);
            let params = beanConsultGroup.resolver();

            let pagedResult: PagedResult =  await repository.getPaged('ministerio', MinisterioQuery.FILL_PAGED, params);
          

            return pagedResult;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async create(ministerio: Ministerio) {
        try {
            // await new PessoaValidator().validate(pessoa);

            let respost: CrudRespost = await repository.create(ministerio);

            return respost.success(EnumMessageMinisterio.SAVE_SUCCESS);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // @Post(AppRoutes.PATH_MINISTERIO)
    // post( @Body() ministerio: Ministerio) {
    //     try {

    //         let isValid = new MinisterioValidator().validate(ministerio);

    //         if (isValid) {
    //             return repository.create(ministerio);
    //         }
    //     } catch (error) {
    //         throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    //     }
    // }

    // @Put(`${AppRoutes.PATH_MINISTERIO}/:id`)
    // async put( @Param("id") id: number, @Body() ministerio: Ministerio) {
    //     try {
    //         let isValid = await new MinisterioValidator().validate(ministerio);

    //         if (isValid) {
    //             let respost: CrudRespost = await repository.updateById(Ministerio, id, ministerio);
    //             return respost.success(EnumMessageMinisterio.SAVE_SUCCESS);
    //         }
    //     } catch (error) {
    //         throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    //     }
    // }

    // @Delete(`${AppRoutes.PATH_MINISTERIO}/:id`)
    // async remove( @Param("id") id: number) {
    //     try {
    //         let respost: CrudRespost = await repository.removeById(Ministerio, id);
    //         return respost.success(EnumMessageMinisterio.DELETE_SUCCESS);
    //     } catch (error) {
    //         throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    //     }
    // }
}