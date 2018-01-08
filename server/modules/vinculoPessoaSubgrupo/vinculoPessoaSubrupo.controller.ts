import { Ministerio } from './../../commun/ministerio.entity';
import { AppRoutes } from './../../app.routes';
import { EnumMessagePessoa } from './../../utils/messages/enum.message.pessoa';
import { CrudRespost } from './../../utils/crudRespost';
import { Controller, Param, Body, Get, Post, Put, Delete, JsonController, QueryParam, NotFoundError, OnUndefined } from "routing-controllers";
import { BeanConsultGroup } from "../../utils/beanConsultGroup";
import * as repository from './../../config/db.repository';
import * as HttpStatus from 'http-status';
import { EnumMessage } from "../../utils/messages/enum.message";
import { MeristesException } from '../../utils/excessao';

@JsonController()
export class PessoaControllerre {


}