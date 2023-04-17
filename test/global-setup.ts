import { mockUser } from '@test/mock/user';
import { mockWallet } from '@test/mock/wallet';
import 'tsconfig-paths/register';
import * as mysql from 'mysql';
import { Config } from '@common/config';

export default async function () {
  const connection = await mysql.createConnection({
    host: Config.mySql.host,
    user: Config.mySql.username,
    password: Config.mySql.password,
    database: Config.mySql.database,
  });

  await connection.connect();

  const queries = [
    'CREATE DATABASE IF NOT EXISTS test',
    'DROP TABLE IF EXISTS Users;',
    'CREATE TABLE Users (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, first_name VARCHAR(255) DEFAULT NULL, last_name  VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));',
    `INSERT INTO Users (id, first_name, last_name) VALUES (${mockUser.id}, '${mockUser.first_name}', '${mockUser.last_name}');`,
    'DROP TABLE IF EXISTS Wallets;',
    'CREATE TABLE Wallets (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, user_id BIGINT UNSIGNED NOT NULL, wallet_name VARCHAR(255) DEFAULT NULL, balance BIGINT UNSIGNED DEFAULT 0, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id));',
    `INSERT INTO Wallets (id, user_id, wallet_name, balance) VALUES (${mockWallet.id}, ${mockWallet.user_id}, '${mockWallet.wallet_name}', ${mockWallet.balance});`,
  ];

  for (const query of queries) {
    await connection.query(query, function (error, results, fields) {
      if (error) throw error;
    });
  }

  await connection.end();
}
