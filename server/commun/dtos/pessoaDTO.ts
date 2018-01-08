import { ContatoDTO } from './contatoDTO';
import { EnderecoDTO } from './enderecoDTO';

export interface PessoaDTO {
    idPessoa?: number;

    contato?: ContatoDTO;

    endereco?: EnderecoDTO;

    nome?: string;

    sobrenome?: string;

    dataNascimento?: Date;

    rg?: string;

    cpf?: string;

    imagem?: string;

    apelido?: string;

    ativo?: boolean;
}