import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from '@nestjs/common';
import { BookValidationPipe } from 'src/book/common/validation.pipe';
import { CreateBookDto } from 'src/book/dtos/CreateBook.dto';
import { UpdateBookDto } from 'src/book/dtos/UpdateBook.dto';
import { BookSchema } from 'src/book/dtos/bookSchema.dto';
import { BookService } from 'src/book/services/book/book.service';

@Controller('books')
export class BookController {

    constructor(private bookService: BookService){}

    @Get()
    findBooks(){
        return this.bookService.findBooks();
    }

    @Get(':id')
    findBookById(
        @Param('id',ParseIntPipe) id:number
    ){
        return this.bookService.findBookById(id);
    }

    @Post()
    @UsePipes(new BookValidationPipe(BookSchema))
    createBook(
        @Body() createBookDto: CreateBookDto
    ){
        return this.bookService.createBook(createBookDto);
    }

    @Put(':id')
    @UsePipes(new BookValidationPipe(BookSchema))
    async updateBook(
        @Param('id',ParseIntPipe) id: number,
        @Body() updateBook: UpdateBookDto
    ){
        console.log(updateBook);
        await this.bookService.updateBook(id, updateBook);
    }

    @Delete(':id')
    async deleteBook(        
        @Param('id',ParseIntPipe) id: number
    ){
        await this.bookService.deleteBook(id);
    }
}