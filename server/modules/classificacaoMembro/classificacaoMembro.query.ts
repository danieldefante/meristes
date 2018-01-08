export enum ClassificacaoMembroQuery {

    FILL_PAGED = 'SELECT nome, descricao FROM meristesdb.classificacaoMembro ORDER BY nome DESC LIMIT ?, ?',
    FIND_DESCRICAO_CONFLITO = 'SELECT * FROM meristesdb.classificacaoMembro WHERE UPPER(descricao) = UPPER(?)',
}