import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { configureApp, setupSwagger } from './app.setup'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  configureApp(app)
  setupSwagger(app)

  const configService = app.get(ConfigService)
  const port = configService.getOrThrow<number>('PORT')

  await app.listen(port, '0.0.0.0')
}
void bootstrap()
