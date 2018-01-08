import { AppRoutes } from './../../app.routes';
import { EnumMessageFavorito } from './../../utils/messages/enum.message.favorito';
import { CrudRespost } from './../../utils/crudRespost';
import { FavoritoValidator } from './../../modules/favorito/favorito.validator';
import { Favorito } from './../../commun/favorito.entity';
import { FavoritoQuery } from './../../modules/favorito/favorito.query';
import { EnumMessage } from './../../utils/messages/enum.message';
import { MeristesException } from './../../utils/excessao';
import { BeanConsultGroup } from './../../utils/beanConsultGroup';
import { JsonController, Get, QueryParam, Post, Body, Param, Delete, Put } from 'routing-controllers';
import * as HttpStatus from 'http-status';
import "reflect-metadata";
import * as repository from  './../../config/db.repository';

@JsonController()
export class FavoritoController {
    
    @Get(AppRoutes.PATH_FAVORITO)
    async getPaged( @QueryParam("page") page: number, @QueryParam("size") size: number) {
        try {
            let beanConsultGroup: BeanConsultGroup = new BeanConsultGroup(page, size);
            let params = beanConsultGroup.resolver();

            return await repository.getPaged('favorito', FavoritoQuery.FILL_PAGED, params);
        } catch (error) {
            console.log(error);
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Get(`${AppRoutes.PATH_FAVORITO}/:id`)
    async getById( @Param("id") id: number) {

        try {
            const favorito = await repository.findOneById(Favorito, id);
            return favorito;

        } catch (error) {
            console.log(error);
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Post(AppRoutes.PATH_FAVORITO)
    async post( @Body() favorito: Favorito) {
        try {
            let isValid = await new FavoritoValidator().validate(favorito);

            if (isValid) {
                return await repository.create(favorito);
            }
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Put(`${AppRoutes.PATH_FAVORITO}/:id`)
    async put( @Param("id") id: number, @Body() favorito: Favorito) {
        try {
            let isValid = await new FavoritoValidator().validate(favorito);

            if (isValid) {
                let respost: CrudRespost = await repository.updateById(Favorito, id, favorito);
                return respost.success(EnumMessageFavorito.SAVE_SUCCESS);
            }
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Delete(`${AppRoutes.PATH_FAVORITO}/:id`)
    async remove( @Param("id") id: number) {
        try {
            let respost: CrudRespost = await repository.removeById(Favorito, id);
            return respost.success(EnumMessageFavorito.DELETE_SUCCESS);
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }
}