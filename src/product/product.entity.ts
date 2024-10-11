import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // Define la entidad Product
export class Product {

    // Columnas de la entidad 
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true, nullable: false })
    name: string

    @Column({ nullable: false })
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number

    @Column({ nullable: false })
    stock: number
}