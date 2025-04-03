import { Test, TestingModule } from '@nestjs/testing';
import { SensorLecturasController } from './sensor-lecturas.controller';

describe('SensorLecturasController', () => {
  let controller: SensorLecturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorLecturasController],
    }).compile();

    controller = module.get<SensorLecturasController>(SensorLecturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
