import { type INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'

export function configureApp(app: INestApplication): void {
  const configService = app.get(ConfigService)
  const corsOrigins = configService
    .getOrThrow<string>('CORS_ORIGIN')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  app.use(helmet())
  app.enableCors({ origin: corsOrigins, credentials: true })
  app.setGlobalPrefix('api')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  app.enableShutdownHooks()
}

export function setupSwagger(app: INestApplication): void {
  const configService = app.get(ConfigService)

  if (!configService.getOrThrow<boolean>('SWAGGER_ENABLED')) {
    return
  }

  const documentConfig = new DocumentBuilder()
    .setTitle('DatAIJam API')
    .setDescription('API para la plataforma de registro de DatAIJam.')
    .setVersion('1.0')
    .build()
  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig)

  SwaggerModule.setup('docs', app, documentFactory, { useGlobalPrefix: true })
}
