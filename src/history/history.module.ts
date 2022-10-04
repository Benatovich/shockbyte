import { TypeOrmHistoryModule } from '@kittgen/nestjs-typeorm-history';

TypeOrmHistoryModule.registerAsync({
  inject: [Connection],
  useFactory: (connection: Connection) => ({
    connection,
  })
})