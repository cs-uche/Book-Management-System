import { BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from 'joi';
import { CreateBookDto } from "../dtos/CreateBook.dto";
import { BookSchema } from "../dtos/bookSchema.dto";
// import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

@Injectable()
export class BookValidationPipe implements PipeTransform{
    constructor(private schema:ObjectSchema){}

    transform(value: CreateBookDto):CreateBookDto {
        
        if(typeof value !== 'object')
            return value;
        
        console.log(typeof value)
        const result = BookSchema.validate(value);
        console.log(result)
        if (result.error){
            console.log("inside the error")
            const errorMessages = result.error.details.map((err) => err.message).join();
            throw new BadRequestException(errorMessages);
        }
        console.log("no error")
        console.log(value)
        return value;
    }

    
}

// @Injectable()
// export class BookValidationPipe implements PipeTransform {
//   constructor(private schema: ObjectSchema) {}

//   transform(value: CreateBookDto): CreateBookDto {
//     console.log('BookValidationPipe - Start Validation');
//     const { error } = this.schema.validate(value, { abortEarly: false });
//     if (error) {
//       const errorMessages = error.details.map((err) => err.message).join(', ');
//       console.log('BookValidationPipe - Validation Error:', errorMessages);
//       throw new BadRequestException(errorMessages);
//     }
//     console.log('BookValidationPipe - Validation Passed');
//     return value;
//   }
// }

