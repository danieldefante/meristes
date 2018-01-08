export enum FavoritoQuery {

    FILL_PAGED = 'SELECT * FROM meristesdb.favorito ORDER BY descricao DESC LIMIT ?, ?',
    DESCRICAO_EM_CONFLITO = 'SELECT * FROM meristesdb.favorito WHERE UPPER(descricao) = UPPER(?)'
}