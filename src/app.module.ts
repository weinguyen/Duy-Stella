import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GuestModule } from './modules/guest/guest.module';
import { ProjectModule } from './modules/project/project.module';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GuestModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres'>('DB_TYPE'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synachronize: true,
      }),
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: './uploads',
        serveRoot: '/uploads',
      },
      {
        rootPath: './view/client',
        serveRoot: '/',
      },
      {
        rootPath: './view/admin',
        serveRoot: '/admin',
      },
    ),
    ProjectModule,
  ],
})
export class AppModule {}
