import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Ruta para registrar un nuevo usuario
  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  // Ruta para hacer login
  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
