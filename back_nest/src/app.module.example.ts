/*import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { Produto } from './produtos/entities/produto.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? '...',
      port: Number(process.env.POSTGRES_PORT ?? 1234),
      username: process.env.POSTGRES_USER ?? '...',
      password: process.env.POSTGRES_PASSWORD ?? '...',
      database: process.env.POSTGRES_DB ?? '...',
      entities: [Produto],
      synchronize: true,
    }),
    ProdutosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}*/
