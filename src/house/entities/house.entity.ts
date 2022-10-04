import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";
import { Length } from 'class-validator';

@Entity()
export class House {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated('uuid')
    ubid: string;
    
    @Column({ default: 0 })
    birds: number;
    
    @Column({ default: 0 })
    eggs: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    // must be 4-16 characters
    @Column()
    @Length(4, 16)
    name: string;
}
