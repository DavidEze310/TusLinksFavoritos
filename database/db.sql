CREATE DATABASE database_prueba;

USE database_prueba;

  --Tabla de usuarios--
CREATE TABLE users(
    id INT (11) NOT NULL,
    usuario VARCHAR (16) NOT NULL,
    contraseña VARCHAR (60) NOT NULL,
    nombre VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY id INT (11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;

  --Tabla de enlases--

CREATE TABLE links(
    id INT(11) NOT NULL,
    titulo VARCHAR (150) NOT NULL,
    url VARCHAR (255) NOT NULL,
    descripcion TEXT ,
    user_id INT (11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE  links
    ADD PRIMARY KEY (id)

ALTER TABLE  links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
    