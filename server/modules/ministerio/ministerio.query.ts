// export enum MinisterioQuery {

//     FILL_PAGED = 'SELECT nome, descricao FROM meristesdb.ministerio ORDER BY nome DESC LIMIT ?, ?',
//     NOME_CONFLITO = 'SELECT * FROM meristesdb.ministerio WHERE UPPER(nome) = UPPER(?)',
// }

export enum MinisterioQuery {

    FILL_PAGED = 'SELECT nome, descricao FROM ministerio ORDER BY nome DESC LIMIT ?, ?',
    NOME_CONFLITO = 'SELECT * FROM ministerio WHERE UPPER(nome) = UPPER(?)',
} 
