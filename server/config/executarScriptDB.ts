import { createConnection, getConnection } from 'typeorm';

export class ExecutarScriptDB {
    constructor() {
    }

    public scriptsDB = {
        showTables: 'SHOW TABLES IN meristesdb;',
        drop: 'drop tables meristesdb.vinculo_pessoa_subgrupo, meristesdb.classificacao_membro, meristesdb.favorito, meristesdb.subgrupo, meristesdb.ministerio, meristesdb.pessoa, meristesdb.contato, meristesdb.endereco;'
    }

    async executar(sql, params?) {

        try {
            let respost = await getConnection().manager.query(sql, params);

            console.log(respost);
        } catch (error) {
            console.log(error);
        }
    }
}


// host: 'mysql857.umbler.com',
// port: 41890,
// username: 'meristesadmin',
// password: 'M78917072',