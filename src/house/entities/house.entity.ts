import { Entity, Column, PrimaryGeneratedColumn, Generated } from "typeorm";

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

    @Column()
    name: string;
}
