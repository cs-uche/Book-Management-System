import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { Book } from './typeorm/entities/book';
import { BookValidationPipe } from './book/common/validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'admin',
      password: 'neoDW23FDs',
      database: 'book_management_system',
      entities: [Book],
      synchronize: true,
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService, BookValidationPipe],
})
export class AppModule {}
