CREATE DATABASE IF NOT EXISTS CRUK;

CREATE TABLE IF NOT EXISTS CRUK.users (
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

CREATE TABLE IF NOT EXISTS CRUK.donations (
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

CREATE TABLE IF NOT EXISTS CRUK.user_donation_map (
	user_id INT NOT NULL,
	donation_id INT NOT NULL,
	CONSTRAINT user_donation_map_FK FOREIGN KEY (user_id) REFERENCES CRUK.users(id),
	CONSTRAINT user_donation_map_FK_1 FOREIGN KEY (donation_id) REFERENCES CRUK.donations(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO CRUK.users (id, email) 
VALUES 
(1,'testuser01@gmail.com'), 
(2,'testuser02@gmail.com'),
(3,'testuser03@gmail.com');

INSERT IGNORE INTO CRUK.donations (id, donation_amount) 
VALUES 
(1,2000), 
(2,2000), 
(3,1000),
(4,1000);

INSERT IGNORE INTO CRUK.user_donation_map (donation_id,user_id) 
VALUES 
(1,1), 
(2,1), 
(3,1),
(4,2);