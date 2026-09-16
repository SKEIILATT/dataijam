import { Test, type TestingModule } from '@nestjs/testing'
import { HealthController } from './health.controller'
import { HealthService } from './health.service'

describe('HealthController', () => {
  let controller: HealthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile()

    controller = module.get<HealthController>(HealthController)
  })

  it('returns an available status', () => {
    expect(controller.getStatus()).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
    })
  })
})
