import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class House {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    ubid: string;
    
    @Column('int')
    birds: number;
    
    @Column('int')
    eggs: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @Column()
    name: string;
}
