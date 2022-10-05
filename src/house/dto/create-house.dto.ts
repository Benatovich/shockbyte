// for use with POST /house and PATCH
// not for use with POST /house/<id>/residency

export class CreateHouseDto {
    longitude: number;
    latitude: number;
    name: string;
    // lastUpdated: Date
}
