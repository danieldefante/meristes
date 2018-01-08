import { Ministerio } from './ministerio.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Subgrupo {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idSubgrupo: number;

    @OneToOne(type => Ministerio)
    @JoinColumn()
    private ministerio: Ministerio;

    @Column({ type: 'varchar', length: 50 })
    private nome: string;

    @Column({ type: 'varchar', length: 50 })
    private descricao: string;

    @Column({ type: 'tinyint', default: true })
    private ativo: boolean;

    public getIdSubgrupo(): number {
        return this.idSubgrupo;
    }

    public setIdSubgrupo(idSubgrupo: number) {
        this.idSubgrupo = idSubgrupo;
    }

    public getMinisterio(): Ministerio {
        return this.ministerio;
    }

    public setMinisterio(ministerio: Ministerio) {
        this.ministerio = ministerio;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string) {
        this.nome = nome;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }

    public getAtivo(): boolean {
        return this.ativo;
    }

    public setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }
}
