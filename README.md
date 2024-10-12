
# Documentación API NestJS CRUD con MySQL

Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar y Eliminar) de productos construida con **NestJS** y **MySQL** usando **TypeORM**.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (versión recomendada: v18 o superior)
- **MySQL** (para la base de datos)

# Instalación de dependencias

Para ejecutar este proyecto, debes instalar las siguientes dependencias utilizando el gestor de paquetes `npm`.

## Dependencias principales y Desarrollo

```bash
dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.2.3",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/typeorm": "^10.0.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "mysql2": "^3.11.3",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.20"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^6.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  }
```


### Usando npm:

Instalar dependencias desde el package.json: Ejecuta el siguiente comando para instalar las dependencias del proyecto:

```bash
npm install
```



# Importanción de la Base de datos

- Usa el archivo que se encuentra en la carpeta "BD"

## Pasos para Importar el archivo.sql

- Abre la terminal en tu sistema operativo.

- Ejecuta el siguiente comando para importar el archivo de la base de datos (.sql) en tu servidor MySQL:

## Ejemplo comando desde la terminal

```mysql
mysql -u tu_usuario -p tu_base_de_datos < /ruta/al/archivo.sql

```

- Introduce tu contraseña cuando te la solicite.
# Configuracion Variables de entorno

- Crea archivo .env

## Descripcion de variables

- DB_HOST: Define el host de tu base de datos. 

- DB_PORT: El puerto en el que MySQL está corriendo.

- DB_USERNAME: El nombre de usuario para conectarse a la base de datos. 

- DB_PASSWORD: La contraseña asociada con el usuario MySQL. 

- DB_DATABASE: El nombre de la base de datos que quieres utilizar para la aplicación.

- DB_SYNCHRONIZE: Si está en true, TypeORM sincronizará automáticamente las entidades con la base de datos cada vez que inicies la aplicación. Solo debes usar esto en desarrollo, ya que puede sobrescribir datos.

## Ejemplo Archivo:  .env

```typescript
DB_HOST=HostBD
DB_PORT=3306
DB_USERNAME=UsuarioBD
DB_PASSWORD=PasswordBD
DB_DATABASE=NameBD 
DB_SYNCHRONIZE=true

```




# Configuración de TypeORM con Mysql

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Cambia a `false` en producción
    }),
    ProductModule,
  ],
})
export class AppModule {}

```




# Ejecutar Aplicación

## Modo de Desarrollo
$ npm run start

## modo de Vista continua (recargas automáticas al cambiar el código)
$ npm run start:dev

## Modo de Producción
$ npm run start:prod

# Rutas del Controlador de Productos

El `ProductController` maneja las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para los productos. A continuación se detallan las rutas y su funcionalidad:

## 1. Obtener todos los productos

- **Ruta**: `GET /products`
- **Descripción**: Obtiene una lista de todos los productos disponibles.
- **Retorno**: Devuelve una promesa que resuelve con un array de productos.
  
```typescript
@Get()
getProducts() {
    return this.productService.getProducts();
}
```

## 2. Obtener un producto específico por ID

- **Ruta**: `GET /products/:id`
- **Descripción**: Obtiene un producto específico utilizando su ID.
- **Retorno**: Devuelve una promesa que resuelve con el producto solicitado
  
```typescript
@Get(':id')
getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProduct(id);
}
```

## 3. Crear un nuevo producto

- **Ruta**: `POST /products`
- **Descripción**: Crea un nuevo producto utilizando los datos proporcionados en el cuerpo de la solicitud.
- **Retorno**:  Devuelve una promesa que resuelve con el producto creado y un mensaje de éxito.
- **Errores**:  Lanza una excepción si el producto ya existe.
  
```typescript
@Post()
createProduct(@Body() newProduct: CreateProductDto) {
    return this.productService.createProduct(newProduct);
}
```

## 4. Eliminar un producto

- **Ruta**: `DELETE /products/:id`
- **Descripción**: Elimina un producto existente utilizando su ID.
- **Retorno**: Devuelve una promesa que resuelve con un mensaje de éxito si el producto fue eliminado.
- **Errores**: Lanza una excepción si el producto no existe.
  
```typescript
@Delete(':id')
deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
}

```

## 5. Actualizar un producto existente

- **Ruta**: `PATCH /products/:id`
- **Descripción**: Actualiza un producto existente utilizando su ID y los nuevos datos proporcionados.
- **Retorno**:  Devuelve una promesa que resuelve con el producto actualizado y un mensaje de éxito.
- **Errores**:  Lanza una excepción si el producto no existe o el nombre ya está en uso.
  
```typescript
@Patch(':id')
updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() product: UpdateProductDto
) {
    return this.productService.updateProduct(id, product);
}

```
# Ejecuta peticiones de prueba

## Thunder Client

Thunder Client es una extensión de VSCode diseñada para realizar pruebas de APIs de forma rápida y sencilla, similar a herramientas como Postman, pero integrada directamente en el editor. Te permite enviar solicitudes HTTP (GET, POST, PUT, DELETE) y ver las respuestas en un entorno cómodo dentro de Visual Studio Code.

## Cómo usar Thunder Client en VSCode:

Instala la extensión "Thunder Client" desde el marketplace de VSCode.
Abre la paleta de comandos (Ctrl+Shift+P) y busca "Thunder Client".
Crea una nueva solicitud seleccionando el tipo (GET, POST, etc.).
Introduce la URL de tu API y, si es necesario, el cuerpo de la solicitud.
Envía la solicitud y visualiza la respuesta en el panel de resultados.

- GET (http://localhost:3000/product)

- POST (http://localhost:3000/product)

- PATCH (http://localhost:3000/product/:id)

- DELETE (http://localhost:3000/product/:id)

# Authors

- [@Gabriel Torrealba](https://github.com/GabrielJose2102)

