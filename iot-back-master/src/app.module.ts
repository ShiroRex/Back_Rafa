import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelasModule } from './parcelas/parcelas.module';
import { SensorLecturasModule } from './sensor-lecturas/sensor-lecturas.module';
import { PrismaModule } from './prisma/prisma.module';
import { DatosGeneralesModule } from './datos-generales/datos-generales.module';
import { DashboardController } from './dashboard/dashboard.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ParcelasModule, SensorLecturasModule, DatosGeneralesModule, AuthModule],
  controllers: [AppController, DashboardController],
  providers: [AppService],
})
export class AppModule {}
