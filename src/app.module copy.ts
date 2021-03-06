import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DashboardGroupsModule } from './dashboard-groups/dashboard-groups.module'
import { DashboardModule } from './dashboard/dashboard.module'
import { InfluxDbModule, InfluxModuleOptions } from './influxdb';
import { UsersModule } from './users/users.module';
import { WidgetModule } from './widget/widget.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DashboardModule,
    DashboardGroupsModule,
    WidgetModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
