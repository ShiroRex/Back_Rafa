import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  DatosGenerales: any;
  constructor() {
    super();
  }
}
