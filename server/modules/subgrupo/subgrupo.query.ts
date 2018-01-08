export enum SubgrupoQuery {

    FILL_PAGED = 'SELECT nome, descricao FROM meristesdb.subgrupo ORDER BY nome DESC LIMIT ?, ?',
    FIND_NOME_CONFLITO = 'SELECT * FROM meristesdb.subgrupo WHERE nome = ?',
}

// export enum SubgrupoQuery {

//     FILL_PAGED = 'SELECT nome, descricao FROM subgrupo ORDER BY nome DESC LIMIT ?, ?',
//     FIND_NOME_CONFLITO = 'SELECT * FROM subgrupo WHERE nome = ?',
// }