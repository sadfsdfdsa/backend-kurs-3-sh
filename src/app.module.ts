import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InfluxDbModule, InfluxModuleOptions } from './influxdb';
import { UsersModule } from './users/users.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardGroupsModule } from './dashboard-groups/dashboard-groups.module';
import { WidgetModule } from './widget/widget.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    CacheModule.register(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.PG_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    InfluxDbModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async (): Promise<InfluxModuleOptions> => {
        return {
          host: process.env.INFLUX_HOST,
          database: process.env.INFLUX_DATABASE,
          port: Number(process.env.INFLUX_PORT),
          username: process.env.INFLUX_USERNAME,
          password: process.env.INFLUX_PASSWORD,
        };
      },
    }),
    DashboardModule,
    DashboardGroupsModule,
    WidgetModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
