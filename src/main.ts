import { NestFactory } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger'
import { SwaggerModule } from '@nestjs/swagger/dist'
import compression from 'compression'; // 👈 добавлено
import * as session from 'express-session'
import * as passport from 'passport'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(compression()) // 👈 сжатие включено

  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001', 'https://shopclient-withopt-production.up.railway.app'],
  })

  const config = new DocumentBuilder()
    .setTitle('Аква термикс')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('api')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
