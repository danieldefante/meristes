import { Subgrupo } from './subgrupo.entity';
import { ClassificacaoMembro } from './classificacaoMembro.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import { Pessoa } from './entitys/pessoa.entity';

@Entity()
export class VinculoPessoaSubgrupo {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idVinculoPessoaSubgrupo: number;

    @OneToOne(type => ClassificacaoMembro)
    @JoinColumn()
    private classificacaoMembro: ClassificacaoMembro;

    @OneToOne(type => Pessoa)
    @JoinColumn()
    private pessoa: Pessoa;

    @OneToOne(type => Subgrupo)
    @JoinColumn()
    private subgrupo: Subgrupo;

    @Column({ type: 'date' })
    private dataVinculacao: Date;

    @Column({ type: 'tinyint', default: true })
    private ativo: boolean;

    public getIdVinculoPessoaSubgrupo(): number {
        return this.idVinculoPessoaSubgrupo;
    }

    public setIdVinculoPessoaSubgrupo(idVinculoPessoaSubgrupo: number) {
        this.idVinculoPessoaSubgrupo = idVinculoPessoaSubgrupo;
    }

    public getClassificacaoMembro(): ClassificacaoMembro {
        return this.classificacaoMembro;
    }

    public setClassificacaoMembro(classificacaoMembro: ClassificacaoMembro) {
        this.classificacaoMembro = classificacaoMembro;
    }

    public getPessoa(): Pessoa {
        return this.pessoa;
    }

    public setPessoa(pessoa: Pessoa) {
        this.pessoa = pessoa;
    }

    public getSubgrupo(): Subgrupo {
        return this.subgrupo;
    }

    public setSubgrupo(subgrupo: Subgrupo) {
        this.subgrupo = subgrupo;
    }

    public getDataVinculacao(): Date {
        return this.dataVinculacao;
    }

    public setDataVinculacao(dataVinculacao: Date) {
        this.dataVinculacao = dataVinculacao;
    }

    public getAtivo(): boolean {
        return this.ativo;
    }

    public setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }
}
