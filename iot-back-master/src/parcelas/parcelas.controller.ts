import { Controller, Get, Param } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';

@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  @Get()
  async todas() {
    return this.parcelasService.obtenerTodas();
  }

  @Get('eliminadas')
  async obtenerParcelasEliminadas() {
    return this.parcelasService.obtenerEliminadas();
  }

  @Get(':id')
  async una(@Param('id') id: string) {
    const numeroId = parseInt(id);
    if (isNaN(numeroId)) {
      throw new Error('ID inválido');
    }
    return this.parcelasService.obtenerUna(numeroId);
  }
}
