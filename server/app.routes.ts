export class AppRoutes {

    static PATH: string ='/api/v1/';
    static PATH_PESSOA: string = `pessoa`;
    static PATH_MINISTERIO: string = `ministerio`;
    static PATH_SUBGRUPO: string = `${AppRoutes.PATH_MINISTERIO}/:idMinisterio/subgrupo`;
    static PATH_CLASSIFICACAO_MEMBRO: string = `${AppRoutes.PATH_MINISTERIO}/:idMinisterio/classificacaomembro`;
    static PATH_FAVORITO: string = `favorito`;
    static PATH_VINCULO_PESSOA_SUBGRUPO: string = `${AppRoutes.PATH_SUBGRUPO}/:idSubgrupo/vinculopessoasubgrupo`;
}