import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express'
import { ApplicationModule } from './app.module'

// curl -H 'x-forwarded-for: 127.0.0.1' -H 'X-User-Id: 3' http://127.0.0.1:3000/
async function main() {
  const app = await NestFactory.create<NestExpressApplication>(
    ApplicationModule,
    new ExpressAdapter(),
  )

  app.enableShutdownHooks()
  app.set('trust proxy', true)

  await app.listen(3000)
}

void main()
