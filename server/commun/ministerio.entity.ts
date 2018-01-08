import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ministerio {

    constructor() {

    }
    
    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idMinisterio: number;

    @Column({ type: 'varchar', length: 60 })
    private nome: string;

    @Column({ type: 'varchar', length: 100 })
    private descricao: string;

    @Column({ type: 'varchar', length: 200 })
    private visao: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    private normas: string;

    @Column({ type: 'varchar', length: 200, nullable: true })
    private observacoes: string;

    @Column({ type: 'tinyint', default: true })
    private ativo: boolean;

    public getIdMinisterio(): number {
        return this.idMinisterio;
    }

    public setIdMinisterio(idMinisterio: number) {
        this.idMinisterio = idMinisterio;
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

    public getVisao(): string {
        return this.visao;
    }

    public setVisao(visao: string) {
        this.visao = visao;
    }

    public getNormas(): string {
        return this.normas;
    }

    public setNormas(normas: string) {
        this.normas = normas;
    }

    public getObservacoes(): string {
        return this.observacoes;
    }

    public setObservacoes(observacoes: string) {
        this.observacoes = observacoes;
    }

    public getAtivo(): boolean {
        return this.ativo;
    }

    public setAtivo(ativo: boolean) {
        this.ativo = ativo;
    }

}
