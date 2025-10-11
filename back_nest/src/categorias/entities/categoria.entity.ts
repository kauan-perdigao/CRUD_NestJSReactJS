import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao?: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
