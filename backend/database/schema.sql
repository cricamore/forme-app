-- Database: mande_db

-- DROP DATABASE mande_db;

-- CREATE DATABASE mande_db
--     WITH 
--     OWNER = pgadmin
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'C'
--     LC_CTYPE = 'C'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1

-- -- \c mande_db

CREATE TABLE Persona(
    cedula INT PRIMARY KEY,
    direccion VARCHAR(20),
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    telefono VARCHAR(14) UNIQUE,
    password VARCHAR(60) CHECK (length(password) > 6)
);

CREATE TABLE Trabajador(
    id_trabajador SERIAL PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    ocupado BOOLEAN DEFAULT FALSE,
    estrellas FLOAT DEFAULT 4.0,
    descripcion VARCHAR(500)
);

CREATE TABLE Usuario_app(
    id_telefono VARCHAR(14) PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    email VARCHAR(60)
);

CREATE TABLE Labor(
    id_labor SERIAL PRIMARY KEY,
    id_trabajador INT,
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    precioHora FLOAT,
    nombreLabor VARCHAR(20)  
);

CREATE TABLE Trabajador_labor(
    id_labor INT,
    id_trabajador INT,
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    CONSTRAINT fk_id_labor
        FOREIGN KEY (id_labor)
        REFERENCES Labor(id_labor),
    PRIMARY KEY (id_labor, id_trabajador)
);

CREATE TABLE Usuario_trabajador(
    id_trabajador INT,
    id_telefono VARCHAR(14),
    CONSTRAINT fk_id_telefono
        FOREIGN KEY (id_telefono)
        REFERENCES Usuario_app(id_telefono),
    CONSTRAINT fk_id_trabajador
        FOREIGN KEY (id_trabajador)
        REFERENCES Trabajador(id_trabajador),
    PRIMARY KEY (id_trabajador, id_telefono)
);

CREATE TABLE Historial_pago(
    idHistorial SERIAL PRIMARY KEY,
    cedula INT,
    CONSTRAINT fk_cedula
        FOREIGN KEY (cedula)
        REFERENCES Persona(cedula),
    fechasPago DATE,
    valorPago FLOAT,
    laborPago VARCHAR(20)
);

INSERT INTO Persona VALUES(1005965561, 'cra16#15-20','Santiago','Ospitia','3154148727', '12345678');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1005965561, 4.5);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 10, 'Profesor');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));

INSERT INTO Persona VALUES(1005965156, 'cra15#16-02','Santiago','Trujillo','3154148738', '10987654');
INSERT INTO Usuario_app(id_telefono, cedula, email) VALUES ('3154148738', 1005965156, 'asd@gmail.com');

INSERT INTO Persona VALUES(1006955156, 'cra40#16-02','Hassen','Ortiz','3214148738', '098765432');
INSERT INTO Usuario_app(id_telefono, cedula, email) VALUES ('3214148738', 1006955156, 'das@gmail.com');

INSERT INTO Persona VALUES(1115965561, 'Cl 16#15-20','Marta','Rodriguez','3004148727', 'qwertyuiop');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1115965561, 4.0);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 12, 'Mecanico');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));

INSERT INTO Persona VALUES(1125965561, 'Cl 23#15-20','Lucía','Martinez','3014148727', 'asdfghjkl');
INSERT INTO Trabajador(cedula, estrellas) VALUES (1125965561, 4.3);
INSERT INTO Labor(id_trabajador,precioHora,nombreLabor) VALUES ((SELECT MAX(id_trabajador) FROM Trabajador), 12, 'Programador');
INSERT INTO Trabajador_labor(id_labor,id_trabajador) VALUES ((SELECT MAX(id_labor) FROM Labor),(SELECT MAX(id_trabajador) FROM Trabajador));