import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorito {
    constructor() {

    }

    @PrimaryGeneratedColumn({ type: 'bigint' })
    private idFavorito: number;

    @Column({ type: 'varchar', length: 50 })
    private descricao: string;

    public getIdFavorito(): number {
        return this.idFavorito;
    }

    public setIdFavorito(idFavorito: number) {
        this.idFavorito = idFavorito;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public setDescricao(descricao: string) {
        this.descricao = descricao;
    }
}