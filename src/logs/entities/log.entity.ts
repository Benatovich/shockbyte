import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Log {
    @PrimaryColumn({ type: 'timestamptz' })
    timestamp: Date;

    @Column()
    id: string;

    @Column()
    ubid: string;

    @Column()
    message: string;

    @Column()
    birds: number;

    @Column()
    eggs: number;
}
