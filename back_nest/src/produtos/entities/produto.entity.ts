import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

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

	@Column({ name: 'categoria_id', nullable: true })
	categoriaId?: number;

	@ManyToOne(() => Categoria, (categoria) => categoria.produtos, { 
		onDelete: 'SET NULL',
		nullable: true
	})
	@JoinColumn({ name: 'categoria_id' })
	categoria?: Categoria;
}
