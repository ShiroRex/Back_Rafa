import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';

@Controller('datos-generales')
export class DatosGeneralesController {
  constructor(private readonly service: DatosGeneralesService) {}

  @Post()
  crear(@Body() body: any) {
    return this.service.crear(body);
  }

  @Get('ultimo')
  async obtenerUltimo() {
    try {
      const dato = await this.service.obtenerUltimo();
      if (!dato) {
        return {
          success: false,
          message: 'No hay datos disponibles',
          data: {
            temperatura: 0,
            humedad: 0,
            lluvia: 0,
            sol: 0,
            fecha: new Date().toISOString()
          }
        };
      }
      
      return {
        success: true,
        data: {
          temperatura: dato.temperatura,
          humedad: dato.humedad,
          lluvia: dato.lluvia,
          sol: dato.sol,
          fecha: dato.fecha.toISOString()
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al obtener los datos',
        error: error.message
      };
    }
  }


  @Get()
  obtenerTodos() {
    return this.service.obtenerTodos();
  }
}


