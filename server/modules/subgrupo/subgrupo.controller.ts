import { SubgrupoValidator } from './../../modules/subgrupo/subgrupo.validator';
import { SubgrupoQuery } from './../../modules/subgrupo/subgrupo.query';
import { Ministerio } from './../../commun/ministerio.entity';
import { MeristesException } from './../../utils/excessao';
import { Put, Param, Post, Body, Get, Delete } from 'routing-controllers';
import { QueryParam } from 'routing-controllers';
import { JsonController } from 'routing-controllers';
import { Subgrupo } from './../../commun/subgrupo.entity';
import { BeanConsultGroup } from './../../utils/beanConsultGroup';
import { AppRoutes } from './../../app.routes';
import * as repository from  './../../config/db.repository';
import * as HttpStatus from 'http-status';
import { EnumMessageSubgrupo } from "../../utils/messages/enum.message.subgrupo";
import { EnumMessage } from "../../utils/messages/enum.message";
import { CrudRespost } from '../../utils/crudRespost';

@JsonController()
export class SubgrupoController {

    @Get(AppRoutes.PATH_SUBGRUPO)
    async getPaged( @QueryParam("page") page: number, @QueryParam("size") size: number) {
        try {
            let beanConsultGroup: BeanConsultGroup = new BeanConsultGroup(page, size);
            let params = beanConsultGroup.resolver();

            return await repository.getPaged('subgrupo', SubgrupoQuery.FILL_PAGED, params);
        } catch (error) {
            console.log(error);
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Get(`${AppRoutes.PATH_SUBGRUPO}/:id`)
    async getById( @Param("id") id: number) {

        try {
            const subgrupo = await repository.findOneById(Subgrupo, id);
            return subgrupo;

        } catch (error) {
            console.log(error);
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Post(AppRoutes.PATH_SUBGRUPO)
    async post( @Body() subgrupo: Subgrupo) {
        try {
            let isValid = await new SubgrupoValidator().validate(subgrupo);

            if (isValid) {
                return await repository.create(subgrupo);
            }
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Put(`${AppRoutes.PATH_SUBGRUPO}/:id`)
    async put( @Param("id") id: number, @Body() subgrupo: Subgrupo) {
        try {
            let isValid = await new SubgrupoValidator().validate(subgrupo);

            if (isValid) {
                let respost: CrudRespost = await repository.updateById(Subgrupo, id, subgrupo);
                return respost.success(EnumMessageSubgrupo.SAVE_SUCCESS);
            }
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }

    @Delete(`${AppRoutes.PATH_SUBGRUPO}/:id`)
    async remove( @Param("id") id: number) {
        try {
            let respost: CrudRespost = await repository.removeById(Subgrupo, id);
            return respost.success(EnumMessageSubgrupo.DELETE_SUCCESS);
        } catch (error) {
            throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
        }
    }
}