import { IsDefined, IsString, isUUID } from "class-validator";
import { HouseService } from "./house/house.service";

// export class TestHeaderDto {
//     @IsString()
//     @IsDefined()
//     @Expose({ name: 'myheader1' })        // required as headers are case insensitive
//     myHeader1: string;

//     @IsString()
//     @IsDefined()
//     @Expose({ name: 'myheader1' })
//     myHeader2: string;
// }


export class TestHeaderDto {
    accept: '*/*';
    'x-ubid': '<UBID>'
}
