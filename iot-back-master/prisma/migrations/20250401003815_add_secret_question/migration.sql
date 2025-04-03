-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `secretQuestion` VARCHAR(191) NULL,
    `secretAnswer` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parcela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NOT NULL,
    `responsable` VARCHAR(191) NOT NULL,
    `tipo_cultivo` VARCHAR(191) NOT NULL,
    `latitud` DECIMAL(65, 30) NOT NULL,
    `longitud` DECIMAL(65, 30) NOT NULL,
    `ultimo_riego` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SensorLectura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parcelaId` INTEGER NOT NULL,
    `temperatura` DOUBLE NOT NULL,
    `humedad` DOUBLE NOT NULL,
    `lluvia` DOUBLE NOT NULL,
    `sol` DOUBLE NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `hora` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DatosGenerales` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `temperatura` DOUBLE NOT NULL,
    `humedad` DOUBLE NOT NULL,
    `lluvia` DOUBLE NOT NULL,
    `sol` DOUBLE NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SensorLectura` ADD CONSTRAINT `SensorLectura_parcelaId_fkey` FOREIGN KEY (`parcelaId`) REFERENCES `Parcela`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
