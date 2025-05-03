import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { BoilerPartsModule } from './boiler-parts/boiler-parts.module'
import { SequelizeConfigService } from './config/sequelizeConfig.service'
import { sqlConfig } from './config/sql.config'
import { PaymentModule } from './payment/payment.module'
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [sqlConfig],
    }),
    UsersModule,
    AuthModule,
    BoilerPartsModule,
    ShoppingCartModule,
    PaymentModule,
  ],
})
export class AppModule {}
