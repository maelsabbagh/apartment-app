import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('apartments')
export class Apartment {
@PrimaryGeneratedColumn()
id:number;

@Column({type:'varchar',length:255})
unitName:string;

@Column({type:'varchar',length:255})
unitNumber:string;

@Column({type:'varchar',length:255})
project:string;

@Column({type:'int'})
bedrooms:number;

@Column({type:'int'})
bathrooms:number;

@Column({type:'decimal',precision:10,scale:2}) // scale: digits after decimal point
area:number;

@Column({type:'int'})
floor:number;

 @Column({ type: 'decimal', precision: 10, scale: 2 })
price: number;

@Column({ type: 'text' })
description: string;

@Column({ type: 'varchar', length: 500, nullable: true })
imageUrl: string;

@Column({ type: 'boolean', default: true })
isAvailable: boolean;

@CreateDateColumn()
createdAt: Date;

@UpdateDateColumn()
updatedAt: Date;
}