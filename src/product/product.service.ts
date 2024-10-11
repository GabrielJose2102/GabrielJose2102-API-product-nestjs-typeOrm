import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

    /**
     * Crea un nuevo producto en la base de datos si no existe uno con el mismo nombre.
     * 
     * @Body {CreateProductDto} product - Datos para la creación del producto.
     * @returns El producto creado y un mensaje de éxito.
     * {HttpException} Si el producto ya existe.
     */
    async createProduct(product: CreateProductDto) {
        const productFound = await this.productRepository.findOne({
            where: {
                name: product.name
            }
        });

        if (productFound) {
            return new HttpException('Producto ya existe', HttpStatus.BAD_REQUEST)
        }

        const newProduct = this.productRepository.create(product);
        const createdProduct = await this.productRepository.save(newProduct);

        return {
            createdProduct,
            message: 'Producto creado exisotamente'
        }

    }

    /**
     * Obtiene todos los productos almacenados en la base de datos.
     * 
     * @returns Lista de productos.
     */
    getProducts() {
        return this.productRepository.find();
    }

    /**
     * Obtiene un producto específico por su ID.
     * 
     * @param {number} id - ID del producto a buscar.
     * @returns {Product} El producto encontrado.
     * {HttpException} Si el producto no existe.
     */
    async getProduct(id: number) {
        const productFound = await this.productRepository.findOne({
            where: {
                id
            }
        });

        if (!productFound) {
            return new HttpException('Producto no exite', HttpStatus.NOT_FOUND);
        }

        return productFound;
    }

    /**
     * Actualiza un producto por su ID con los nuevos datos proporcionados.
     * 
     * @param {number} id - ID del producto a actualizar.
     * @Body {UpdateProductDto} product - Nuevos datos para actualizar el producto.
     * @returns {Object} El producto actualizado y un mensaje de éxito.
     * @{HttpException} Si el producto no existe o el nombre ya está en uso.
     */
    async updateProduct(id: number, Product: UpdateProductDto) {
        const productDuplicate = await this.productRepository.findOne({
            where: {
                name: Product.name
            }
        });

        const productFound = await this.productRepository.findOne({
            where: {
                id
            }
        });
        // Producto ya existente
        if (productDuplicate) {
            return new HttpException('Nombre de producto no disponible', HttpStatus.BAD_REQUEST);
        }
        // Producto no encontrado
        if (!productFound) {
            return new HttpException('El producto no existe', HttpStatus.NOT_FOUND);
        }

        const productMatch = Object.assign(productFound, Product);
        const updateProduct = this.productRepository.save(productMatch);

        return {
            updateProduct,
            message: 'Producto actualizado exitosamente'
        }
    }

    /**
     * Elimina un producto por su ID.
     * 
     * @param {number} id - ID del producto a eliminar.
     * @returns {Object} Mensaje de éxito si el producto fue eliminado.
     * @{HttpException} Si el producto no existe.
     */
    async deleteProduct(id: number) {
        const productFound = await this.productRepository.findOne({
            where: {
                id
            }
        });
        // Producto no encontrado
        if (!productFound) {
            return new HttpException('El producto no existe', HttpStatus.NOT_FOUND);
        }

        const deleteProducto = await this.productRepository.delete({ id });

        return {
            message: 'Producto elimindo exitosamente'
        }
    }
}
