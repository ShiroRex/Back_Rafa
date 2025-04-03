import { Test, TestingModule } from '@nestjs/testing';
import { sensorLecturasService } from './sensor-lecturas.service';

describe('SensorLecturasService', () => {

  let service: sensorLecturasService;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [sensorLecturasService],
    }).compile();

    service = module.get<sensorLecturasService>(sensorLecturasService);
  });

  it('should be defined', () => {
    
    expect(service).toBeDefined();
  });
});
