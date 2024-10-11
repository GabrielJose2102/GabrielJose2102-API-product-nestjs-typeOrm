import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {

    constructor(private productService: ProductService) {}

    /* Obtiene una lista de todos los productos.*/
    @Get()
    getProducts() {
        return this.productService.getProducts();
    }
    
    /* Obtiene un producto específico por su ID. */
    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProduct(id);
    }
    
    /* Crea un nuevo producto con los datos proporcionados. */
    @Post()
    createProduct(@Body() newProduct: CreateProductDto) {
        return this.productService.createProduct(newProduct);
    }
    
    /* Actualiza un producto existente por su ID. */
    @Patch(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number,
                  @Body() product: UpdateProductDto) {
        return this.productService.updateProduct(id, product)
    }

    /* Elimina un producto existente por su ID. */
    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}
