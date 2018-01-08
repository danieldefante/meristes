import { HttpError } from 'routing-controllers';
import { createConnection, getConnection } from 'typeorm';

export class ResolverCountDB{

    constructor(){

    }

    async getSizeDB(clazz: string){
        try{
            let sql = `SELECT COUNT(*) AS sizeDB FROM ${clazz}`;
            let sizeDB = await getConnection().manager.query(sql);
            return sizeDB[0].sizeDB;
        }catch(HttpError){

        }
    }
}