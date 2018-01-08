export enum PessoaQuery {

    FILL_PAGED = 'SELECT p.idPessoa, p.nome, p.sobrenome, p.apelido, pf.buffer imagem FROM meristesdb.pessoa p  LEFT JOIN meristesdb.pessoa_file pf ON(pf.pessoaIdPessoa = p.idPessoa) ORDER BY nome ASC LIMIT ?, ?',
    NOME_EM_CONFLITO = 'SELECT idPessoa, nome, sobrenome, apelido FROM meristesdb.pessoa WHERE UPPER(nome) = UPPER(?) AND UPPER(sobrenome) = UPPER(?)',
    SIZE_DB = 'SELECT COUNT(*) AS sizeDB FROM meristesdb.pessoa',
    FILL_PESSOAFILE_SEM_BUFFER = 'SELECT pf.idPessoaFile, pf.size, pf.mimetype, pf.pessoaIdPessoa FROM meristesdb.pessoa_file pf WHERE pf.pessoaIdPessoa = ?',



}

// export enum PessoaQuery {

//     FILL_PAGED = 'SELECT idPessoa, nome, sobrenome, apelido, imagem FROM pessoa ORDER BY nome DESC LIMIT ?, ?',
//     NOME_EM_CONFLITO = 'SELECT idPessoa, nome, apelido FROM pessoa WHERE UPPER(nome) = UPPER(?) AND UPPER(sobrenome) = UPPER(?)',
//     SIZE_DB = 'SELECT COUNT(*) AS sizeDB FROM pessoa'


// }