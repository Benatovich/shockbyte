import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
    HistoryFor,
    HistoryActionType,
    HistoryActionColumn,
    MappedColumn,
    SnapshotColumn,
} from '@kittgen/nestjs-typeorm-history';
import { House } from './house.entity';

@Entity()
@HistoryFor(House)
export class HouseHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @SnapshotColumn({ type: 'jsonb' })
    payload: House;

    @HistoryActionColumn()
    action: HistoryActionType
}