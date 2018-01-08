import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClassificacaoMembro {

    constructor() {

    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idClassificacaoMembro: number;

    @Column({ type: 'varchar', length: 100 })
    private descricao: string;

    public getIdClassificacaoMembro(): number {
        return this.idClassificacaoMembro;
    }

    public setIdClassificacaoMembro(idClassificacaoMembro: number) {
        this.idClassificacaoMembro = idClassificacaoMembro;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }

}