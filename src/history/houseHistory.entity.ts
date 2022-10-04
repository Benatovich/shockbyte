import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  HistoryFor,
  HistoryActionType,
  HistoryActionColumn,
  MappedColumn,
  SnapshotColumn,
} from '@kittgen/nestjs-typeorm-history';
import { House } from '../house/entities/house.entity';

@Entity()
@HistoryFor(House) 
export class HouseHistory {

  // some ID column
  @PrimaryGeneratedColumn()
  id: string;

  @SnapshotColumn({ type: 'jsonb' })
  payload: House

  @HistoryActionColumn()
  action: HistoryActionType

  // optional, map payload properties as column
//   @MappedColumn<House>((house: House) => house.firstName, { name: 'nickname' })
//   nickname: string

  // any other properties
  // ...
}