import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import * as moment from 'moment';

@Injectable()
export class SensorLecturasService {
  constructor(private prisma: PrismaService) {}

  
  async cargarDatosDesdeAPI() {
    try {
      const response = await axios.get('https://moriahmkt.com/iotapp/updated/');
      const apiData = response.data;
      const data = apiData.parcelas;

      console.log('Respuesta completa de la API:', response.data);

      for (const parcela of data) {
        const ultimoRiego = parcela.ultimo_riego;

        console.log('Último riego para parcela', parcela.nombre, 'es:', ultimoRiego);

        if (!ultimoRiego) {
          throw new Error(`Fecha de último riego inválida para la parcela ${parcela.nombre}`);
        }

        const fechaLectura = moment(ultimoRiego, 'YYYY-MM-DD HH:mm:ss').toDate();

        if (isNaN(fechaLectura.getTime())) {
          throw new Error(`Fecha inválida generada a partir de ultimo_riego para la parcela ${parcela.nombre}`);
        }

        const existingData = await this.prisma.datosGenerales.findFirst({
          where: {
            fecha: fechaLectura,
          },
        });

        if (
          !existingData ||
          existingData.temperatura !== apiData.sensores.temperatura ||
          existingData.humedad !== apiData.sensores.humedad ||
          existingData.lluvia !== apiData.sensores.lluvia ||
          existingData.sol !== apiData.sensores.sol
        ) {
          await this.prisma.datosGenerales.create({
            data: {
              temperatura: apiData.sensores.temperatura,
              humedad: apiData.sensores.humedad,
              lluvia: apiData.sensores.lluvia,
              sol: apiData.sensores.sol,
              fecha: fechaLectura,
            },
          });
        }

        await this.prisma.parcela.upsert({
          where: { id: parcela.id },
          update: {
            nombre: parcela.nombre,
            ubicacion: parcela.ubicacion,
            responsable: parcela.responsable,
            tipo_cultivo: parcela.tipo_cultivo,
            latitud: parseFloat(parcela.latitud),
            longitud: parseFloat(parcela.longitud),
            ultimo_riego: fechaLectura,
          },
          create: {
            id: parcela.id,
            nombre: parcela.nombre,
            ubicacion: parcela.ubicacion,
            responsable: parcela.responsable,
            tipo_cultivo: parcela.tipo_cultivo,
            latitud: parseFloat(parcela.latitud),
            longitud: parseFloat(parcela.longitud),
            ultimo_riego: fechaLectura,
          },
        });

        const ultima = await this.prisma.sensorLectura.findFirst({
          where: { parcelaId: parcela.id },
          orderBy: { fecha: 'desc' },
        });

        const nuevaLectura = {
          parcelaId: parcela.id,
          temperatura: parcela.sensor.temperatura,
          humedad: parcela.sensor.humedad,
          lluvia: parcela.sensor.lluvia,
          sol: parcela.sensor.sol,
          fecha: fechaLectura,
          hora: fechaLectura.toLocaleTimeString(),
        };

        const datosCambiaron =
          !ultima ||
          ultima.temperatura !== nuevaLectura.temperatura ||
          ultima.humedad !== nuevaLectura.humedad ||
          ultima.lluvia !== nuevaLectura.lluvia ||
          ultima.sol !== nuevaLectura.sol;

        if (datosCambiaron) {
          await this.prisma.sensorLectura.create({ data: nuevaLectura });
        }
      }
    } catch (error) {
      console.error('Error al cargar datos desde la API:', error.message);
      throw new Error('Error al cargar los datos desde la API');
    }
  }

  async obtenerLecturas() {
    return this.prisma.sensorLectura.findMany({
      include: { parcela: true },
      orderBy: { fecha: 'desc' },
    });
  }
}
