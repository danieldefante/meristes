import { Endereco } from './Endereco';
import { Contato } from './Contato';
export class Pessoa {

    public idPessoa?: number;
    public nome?: string;
    public sobrenome?: string;
    public contato?: Contato;
    public endereco?: Endereco;
    public dataNascimento?: Date;
    public dN?: string;
    public rg?: string;
    public cpf?: string;
    public imagem?: string;
    public apelido?: string;
    public codigo?: number;
    public pessoaFile: {
        idPessoaFile: number,
        mimetype?: string;
        pessoaIdPessoa?: string;
        size?: number;
        buffer?: any;
    }

    constructor() {
        this.endereco = new Endereco();
        this.contato = new Contato();
    }

}
