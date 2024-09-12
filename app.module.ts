import { Module } from '@nestjs/common';
import { ApplicationModule } from './src/application/applicationModule';


@Module({
  imports: [
   ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
