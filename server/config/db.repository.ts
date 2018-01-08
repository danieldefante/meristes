import { EnumMessage } from './../utils/messages/enum.message';
import { ResolverCountDB } from './../utils/resolverCountDB';
import { PagedResult } from './../utils/pagedResult';
import { getConnection } from 'typeorm';
import * as HttpStatus from 'http-status';
import { CrudRespost } from '../utils/crudRespost';
import { MeristesException } from '../utils/excessao';

const query = async (sql, params?) => {
    try {
        let respost = await getConnection().manager.query(sql, params);

        return respost;
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}

const getPaged = async (clazz: string, sql: string, params?) => {
    try {

        let dataList = await getConnection().manager.query(sql, params);
        let resolverCountDB: ResolverCountDB = new ResolverCountDB();
        let sizeDB = await resolverCountDB.getSizeDB(clazz);

        let pagedResult: PagedResult = new PagedResult(sizeDB, dataList);

        return pagedResult;
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}

const findOneById = async <T>(clazz, id: number) => {
    try {
        let respost: T = <T> await getConnection().manager.findOneById(clazz, id);

        return respost;
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}

const create = async (entity, requireReturn?: boolean) => {

    try {
        let respost = await getConnection().manager.save(entity);
        
        requireReturn = (!requireReturn && requireReturn === false)  ? false : true;
        return new CrudRespost(requireReturn ? respost : undefined);
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}

const updateById = async (clazz, id: number, entity) => {
    try {
        await getConnection().manager.updateById(clazz, id, entity);
        
        return new CrudRespost();
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}

const removeById = async (clazz, id: number) => {
    try {
        await getConnection().manager.removeById(clazz, id);

        return new CrudRespost();
    } catch (error) {
        console.log(error);
        throw new MeristesException(HttpStatus.BAD_REQUEST, EnumMessage.SERVER_ERROR, 'warn', error);
    }
}


export { query, getPaged, findOneById, create, updateById, removeById }