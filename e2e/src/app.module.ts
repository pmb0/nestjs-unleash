import { Module } from '@nestjs/common'
import { UnleashModule } from '../../src'
import { AppController } from './app.controller'
import { MyCustomStrategy } from './my-custom-strategy'
import { UnleashMockController } from './unleash-mock.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    // UnleashModule.forRoot({
    //   // url: 'http://127.0.0.1:3000/unleash',
    //   url: 'https://unleash.herokuapp.com/api/client',
    //   appName: 'my-app-name',
    //   instanceId: 'my-unique-instance', //process.pid.toString(),
    //   refreshInterval: 20000,
    //   // metricsInterval: 3000,
    //   strategies: [MyCustomStrategy],
    // }),
    UnleashModule.forRootAsync({
      useFactory: () => ({
        // disableRegistration: true,
        url: 'http://localhost:4242/api/client',
        appName: 'my-app-name',
        instanceId: 'my-unique-instance', //process.pid.toString(),
        refreshInterval: 20_000,
        metricsInterval: 3000,
        strategies: [MyCustomStrategy],
        http: {
          headers: {
            Authorization:
              '8b2d15c99270b809d47eef3bc7d8988059d7215adafa4c5175e2f4fe7b387f60',
            'X-Foo': 'bar',
          },
        },
      }),
    }),
  ],
  providers: [UsersService, MyCustomStrategy],
  controllers: [AppController, UnleashMockController],
})
export class ApplicationModule {}
