import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(9090).then(()=>console.log('Server run at 9090')).catch((err)=>console.log(err))
}
bootstrap();
