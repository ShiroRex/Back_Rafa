import { Controller, Get } from '@nestjs/common';
import { SensorLecturasService } from './sensor-lecturas.service';

@Controller('sensor-lecturas')
export class SensorLecturasController {

    constructor(private readonly sensorLecturasService: SensorLecturasService) {}

    @Get('actualizar')
  async actualizar() {

    await this.sensorLecturasService.cargarDatosDesdeAPI();
    return { mensaje: 'Datos actualizados correctamente' };
  }
  
  @Get()

  async todas() {

    return this.sensorLecturasService.obtenerLecturas();
  }

  onModuleInit() {
    
    this.sensorLecturasService.cargarDatosDesdeAPI();
  }
}
