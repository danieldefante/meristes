import "reflect-metadata";
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { createConnection } from "typeorm";

// import { PessoaFile } from './commun/entitys/pessoaFile.entity';
// import { Endereco } from './commun/entitys/endereco.entity';
// import { ExecutarScriptDB } from './config/executarScriptDB';
// import { Favorito } from './commun/favorito.entity';
// import { Subgrupo } from './commun/subgrupo.entity';
// import { Ministerio } from './commun/ministerio.entity';
// import { ClassificacaoMembro } from './commun/classificacaoMembro.entity';
// import { VinculoPessoaSubgrupo } from './commun/vinculoPessoaSubgrupo.entity';
// import { Contato } from "./commun/entitys/contato.entity";
import { Pessoa } from './commun/entitys/pessoa.entity';

class App {
    public app: express.Application;
    private morgan: morgan.Morgan;

    constructor() {
        this.app = express();
        this.middleware();
    }

    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        // this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function (req, res, next) {
            // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            // res.setHeader('Access-Control-Allow-Credentials', "true");
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Request-Method', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.setHeader('Access-Control-Allow-Credentials', "true");
            next();
        });
        this.app.disable('etag');

    }

}

//retirar pq precisa estar no server
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "78917072",
    database: "meristesdb",
    entities: [
        // ClassificacaoMembro,
        // Contato,
        // Endereco,
        // Favorito,
        // Ministerio,
        Pessoa,
        // Subgrupo,
        // VinculoPessoaSubgrupo,
        // PessoaFile
    ],
    synchronize: true,
    logging: true
})
    .then(async (connection) => {
        console.log("Conexão estabelecida com sucesso ao Banco de Dados!");

        // let exec: ExecutarScriptDB = new ExecutarScriptDB();
        // exec.executar(exec.scriptsDB.showTables);
    }).catch((error) => {
        console.log("Erro ao estabelecer conexão ao Banco de Dados: ", error);
    });

export default new App();