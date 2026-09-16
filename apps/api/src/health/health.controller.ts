import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthService, type HealthStatus } from './health.service'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Comprueba que la API esta disponible.' })
  @ApiOkResponse({ description: 'La API esta disponible.' })
  getStatus(): HealthStatus {
    return this.healthService.getStatus()
  }
}
