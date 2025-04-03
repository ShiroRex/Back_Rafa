import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class ParcelasService {
  constructor(private readonly prisma: PrismaService) {}

  async obtenerTodas() {
    return this.prisma.parcela.findMany();
  }

  async obtenerUna(id: number) {
    return this.prisma.parcela.findUnique({
      where: { id },
    });
  }

  async obtenerEliminadas() {
    const apiResponse = await axios.get('https://moriahmkt.com/iotapp/updated/');
    const parcelasAPI = apiResponse.data.parcelas;

    const idsEnAPI = new Set(parcelasAPI.map((p: any) => p.id));

    const eliminadas = await this.prisma.parcela.findMany({
      where: {
        id: {
          notIn: Array.from(idsEnAPI).map(id => Number(id)), 
        },
      },
    });
    
    return eliminadas;
    
    
  }
}
