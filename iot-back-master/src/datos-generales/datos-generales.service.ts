import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DatosGeneralesService {
  constructor(private prisma: PrismaService) {}

  async crear(datos: {
    temperatura: number;
    humedad: number;
    lluvia: number;
    sol: number;
  }) {
    return this.prisma.datosGenerales.create({ data: datos });
  }

  async obtenerUltimo() {
    return this.prisma.datosGenerales.findFirst({
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  async obtenerTodos() {
    return this.prisma.datosGenerales.findMany({
      orderBy: {
        fecha: 'desc',
      },
    });
  }
}
