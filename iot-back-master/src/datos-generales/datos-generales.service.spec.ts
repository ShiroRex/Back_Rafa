import { Test, TestingModule } from '@nestjs/testing';
import { DatosGeneralesService } from './datos-generales.service';

describe('DatosGeneralesService', () => {
  let service: DatosGeneralesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatosGeneralesService],
    }).compile();

    service = module.get<DatosGeneralesService>(DatosGeneralesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
