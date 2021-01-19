import { NestFactory } from '@nestjs/core';
import { Logger, NestApplicationOptions } from '@nestjs/common';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './app-logging';
import { AppModule } from './app.module';
import { setupSwagger } from './api-docs.swagger';

async function bootstrap() {
  const logger = (process.env.NODE_ENV === 'production') ? WinstonModule.createLogger(winstonOptions) : new Logger('Bootstrap Logger');
  const nestAppOptions : NestApplicationOptions = {
    logger :  logger
  }
  const app = await NestFactory.create(AppModule, nestAppOptions);
  // global prefix
  app.setGlobalPrefix('api');

  // secure app by setting various HTTP headers.  
  app.use(helmet());

  // enable gzip compression.
  app.use(compression());

  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

   // listen on port
   //const serverConfig = config.get('server');
   //const port = process.env.SERVER_PORT || serverConfig.port;
   const port = 3001;

   /**
   * different deployment environments
   */
  if (process.env.NODE_ENV === 'development') {
    logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);
    app.enableCors();

    // Api docs
    setupSwagger(app);
  } else {
    /**
     * TODO: implement
     */
    logger.log(`Application is running in "${process.env.NODE_ENV}" mode`);
  }

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

//nest g module auth --no-spec