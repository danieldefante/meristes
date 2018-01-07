import { Injectable } from '@angular/core';
import { Resource, ResourceParams, ResourceAction, ResourceMethod, ResourceMethodStrict } from 'ngx-resource';
import { RequestMethod } from '@angular/http';

import { REST_API } from './../app.component';
import { Pessoa } from './../class/pessoa';
import { Paged } from '../arquitetura/commun/paged';

@Injectable()
@ResourceParams({
  url: REST_API + 'pessoa',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class PessoaResource extends Resource {


  @ResourceAction({
    isArray: false
  })
  getPaged: ResourceMethod<Paged, any>;

  @ResourceAction({
    path: '/{!idPessoa}'
  })
  get: ResourceMethod<{ idPessoa: number }, Pessoa>;

  @ResourceAction({
    path: '/{!idPessoa}/simplificada'
  })
  getSimplificada: ResourceMethod<{ idPessoa: number }, any>;

  // @ResourceAction({
  //   path: '/{!idPessoa}'
  // })
  // get2: ResourceMethodStrict<INews, {idPessoa: number}, INews>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<Pessoa, any>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!idPessoa}'
  })
  update: ResourceMethodStrict<Pessoa, {idPessoa: number}, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!idPessoa}'
  })
  remove: ResourceMethod<{ idPessoa: any }, any>;
}
