import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { House } from './entities/house.entity';
import { HouseService } from './house.service';
import { Repository } from 'typeorm';

const houseArray = [
  {
    longitude: 3,
    latitude: 6,
    name: 'test'
  },
  {
    longitude: 35,
    latitude: 96,
    name: 'sample'
  },
];

const oneHouse = {
  longitude: 3,
  latitude: 6,
  name: 'test'
};

describe('HouseService', () => {
  let service: HouseService;
  let repository: Repository<House>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House),
          useValue: {
            find: jest.fn().mockResolvedValue(houseArray),
            findOneBy: jest.fn().mockResolvedValue(oneHouse),
            save: jest.fn().mockResolvedValue(oneHouse),
            remove: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HouseService>(HouseService);
    repository = module.get<Repository<House>>(getRepositoryToken(House));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert/register a new birdhouse', () => {
      expect(
        service.create({
          longitude: 3,
          latitude: 6,
          name: 'test'
        })
      ).resolves.toEqual(oneHouse)
    })
  })


});
