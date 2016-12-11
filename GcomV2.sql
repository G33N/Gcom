-- MySQL Script generated by MySQL Workbench
-- Sun 27 Nov 2016 12:45:56 PM ART
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema GcomV2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema GcomV2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GcomV2` DEFAULT CHARACTER SET utf8 ;
USE `GcomV2` ;

-- -----------------------------------------------------
-- Table `GcomV2`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`categoria` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`iva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`iva` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `iva` DECIMAL(5,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`tipo_documento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`tipo_documento` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`cliente` (
  `cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `tipo_documento` INT(11) NOT NULL,
  `tipo` INT(11) NOT NULL,
  `nombre` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `direccion` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `localidad` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `telefono` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `mail` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`cuit`),
  INDEX `fk_cliente_tipo_documento1_idx` (`tipo_documento` ASC),
  INDEX `fk_cliente_iva1_idx` (`tipo` ASC),
  CONSTRAINT `fk_cliente_iva1`
    FOREIGN KEY (`tipo`)
    REFERENCES `GcomV2`.`iva` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cliente_tipo_documento1`
    FOREIGN KEY (`tipo_documento`)
    REFERENCES `GcomV2`.`tipo_documento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci
COMMENT = '					';


-- -----------------------------------------------------
-- Table `GcomV2`.`cuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`cuenta` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `forma_pago` INT(11) NOT NULL,
  `fecha` DATE NOT NULL,
  `concepto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `importe` DECIMAL(15,2) NOT NULL,
  `saldo` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cuenta_cliente1_idx` (`cliente_cuit` ASC),
  CONSTRAINT `fk_cuenta_cliente1`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`estado` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`forma_pago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`forma_pago` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`tipo_cbte`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`tipo_cbte` (
  `codigo` INT NOT NULL,
  `denominacion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`factura` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `forma_pago_id` INT(11) NOT NULL,
  `estado` INT(11) NOT NULL,
  `punto_vta` INT NOT NULL,
  `tipo_cbte` INT NOT NULL,
  `cbte_nro` INT(32) NULL DEFAULT 0,
  `cae` INT(32) NULL,
  `fecha_vto` INT(11) NULL DEFAULT NULL,
  `empleado` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `observacion` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `fecha_cbte` DATE NOT NULL,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `iva` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`id`, `tipo_cbte`),
  INDEX `fk_factura_forma_pago1_idx` (`forma_pago_id` ASC),
  INDEX `fk_factura_cliente1_idx` (`cliente_cuit` ASC),
  INDEX `fk_factura_estado1_idx` (`estado` ASC),
  INDEX `fk_factura_tipo_cbte1_idx` (`tipo_cbte` ASC),
  CONSTRAINT `fk_factura_cliente1`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_estado1`
    FOREIGN KEY (`estado`)
    REFERENCES `GcomV2`.`estado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_forma_pago1`
    FOREIGN KEY (`forma_pago_id`)
    REFERENCES `GcomV2`.`forma_pago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_tipo_cbte1`
    FOREIGN KEY (`tipo_cbte`)
    REFERENCES `GcomV2`.`tipo_cbte` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`proveedor` (
  `cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `tipo_documento_id` INT(11) NOT NULL,
  `tipo` INT(11) NOT NULL,
  `nombre` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `direccion` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `localidad` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `telefono` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `mail` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`cuit`),
  INDEX `fk_proveedor_tipo_documento1_idx` (`tipo_documento_id` ASC),
  INDEX `fk_proveedor_iva1_idx` (`tipo` ASC),
  CONSTRAINT `fk_proveedor_iva1`
    FOREIGN KEY (`tipo`)
    REFERENCES `GcomV2`.`iva` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedor_tipo_documento1`
    FOREIGN KEY (`tipo_documento_id`)
    REFERENCES `GcomV2`.`tipo_documento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci
COMMENT = '					';


-- -----------------------------------------------------
-- Table `GcomV2`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`producto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `categoria_id` INT(11) NOT NULL,
  `proveedor_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `codigo` VARCHAR(16) CHARACTER SET 'utf8' NOT NULL,
  `nombre` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `detalle` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `marca` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `stock` INT(11) NOT NULL,
  `precio_venta` DECIMAL(15,2) NOT NULL,
  `precio_costo` DECIMAL(15,2) NOT NULL,
  `fecha_ingreso` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_producto_categoria_idx` (`categoria_id` ASC),
  INDEX `fk_producto_proveedor1_idx` (`proveedor_cuit` ASC),
  CONSTRAINT `fk_producto_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `GcomV2`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_producto_proveedor1`
    FOREIGN KEY (`proveedor_cuit`)
    REFERENCES `GcomV2`.`proveedor` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`detalle_factura` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `producto_id` INT(11) NOT NULL,
  `factura_id` INT(11) NOT NULL,
  `nombre_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `detalle_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `precio_venta` DECIMAL(15,2) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `total` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`, `producto_id`, `factura_id`),
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id` ASC),
  INDEX `fk_detalle_factura_factura1_idx` (`factura_id` ASC),
  CONSTRAINT `fk_detalle_factura_factura1`
    FOREIGN KEY (`factura_id`)
    REFERENCES `GcomV2`.`factura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_factura_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `GcomV2`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`remito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`remito` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `factura_id` INT(32) NULL,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `forma_pago` INT(11) NOT NULL,
  `empleado` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `observacion` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT '',
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_remito_cliente1_idx` (`cliente_cuit` ASC),
  INDEX `fk_remito_forma_pago1_idx` (`forma_pago` ASC),
  CONSTRAINT `fk_remito_cliente1`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_remito_forma_pago1`
    FOREIGN KEY (`forma_pago`)
    REFERENCES `GcomV2`.`forma_pago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`detalle_remito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`detalle_remito` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `remito_id` INT(11) NOT NULL,
  `producto_id` INT(11) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `detalle_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `nombre_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`, `remito_id`, `producto_id`),
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id` ASC),
  INDEX `fk_detalle_remito_remito1_idx` (`remito_id` ASC),
  CONSTRAINT `fk_detalle_factura_producto10`
    FOREIGN KEY (`producto_id`)
    REFERENCES `GcomV2`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_remito_remito1`
    FOREIGN KEY (`remito_id`)
    REFERENCES `GcomV2`.`remito` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`devolucion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`devolucion` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `detalle_id` INT(11) NOT NULL,
  `detalle_producto` INT(11) NOT NULL,
  `detalle_factura` INT(11) NOT NULL,
  `motivo` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `fecha` DATE NOT NULL,
  `cantidad` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `detalle_id`, `detalle_producto`, `detalle_factura`),
  INDEX `fk_devolucion_detalle_factura1_idx` (`detalle_id` ASC, `detalle_producto` ASC, `detalle_factura` ASC),
  CONSTRAINT `fk_devolucion_detalle_factura1`
    FOREIGN KEY (`detalle_id` , `detalle_producto` , `detalle_factura`)
    REFERENCES `GcomV2`.`detalle_factura` (`id` , `producto_id` , `factura_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`tmp_detalle_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`tmp_detalle_factura` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `producto_id` INT(11) NOT NULL,
  `factura_id` INT(11) NOT NULL,
  `nombre_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `detalle_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `precio_venta` DECIMAL(15,2) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `total` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`, `producto_id`),
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id` ASC),
  CONSTRAINT `fk_detalle_factura_producto11`
    FOREIGN KEY (`producto_id`)
    REFERENCES `GcomV2`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`tmp_detalle_remito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`tmp_detalle_remito` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `producto_id` INT(11) NOT NULL,
  `remito_id` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `nombre_producto` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `cantidad` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `producto_id`),
  INDEX `fk_detalle_factura_producto1_idx` (`producto_id` ASC),
  CONSTRAINT `fk_detalle_factura_producto100`
    FOREIGN KEY (`producto_id`)
    REFERENCES `GcomV2`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`usuario` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `usuario` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  `password` VARCHAR(45) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`presupuesto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`presupuesto` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `forma_pago_id` INT(11) NOT NULL,
  `estado` INT(11) NOT NULL,
  `empleado` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `observacion` VARCHAR(45) CHARACTER SET 'utf8' NULL DEFAULT NULL,
  `fecha` DATE NOT NULL,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0,
  `iva` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_factura_forma_pago1_idx` (`forma_pago_id` ASC),
  INDEX `fk_factura_cliente1_idx` (`cliente_cuit` ASC),
  INDEX `fk_factura_estado1_idx` (`estado` ASC),
  CONSTRAINT `fk_factura_cliente10`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_estado10`
    FOREIGN KEY (`estado`)
    REFERENCES `GcomV2`.`estado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_factura_forma_pago10`
    FOREIGN KEY (`forma_pago_id`)
    REFERENCES `GcomV2`.`forma_pago` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish_ci;


