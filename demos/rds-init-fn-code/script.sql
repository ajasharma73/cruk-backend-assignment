CREATE DATABASE CRUK;

CREATE TABLE CRUK.users (
	id INT auto_increment NOT NULL,
	email varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at DATETIME NULL,
	deleted_at DATETIME NULL,
	CONSTRAINT users_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE CRUK.donation (
	id INT auto_increment NOT NULL,
	donation_amount BIGINT UNSIGNED DEFAULT 0 NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at DATETIME NULL,
	deleted_at DATETIME NULL,
	CONSTRAINT donation_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE CRUK.user_donation_map (
	user_id INT NOT NULL,
	donation_id INT NOT NULL,
	CONSTRAINT user_donation_map_FK FOREIGN KEY (user_id) REFERENCES CRUK.users(id),
	CONSTRAINT user_donation_map_FK_1 FOREIGN KEY (donation_id) REFERENCES CRUK.donation(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
