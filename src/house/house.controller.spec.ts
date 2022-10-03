import { Test, TestingModule } from '@nestjs/testing';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';

const createHouseDto: CreateHouseDto = {
  longitude: 3,
  latitude: 6,
  name: 'test'
};

describe('HouseController', () => {
  let controller: HouseController;
  let service: HouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [
        HouseService,
        {
          provide: HouseService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((house: CreateHouseDto) =>
                Promise.resolve({ id: '1', ...house }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                longitude: 3,
                latitude: 6,
                name: 'first house'
              },
              {
                longitude: 35,
                latitude: 600,
                name: 'second house'
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                longitude: 3,
                latitude: 6,
                name: 'first house',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HouseController>(HouseController);
    service = module.get<HouseService>(HouseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
