import { Injectable } from '@angular/core';

import { REST_API } from './../app.component';
import { FileResource } from './file.resource';
import { Resource, ResourceParams, ResourceAction, ResourceMethod } from 'ngx-resource';
import { RequestMethod } from '@angular/http';

const PATH: string = REST_API + 'pessoa/';

@Injectable()
@ResourceParams({
  url: PATH,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
export class PessoaFileResource extends Resource {

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!idPessoa}/file/porpessoa/sembuffer'

  })
  getPorIdPessoa: ResourceMethod<{ idPessoa: number }, {idPessoaFile:any, mimetype: string, pessoaIdPessoa: number, size: number}>;


  public save(base64: string, params: any) {
    
    let fileResource: FileResource = new FileResource();
    let url = PATH + params.idPessoa + '/file';

    return fileResource.save(url, base64);
  }

  public update(base64: string, params: any) {

    let fileResource: FileResource = new FileResource();
    let url = PATH + params.idPessoa + '/file/' + params.idPessoaFile;

    return fileResource.update(url, base64);
  }
}
