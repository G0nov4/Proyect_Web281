--  Creamos la super entidad de usuarios
DROP TABLE IF EXIST 'usuario_root';
CREATE TABLE usuario_root
(
	idRoot INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	username VARCHAR(20),
	email VARCHAR(50),
	password VARCHAR(200),
	tipo VARCHAR(50) NOT NULL DEFAULT 'Admin'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

DROP TABLE IF EXIST 'usuario_gerencial';
CREATE TABLE usuario_root
(
	idGerencial INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellido VARCHAR(100),
	username VARCHAR(20),
	email VARCHAR(50),
	password VARCHAR(200),
	tipo VARCHAR(50) NOT NULL DEFAULT 'Gerencial'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;



DROP TABLE IF EXIST 'usuario_cliente';
CREATE TABLE usuario_cliente
(
	idCliente INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellido VARCHAR(100),
	username VARCHAR(20),
	email VARCHAR(50),
	password VARCHAR(200),
	tipo VARCHAR(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


CREATE TABLE Proyectos
(
	idProyecto INT NOT NULL AUTO_INCREMENT,
	idGerente INT, 
	isValidate BOOL NOT NULL,
	nombre VARCHAR(255),
	objetivo TEXT NOT NULL,
	mision TEXT NOT NULL,
	vision TEXT NOT NULL,
	logotipo VARCHAR(255) NOT NULL,
	FOREIGN KEY (idGerente) REFERENCIA usuario_gerencial(idGerencial) 
)


DROP TABLE IF EXIST 'comentarios';
CREATE TABLE comentarios
(
	idCliente INT,
	idProyecto INT,
	comentario TEXT NOT NULL,
	FOREIGN KEY (idCliente) REFERENCIA usuario_cliente(idCliente),
	FOREIGN KEY (idProyecto) REFERENCIA Proyectos(idProyecto) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;



DROP TABLE IF EXIST 'patrocinadores';
CREATE TABLE patrocinadores
(
	idPatrocinador INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	Descripcion TEXT,
	logotipo VARCHAR(200),
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;




DROP TABLE IF EXIST 'proy_t_pat';
CREATE TABLE proy_t_pat
(
	idProyecto INT ,
	idPatrocinador INT,
	FOREIGN KEY (idProyecto) REFERENCIA Proyectos(idProyecto),
	FOREIGN KEY (idPatrocinador) REFERENCIA patrocinadores(idPatrocinador) 
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;




DROP TABLE IF EXIST 'artcul';
CREATE TABLE artcul
(
	idProyecto INT,
	lugar VARCHAR(150) NOT NULL,
	fecha VARCHAR(150) NOT NULL,
	hora VARCHAR(150) NOT NULL,
	Descripcion TEXT NOT NULL,
	imagen VARCHAR(200),
	FOREIGN KEY (idProyecto) REFERENCIA Proyectos(idProyecto) 
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


DROP TABLE IF EXIST 'serprod';
CREATE TABLE serprod
(
	idProyecto INT,
	nombre VARCHAR(150) NOT NULL,
	tipo VARCHAR(150) NOT NULL,
	categoria VARCHAR(150) NOT NULL,
	tipo TEXT NOT NULL,
	precio INT NOT NULL,
	stock INT NOT NULL,
	FOREIGN KEY (idProyecto) REFERENCIA Proyectos(idProyecto) 
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;




DROP TABLE IF EXIST 'beneficiencia';
CREATE TABLE beneficiencia
(
	idProyecto INT,
	nombre_beneficiario VARCHAR(150) NOT NULL,
	evento VARCHAR(150) NOT NULL,
	lugar VARCHAR(150) NOT NULL,
	actividades TEXT NOT NULL,
	FOREIGN KEY (idProyecto) REFERENCIA Proyectos(idProyecto) 
)ENGINE=InnoDB  DEFAULT CHARSET=utf8;


