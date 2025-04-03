import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Registro de nuevo usuario
  async register(email: string, password: string) {
    // Verificamos si el usuario ya existe
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('El usuario ya está registrado');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el nuevo usuario
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Generamos el JWT para el usuario
    const token = this.generateJwtToken(newUser.id);

    return { user: newUser, token };
  }

  // Login de usuario
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Comprobamos la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    // Generamos el JWT para el usuario
    const token = this.generateJwtToken(user.id);

    return { user, token };
  }

  // Generamos el JWT
  private generateJwtToken(userId: number) {
    const payload = { userId };
    return this.jwtService.sign(payload, { secret: 'YOUR_SECRET_KEY', expiresIn: '1h' });
  }
}
