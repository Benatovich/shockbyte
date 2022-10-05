import { PartialType } from '@nestjs/mapped-types';
import { CreateHouseDto } from './create-house.dto';

// for use with POST /house/<id>/residency
// NOT FOR USE WITH PATCH

export class UpdateHouseDto extends PartialType(CreateHouseDto) {
    birds: number;
    eggs: number;
    // lastUpdated: Date;
}
