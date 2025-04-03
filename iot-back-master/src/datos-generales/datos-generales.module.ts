import { Module } from '@nestjs/common';
import { DatosGeneralesService } from './datos-generales.service';
import { DatosGeneralesController } from './datos-generales.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DatosGeneralesController],
  providers: [DatosGeneralesService, PrismaService],
})
export class DatosGeneralesModule {}
