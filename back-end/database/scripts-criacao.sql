-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sos_cidadao
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sos_cidadao
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sos_cidadao` DEFAULT CHARACTER SET utf8 ;
USE `sos_cidadao` ;

-- -----------------------------------------------------
-- Table `sos_cidadao`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `icone` VARCHAR(60) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`tipo_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_criacao` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`estado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`estado` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `sigla` CHAR(2) NOT NULL,
  `icone` VARCHAR(50) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_criacao` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`prefeitura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`prefeitura` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(60) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `icone` VARCHAR(60) NOT NULL,
  `data_criacao` DATETIME NOT NULL,
  `estado_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_prefeitura_estado1`
    FOREIGN KEY (`estado_id`)
    REFERENCES `sos_cidadao`.`estado` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  `email` VARCHAR(120) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `img_perfil` VARCHAR(120) NOT NULL,
  `img_capa` VARCHAR(120) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_cadastro` DATETIME NOT NULL,
  `tipo_usuario_id` INT NOT NULL,
  `prefeitura_id` INT NULL,
  PRIMARY KEY (`id`),  
  CONSTRAINT `fk_usuario_tipo_usuario1`
    FOREIGN KEY (`tipo_usuario_id`)
    REFERENCES `sos_cidadao`.`tipo_usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_prefeitura1`
    FOREIGN KEY (`prefeitura_id`)
    REFERENCES `sos_cidadao`.`prefeitura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`debate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`debate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(120) NOT NULL,
  `descricao` MEDIUMTEXT NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_criacao` DATETIME NOT NULL,
  `categoria_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  `prefeitura_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_debate_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `sos_cidadao`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_debate_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_debate_prefeitura1`
    FOREIGN KEY (`prefeitura_id`)
    REFERENCES `sos_cidadao`.`prefeitura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`denuncia_debate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`denuncia_debate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `desc_denun` MEDIUMTEXT NOT NULL,
  `data_resolucao` DATETIME NOT NULL,
  `comen_resolucao` MEDIUMTEXT NOT NULL,
  `data_criacao` DATETIME NOT NULL,
  `debate_id` INT NOT NULL,
  `usuario_id_resolvedor` INT NULL,
  `usuario_id_criador` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_denuncia_debate_debate1`
    FOREIGN KEY (`debate_id`)
    REFERENCES `sos_cidadao`.`debate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_debate_usuario1`
    FOREIGN KEY (`usuario_id_resolvedor`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_debate_usuario2`
    FOREIGN KEY (`usuario_id_criador`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`mensagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`mensagem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `texto_mensagem` MEDIUMTEXT NOT NULL,
  `data_mensagem` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `debate_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),  
  CONSTRAINT `fk_mensagem_debate1`
    FOREIGN KEY (`debate_id`)
    REFERENCES `sos_cidadao`.`debate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mensagem_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`convite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`convite` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_convite` DATETIME NOT NULL,
  `debate_id` INT NOT NULL,
  `usuario_id_remetente` INT NOT NULL,
  `usuario_id_destinatario` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_convite_debate1`
    FOREIGN KEY (`debate_id`)
    REFERENCES `sos_cidadao`.`debate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_convite_usuario1`
    FOREIGN KEY (`usuario_id_remetente`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_convite_usuario2`
    FOREIGN KEY (`usuario_id_destinatario`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`imgs_debate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`imgs_debate` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_img` VARCHAR(80) NOT NULL,
  `status` CHAR(1) NOT NULL,
  `debate_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_imgs_debate_debate1`
    FOREIGN KEY (`debate_id`)
    REFERENCES `sos_cidadao`.`debate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`recuperar_senha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`recuperar_senha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_solicitacao` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_recuperar_senha_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `icone` VARCHAR(60) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`publicacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`publicacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(120) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_criacao` DATETIME NOT NULL,
  `descricao` MEDIUMTEXT NOT NULL,
  `prefeitura_id` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_publicacao_prefeitura1`
    FOREIGN KEY (`prefeitura_id`)
    REFERENCES `sos_cidadao`.`prefeitura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicacao_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `sos_cidadao`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_publicacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`comentario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc_comen` MEDIUMTEXT NOT NULL,
  `data_comen` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `publicacao_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comentario_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`denuncia_comen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`denuncia_comen` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `desc_denun` MEDIUMTEXT NOT NULL,
  `comen_resolucao` MEDIUMTEXT NOT NULL,
  `data_denun` DATETIME NOT NULL,
  `data_resolucao` DATETIME NOT NULL,
  `comentario_id` INT NOT NULL,
  `usuario_id_resolvedor` INT NULL,
  `usuario_id_criador` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_denuncia_comen_comentario1`
    FOREIGN KEY (`comentario_id`)
    REFERENCES `sos_cidadao`.`comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_comen_usuario1`
    FOREIGN KEY (`usuario_id_resolvedor`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_comen_usuario2`
    FOREIGN KEY (`usuario_id_criador`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`tipo_noti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`tipo_noti` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `verbo_singular` VARCHAR(50) NOT NULL,
  `verbo_plural` VARCHAR(50) NOT NULL,
  `url_destino` VARCHAR(200) NOT NULL,
  `icone` VARCHAR(50) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`notificacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`notificacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `qtd_outras_pessoas` INT NOT NULL DEFAULT 0,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_notificacao` DATETIME NOT NULL,
  `id_auxiliar_notificacao` INT NULL,
  `publicacao_id` INT NULL,
  `tipo_noti_id` INT NOT NULL,
  `usuario_id_notificador` INT NOT NULL,
  `debate_id` INT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_notificacao_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacao_tipo_noti1`
    FOREIGN KEY (`tipo_noti_id`)
    REFERENCES `sos_cidadao`.`tipo_noti` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacao_usuario1`
    FOREIGN KEY (`usuario_id_notificador`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_notificacao_debate1`
    FOREIGN KEY (`debate_id`)
    REFERENCES `sos_cidadao`.`debate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`endereco` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bairro` VARCHAR(70) NOT NULL,
  `complemento` VARCHAR(50) NULL,
  `logradouro` VARCHAR(70) NOT NULL,
  `cep` CHAR(8) NOT NULL,
  `numero` VARCHAR(5) NOT NULL,
  `publicacao_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_endereco_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`imgs_publi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`imgs_publi` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_img` VARCHAR(120) NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `publicacao_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_imgs_publi_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`denuncia_publ`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`denuncia_publ` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `desc_denun` MEDIUMTEXT NOT NULL,
  `data_denun` DATETIME NOT NULL,
  `data_resolucao` DATETIME NOT NULL,
  `comen_resolucao` MEDIUMTEXT NOT NULL,
  `publicacao_id` INT NOT NULL,
  `usuario_id_resolvedor` INT NULL,
  `usuario_id_criador` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_denuncia_publ_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_publ_usuario1`
    FOREIGN KEY (`usuario_id_resolvedor`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_publ_usuario2`
    FOREIGN KEY (`usuario_id_criador`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`resposta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc_resposta` MEDIUMTEXT NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `avaliacao_resposta` FLOAT NOT NULL,
  `ind_resposta_final` CHAR(1) NOT NULL DEFAULT '1',
  `data_resposta` DATETIME NOT NULL,
  `publicacao_id` INT NOT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_resposta_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resposta_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`denuncia_resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`denuncia_resposta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `desc_denun` MEDIUMTEXT NOT NULL,
  `data_denun` DATETIME NOT NULL,
  `data_resolucao` DATETIME NOT NULL,
  `comen_resolucao` MEDIUMTEXT NOT NULL,
  `usuario_id_resolvedor` INT NULL,
  `resposta_id` INT NOT NULL,
  `usuario_id_criador` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_denuncia_resposta_usuario1`
    FOREIGN KEY (`usuario_id_resolvedor`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_resposta_resposta1`
    FOREIGN KEY (`resposta_id`)
    REFERENCES `sos_cidadao`.`resposta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_denuncia_resposta_usuario2`
    FOREIGN KEY (`usuario_id_criador`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`curtir_comentario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`curtir_comentario` (
  `usuario_id` INT NOT NULL,
  `comentario_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `data_criacao` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuario_has_comentario_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_comentario_comentario1`
    FOREIGN KEY (`comentario_id`)
    REFERENCES `sos_cidadao`.`comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`usuarios_notificar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`usuarios_notificar` (
  `usuario_id` INT NOT NULL,
  `notificacao_id` INT NOT NULL,
  `ind_visualizado` CHAR(1) NOT NULL DEFAULT 0,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuario_has_notificacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_notificacao_notificacao1`
    FOREIGN KEY (`notificacao_id`)
    REFERENCES `sos_cidadao`.`notificacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`curtir_publicacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`curtir_publicacao` (
  `usuario_id` INT NOT NULL,
  `publicacao_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_criacao` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuario_has_publicacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_publicacao_publicacao1`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`publicacao_salva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`publicacao_salva` (
  `usuario_id` INT NOT NULL,
  `publicacao_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_criacao` DATETIME NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_usuario_has_publicacao_usuario2`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `sos_cidadao`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_has_publicacao_publicacao2`
    FOREIGN KEY (`publicacao_id`)
    REFERENCES `sos_cidadao`.`publicacao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`comentario_resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`comentario_resposta` (
  `comentario_id_principal` INT NOT NULL,
  `comentario_id_resposta` INT NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comentario_has_comentario_comentario1`
    FOREIGN KEY (`comentario_id_principal`)
    REFERENCES `sos_cidadao`.`comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentario_has_comentario_comentario2`
    FOREIGN KEY (`comentario_id_resposta`)
    REFERENCES `sos_cidadao`.`comentario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sos_cidadao`.`resposta_da_resposta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sos_cidadao`.`resposta_da_resposta` (
  `resposta_id_principal` INT NOT NULL,
  `resposta_id_resposta` INT NOT NULL,
  `status` CHAR(1) NOT NULL DEFAULT '1',
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_resposta_has_resposta_resposta1`
    FOREIGN KEY (`resposta_id_principal`)
    REFERENCES `sos_cidadao`.`resposta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resposta_has_resposta_resposta2`
    FOREIGN KEY (`resposta_id_resposta`)
    REFERENCES `sos_cidadao`.`resposta` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
