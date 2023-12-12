import { Module } from '@nestjs/common';
import { BookController } from './controllers/book/book.controller';
import { BookService } from './services/book/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/typeorm/entities/book';

@Module({
  imports:[TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}


