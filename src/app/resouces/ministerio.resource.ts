//angular
import {Injectable} from '@angular/core';
import {RequestMethod} from '@angular/http';

//libs

//this
import { REST_API } from './../app.component';
import { Paged } from './../arquitetura/commun/paged';
import { Resource, ResourceParams, ResourceAction, ResourceMethod, ResourceMethodStrict } from 'ngx-resource';
import { Ministerio } from '../class/Ministerio';


@Injectable()
@ResourceParams({
  url : REST_API + 'ministerio',
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class MinisterioResource extends Resource {

 @ResourceAction({
    isArray: false
  })
  getPaged: ResourceMethod<Paged, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: false,
    path: '/{!idMinisterio}/grupo',
    
  })
  getPagedGrupo: ResourceMethod<{ idMinisterio: Number, page: Number, size: Number }, any>;
  
  @ResourceAction({
    method: RequestMethod.Get,
    isArray: false,
    path: '/{!idMinisterio}/grupo/{!idGrupo}/pessoasvinculo/classificacaomembro/{!idClassificacaoMembro}',
    
  })
  getPagedPessoasSemVinculo: ResourceMethod<{ idMinisterio: Number, idGrupo: Number, idClassificacaoMembro: Number, page: Number, size: Number }, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: false,
    path: '/{!idMinisterio}/classificacaomembro/pessoa/{!idPessoa}',
    
  })
  getPagedClassificacaoMembroPessoa: ResourceMethod<{ idMinisterio: Number, idPessoa: Number, page: Number, size: Number }, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    isArray: false,
    path: '/{!idMinisterio}/classificacaomembro',
    
  })
  getPagedClassificacaoMembro: ResourceMethod<{ idMinisterio: Number, page: Number, size: Number }, any>;

  @ResourceAction({
    path: '/{!idMinisterio}'
  })
  get: ResourceMethod<{idMinisterio: number}, any>;

  @ResourceAction({
    path: '/{!idMinisterio}/grupo/{!idGrupo}'
  })
  getGrupo: ResourceMethod<{idMinisterio: Number, idGrupo: Number}, Ministerio>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<Ministerio, any>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/{!idMinisterio}/grupo/{!idGrupo}/classificacaomembro/{!idClassificacaoMembro}/vincularpessoa'
  })
  vincularPessoaGrupo: ResourceMethodStrict< any[],
                                            { idMinisterio: Number,
                                              idGrupo: Number,
                                              idClassificacaoMembro: Number
                                            },
                                            any>;

  @ResourceAction({
    method: RequestMethod.Put,
    // path: '/{!id}'
  })
  update: ResourceMethod<Ministerio, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  remove: ResourceMethod<{id: any}, any>;

  // Alias to save
  // create(data: Ministerio, callback?: (res: Ministerio) => any): Ministerio {
  //   return this.save(data, callback);
  // }

 
  
}