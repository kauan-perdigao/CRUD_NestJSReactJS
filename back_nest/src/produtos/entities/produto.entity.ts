import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produtos' })
export class Produto {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 200 })
	nome: string;

	@Column({ type: 'text', nullable: true })
	descricao?: string;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	preco: number;

	@Column({ type: 'int', default: 0 })
	estoque: number;
}
