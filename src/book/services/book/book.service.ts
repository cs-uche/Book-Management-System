import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/book/dtos/CreateBook.dto';
import { UpdateBookDto } from 'src/book/dtos/UpdateBook.dto';
import { Book } from 'src/typeorm/entities/book';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book) private bookRepository:Repository<Book>
    ){}

    findBooks(){
        return this.bookRepository.find();
    }

    async findBookById(
        id:number
    ){
        const book = await this.bookRepository.findOneBy({id});
        if(!book)
            throw new HttpException(
                'Book not found',
                HttpStatus.BAD_REQUEST
            );
        return book
    }

    async createBook(bookDetails: CreateBookDto){

        const title = bookDetails.title;
        const existingBook = await this.bookRepository.findOneBy({title});

        // console.log("Before searching")
        if(existingBook){
            // console.log("Throwing exception")
            throw new HttpException(
                `title: ${title} must be unique`,
                HttpStatus.BAD_REQUEST
            );
        }
        // console.log("Book found")

        // console.log("Book created")
        return this.bookRepository.save(bookDetails);
    }

    async updateBook(
        id:number,
        updateBookDetails:UpdateBookDto
    ){
        const existingBook = await this.findBookById(id);
        // Update the existingBook with the properties from updateBookDetails
        // Object.assign(existingBook, updateBookDetails);
        console.log(updateBookDetails);
        return this.bookRepository.update({id}, {...updateBookDetails});
        // return this.bookRepository.update({id}, {...existingBook});
    }

    async deleteBook(
        id:number,
    ){
        const existingBook = await this.findBookById(id);
        return this.bookRepository.delete({id});
    }

}