-- -----------------------------------------------------
-- Table `GcomV2`.`caja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`caja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `detalle` VARCHAR(45) NOT NULL,
  `saldo` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`operaciones_caja`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`operaciones_caja` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `caja_id` INT NOT NULL,
  `factura_id` INT(11) NULL,
  `detalle` VARCHAR(45) NOT NULL,
  `tipo` INT NOT NULL,
  `fecha` DATE NOT NULL,
  `usuario` VARCHAR(45) NOT NULL,
  `monto` DECIMAL(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_operaciones_caja_caja1_idx` (`caja_id` ASC),
  INDEX `fk_operaciones_caja_factura1_idx` (`factura_id` ASC),
  CONSTRAINT `fk_operaciones_caja_caja1`
    FOREIGN KEY (`caja_id`)
    REFERENCES `GcomV2`.`caja` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_operaciones_caja_factura1`
    FOREIGN KEY (`factura_id`)
    REFERENCES `GcomV2`.`factura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`infraestructura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`infraestructura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`, `cliente_cuit`),
  INDEX `fk_infraestructura_cliente1_idx` (`cliente_cuit` ASC),
  CONSTRAINT `fk_infraestructura_cliente1`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`equipamiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`equipamiento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `infraestructura_id` INT NOT NULL,
  `infraestructura_cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `titulo` VARCHAR(45) NOT NULL,
  `detalle` VARCHAR(512) NOT NULL,
  PRIMARY KEY (`id`, `infraestructura_id`, `infraestructura_cliente_cuit`),
  INDEX `fk_equipamiento_infraestructura1_idx` (`infraestructura_id` ASC, `infraestructura_cliente_cuit` ASC),
  CONSTRAINT `fk_equipamiento_infraestructura1`
    FOREIGN KEY (`infraestructura_id` , `infraestructura_cliente_cuit`)
    REFERENCES `GcomV2`.`infraestructura` (`id` , `cliente_cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`adjuntos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`adjuntos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `equipamiento_id` INT NOT NULL,
  `equipamiento_infraestructura_id` INT NOT NULL,
  `equipamiento_infraestructura_cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `ruta` VARCHAR(64) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_adjuntos_equipamiento1_idx` (`equipamiento_id` ASC, `equipamiento_infraestructura_id` ASC, `equipamiento_infraestructura_cliente_cuit` ASC),
  CONSTRAINT `fk_adjuntos_equipamiento1`
    FOREIGN KEY (`equipamiento_id` , `equipamiento_infraestructura_id` , `equipamiento_infraestructura_cliente_cuit`)
    REFERENCES `GcomV2`.`equipamiento` (`id` , `infraestructura_id` , `infraestructura_cliente_cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GcomV2`.`orden`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GcomV2`.`orden` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente_cuit` VARCHAR(20) CHARACTER SET 'utf8' NOT NULL,
  `factura_id` INT(11) NULL,
  `detalle` VARCHAR(512) NOT NULL,
  `fecha` DATE NOT NULL,
  PRIMARY KEY (`id`, `cliente_cuit`),
  INDEX `fk_orden_cliente1_idx` (`cliente_cuit` ASC),
  INDEX `fk_orden_factura1_idx` (`factura_id` ASC),
  CONSTRAINT `fk_orden_cliente1`
    FOREIGN KEY (`cliente_cuit`)
    REFERENCES `GcomV2`.`cliente` (`cuit`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orden_factura1`
    FOREIGN KEY (`factura_id`)
    REFERENCES `GcomV2`.`factura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `GcomV2`.`iva`
-- -----------------------------------------------------
START TRANSACTION;
USE `GcomV2`;
INSERT INTO `GcomV2`.`iva` (`id`, `nombre`, `iva`) VALUES (1, 'RESP. INSCRIPTO', );
INSERT INTO `GcomV2`.`iva` (`id`, `nombre`, `iva`) VALUES (2, 'NO RESP.', NULL);
INSERT INTO `GcomV2`.`iva` (`id`, `nombre`, `iva`) VALUES (3, 'RESP. MONOTRIBUTO', NULL);
INSERT INTO `GcomV2`.`iva` (`id`, `nombre`, `iva`) VALUES (4, 'CONS. FINAL', NULL);
INSERT INTO `GcomV2`.`iva` (`id`, `nombre`, `iva`) VALUES (5, 'EXENTO', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `GcomV2`.`tipo_documento`
-- -----------------------------------------------------
START TRANSACTION;
USE `GcomV2`;
INSERT INTO `GcomV2`.`tipo_documento` (`id`, `detalle`) VALUES (80, 'CUIT');
INSERT INTO `GcomV2`.`tipo_documento` (`id`, `detalle`) VALUES (96, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `GcomV2`.`estado`
-- -----------------------------------------------------
START TRANSACTION;
USE `GcomV2`;
INSERT INTO `GcomV2`.`estado` (`id`, `detalle`) VALUES (1, 'PAGO');
INSERT INTO `GcomV2`.`estado` (`id`, `detalle`) VALUES (2, 'VENCIDO');
INSERT INTO `GcomV2`.`estado` (`id`, `detalle`) VALUES (3, 'ANULADO');
INSERT INTO `GcomV2`.`estado` (`id`, `detalle`) VALUES (4, 'EN PROCESO');

COMMIT;


-- -----------------------------------------------------
-- Data for table `GcomV2`.`tipo_cbte`
-- -----------------------------------------------------
START TRANSACTION;
USE `GcomV2`;
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (1, 'FACTURAS A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (2, 'NOTAS DE DEBITO A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (3, 'NOTAS DE CREDITO A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (4, 'RECIBOS A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (5, 'NOTAS DE VENTA AL CONTADO A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (6, 'FACTURAS B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (7, 'NOTAS DE DEBITO B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (8, 'NOTAS DE CREDITO B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (9, 'RECIBOS B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (10, 'NOTAS DE VENTA AL CONTADO B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (11, 'FACTURAS C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (12, 'NOTAS DE DEBITO C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (13, 'NOTAS DE CREDITO C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (14, 'DOCUMENTO ADUANERO');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (15, 'RECIBOS C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (16, 'NOTAS DE VENTA AL CONTADO C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (19, 'FACTURAS DE EXPORTACION');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (20, 'NOTAS DE DEBITO POR OPERACIONES CON EL EXTERI');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (21, 'NOTAS DE CREDITO POR OPERACIONES CON EL EXTER');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (22, 'FACTURAS - PERMISO EXPORTACION SIMPLIFICADO -');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (30, 'COMPROBANTES DE COMPRA DE BIENES USADOS');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (31, 'MANDATO - CONSIGNACION');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (32, 'COMPROBANTES PARA RECICLAR MATERIALES');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (34, 'COMPROBANTES A DEL APARTADO A  INCISO F  R G ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (35, 'COMPROBANTES B DEL ANEXO I');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (36, 'COMPROBANTES C DEL Anexo I');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (37, 'NOTAS DE DEBITO O DOCUMENTO EQUIVALENTE QUE C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (38, 'NOTAS DE CREDITO O DOCMENTO EQUIVALENTE QUE C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (39, 'OTROS COMPROBANTES A QUE CUMPLEN CON LA R G  ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (40, 'OTROS COMPROBANTES B QUE CUMPLAN CON LA R.G. ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (41, 'OTROS COMPROBANTES C QUE CUMPLAN CON LA R.G. ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (50, 'RECIBO FACTURA A  REGIMEN DE FACTURA DE CREDI');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (51, 'FACTURAS M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (52, 'NOTAS DE DEBITO M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (53, 'NOTAS DE CREDITO M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (54, 'RECIBOS M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (55, 'NOTAS DE VENTA AL CONTADO M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (56, 'COMPROBANTES M DEL ANEXO I  APARTADO A  INC F');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (57, 'OTROS COMPROBANTES M QUE CUMPLAN CON LA R G  ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (58, 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (59, 'LIQUIDACIONES M');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (60, 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (61, 'CUENTAS DE VENTA Y LIQUIDO PRODUCTO B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (63, 'LIQUIDACIONES A');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (64, 'LIQUIDACIONES B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (65, 'NOTAS DE CREDITO DE COMPROBANTES CON COD. 34');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (66, 'DESPACHO DE IMPORTACION');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (67, 'IMPORTACION DE SERVICIOS');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (68, 'LIQUIDACION C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (70, 'RECIBOS FACTURA DE CREDITO');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (71, 'CREDITO FISCAL POR CONTRIBUCIONES PATRONALES');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (73, 'FORMULARIO 1116 RT');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (74, 'CARTA DE PORTE PARA EL TRANSPORTE AUTOMOTOR P');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (75, 'CARTA DE PORTE PARA EL TRANSPORTE FERROVIARIO');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (77, '');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (78, '');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (79, '');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (80, 'COMPROBANTE DIARIO DE CIERRE (ZETA)');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (81, 'TIQUE FACTURA A   CONTROLADORES FISCALES');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (82, 'TIQUE - FACTURA B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (83, 'TIQUE');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (84, 'COMPROBANTE   FACTURA DE SERVICIOS PUBLICOS  ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (85, 'NOTA DE CREDITO   SERVICIOS PUBLICOS   NOTA D');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (86, 'NOTA DE DEBITO   SERVICIOS PUBLICOS');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (87, 'OTROS COMPROBANTES - SERVICIOS DEL EXTERIOR');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (88, 'OTROS COMPROBANTES - DOCUMENTOS EXCEPTUADOS /');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (89, 'OTROS COMPROBANTES - DOCUMENTOS EXCEPTUADOS -');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (90, 'OTROS COMPROBANTES - DOCUMENTOS EXCEPTUADOS -');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (91, 'REMITOS R');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (92, 'AJUSTES CONTABLES QUE INCREMENTAN EL DEBITO F');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (93, 'AJUSTES CONTABLES QUE DISMINUYEN EL DEBITO FI');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (94, 'AJUSTES CONTABLES QUE INCREMENTAN EL CREDITO ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (95, 'AJUSTES CONTABLES QUE DISMINUYEN EL CREDITO F');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (96, 'FORMULARIO 1116 B');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (97, 'FORMULARIO 1116 C');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (99, 'OTROS COMP  QUE NO CUMPLEN CON LA R G  3419 Y');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (101, 'AJUSTE ANUAL PROVENIENTE DE LA  D J  DEL IVA ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (102, 'AJUSTE ANUAL PROVENIENTE DE LA  D J  DEL IVA ');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (103, 'NOTA DE ASIGNACION');
INSERT INTO `GcomV2`.`tipo_cbte` (`codigo`, `denominacion`) VALUES (104, 'NOTA DE CREDITO DE ASIGNACION');

COMMIT;


-- -----------------------------------------------------
-- Data for table `GcomV2`.`usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `GcomV2`;
INSERT INTO `GcomV2`.`usuario` (`id`, `nombre`, `usuario`, `password`) VALUES (1, 'Celiz Matias', 'mceliz', DEFAULT);

COMMIT;
