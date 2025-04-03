import { Module } from '@nestjs/common';
import { SensorLecturasService } from './sensor-lecturas.service';
import { SensorLecturasController } from './sensor-lecturas.controller';

@Module({
  providers: [SensorLecturasService],
  controllers: [SensorLecturasController]
})
export class SensorLecturasModule {}
