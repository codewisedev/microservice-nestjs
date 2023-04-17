ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS microservice;

USE microservice;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) DEFAULT NULL,
  last_name  VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Wallets;

CREATE TABLE Wallets (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id     BIGINT UNSIGNED NOT NULL,
  wallet_name VARCHAR(255) DEFAULT NULL,
  balance     BIGINT UNSIGNED DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Transactions;

CREATE TABLE Transactions (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  wallet_id    BIGINT UNSIGNED NOT NULL,
  reference_id VARCHAR(255) NOT NULL,
  amount       BIGINT SIGNED NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (id),
  CONSTRAINT UQ_Patients_Reference UNIQUE (reference_id)
);

INSERT INTO Users(first_name, last_name) VALUES ('mohammad', 'reyhani');
SET @USER_ID = LAST_INSERT_ID();
SELECT * FROM Users WHERE id=@USER_ID;

INSERT INTO Wallets(wallet_name, user_id) VALUES ('myWallet', @USER_ID);
SET @WALLET_ID = LAST_INSERT_ID();
SELECT * FROM Wallets WHERE id=@WALLET_ID;