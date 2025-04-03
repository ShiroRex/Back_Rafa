import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('dashboard')
export class DashboardController {
  @UseGuards(JwtAuthGuard) 
  @Get()
  getDashboardData() {
    return 'Datos del Dashboard protegidos';
  }
}
