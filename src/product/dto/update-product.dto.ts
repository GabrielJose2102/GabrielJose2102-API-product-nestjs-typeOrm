import { 
    IsNotEmpty, 
    IsNumber, 
    IsPositive, 
    IsString, 
    Matches, 
    Max, 
    MaxLength, 
    Min, 
    MinLength 
} from "class-validator";

export class UpdateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50) // Limita la longitud máxima
    @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'El nombre solo puede contener letras y números.' })
    name?: string

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(200)         // Permite cualquier carácter, incluyendo espacios
    @Matches(/^[\s\S]*$/, { message: 'La descripción puede contener cualquier carácter.' }) 
    description?: string

    @IsNumber()
    @IsNotEmpty()
    @IsPositive() // Asegura que el número sea positivo
    @Min(0) // Asegura que el precio no sea negativo
    @Max(1000000) 
    price?: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive() 
    @Min(0) 
    @Max(1000000) 
    stock?: number
}