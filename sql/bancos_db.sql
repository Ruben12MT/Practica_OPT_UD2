-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 23-01-2026 a las 16:48:00
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bancos_db`
--
CREATE DATABASE IF NOT EXISTS `bancos_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `bancos_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bank`
--

CREATE TABLE `bank` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `n_employees` int NOT NULL,
  `initial_cap` decimal(15,2) NOT NULL,
  `foundation` date NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  `url_image` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bank`
--

INSERT INTO `bank` (`id`, `name`, `n_employees`, `initial_cap`, `foundation`, `active`, `url_image`) VALUES
(1, 'Global Bank', 1500, 5000000.00, '1985-05-12', 1, '1.png'),
(2, 'Banco del Norte', 850, 2500000.50, '1992-10-20', 1, NULL),
(3, 'EuroFinanz', 3200, 12000000.00, '1970-03-15', 1, NULL),
(4, 'SafeTrust', 400, 950000.00, '2010-01-05', 1, NULL),
(5, 'Andes Capital', 1200, 4300000.75, '1998-11-30', 1, NULL),
(6, 'MetroBank', 2100, 7800000.00, '1980-06-22', 1, NULL),
(7, 'Digital Saver', 150, 1200000.00, '2018-09-14', 1, NULL),
(8, 'Banco Real', 5000, 25000000.00, '1955-04-01', 1, NULL),
(9, 'Ocean Bank', 600, 1800000.25, '2005-12-12', 1, NULL),
(10, 'Prime Choice', 950, 3100000.00, '2001-07-08', 0, NULL),
(11, 'Liberty Finance', 1100, 4500000.00, '1995-02-28', 1, NULL),
(12, 'Nordic Trust', 750, 2900000.50, '1988-11-15', 1, NULL),
(13, 'Sunrise Banking', 300, 800000.00, '2015-05-20', 1, '13.png'),
(14, 'Peak Performance', 2000, 9200000.75, '1975-08-30', 1, NULL),
(15, 'City Center Bank', 1400, 5600000.00, '1990-01-10', 1, NULL),
(16, 'Silver Lining', 250, 1100000.00, '2012-03-25', 1, NULL),
(17, 'Atlas Global', 3500, 18500000.00, '1965-09-18', 1, NULL),
(18, 'Frontier Bank', 550, 2100000.25, '2008-06-05', 1, '18.png'),
(19, 'Heritage Trust', 1800, 7300000.00, '1982-12-01', 1, NULL),
(20, 'Zenith Banking', 900, 3800000.50, '2003-10-15', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bank_branch`
--

CREATE TABLE `bank_branch` (
  `id` int NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `n_tellers` int NOT NULL,
  `monthly_income` decimal(10,2) DEFAULT NULL,
  `opening_date` date DEFAULT NULL,
  `open` tinyint(1) DEFAULT '1',
  `id_bank` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `bank_branch`
--

INSERT INTO `bank_branch` (`id`, `name`, `n_tellers`, `monthly_income`, `opening_date`, `open`, `id_bank`) VALUES
(1, 'Sucursal Central', 8, 45000.50, '2010-05-20', 1, 1),
(2, 'Sucursal Norte', 4, 22000.00, '2012-08-15', 1, 2),
(3, 'Oficina Principal Euro', 12, 89000.75, '1995-03-01', 1, 3),
(4, 'SafeTrust Express', 2, 12000.00, '2020-01-10', 1, 4),
(5, 'Sucursal Altiplano', 5, 31000.25, '2005-11-30', 1, 5),
(6, 'Metro Downtown', 10, 67000.00, '1990-06-15', 1, 6),
(7, 'Digital Hub', 0, 95000.00, '2019-09-01', 1, 7),
(8, 'Real Madrid Centro', 15, 120000.00, '1980-04-10', 1, 8),
(9, 'Sucursal Marina', 3, 18500.50, '2015-12-01', 1, 9),
(10, 'Prime VIP', 6, 42000.00, '2005-07-01', 0, 10),
(11, 'Liberty Square', 7, 38000.00, '2000-02-15', 1, 11),
(12, 'Nordic Oslo', 5, 29000.75, '1995-11-20', 1, 12),
(13, 'Sunrise Beach', 2, 11000.00, '2018-05-10', 1, 13),
(14, 'Peak Alpine', 9, 54000.25, '1985-08-15', 1, 14),
(15, 'City Plaza', 11, 72000.50, '2000-01-20', 1, 15),
(16, 'Silver Cloud', 4, 21000.00, '2014-03-01', 1, 16),
(17, 'Atlas Headquarters', 20, 250000.00, '1970-09-10', 1, 17),
(18, 'Frontier West', 6, 33000.75, '2010-06-15', 1, 18),
(19, 'Heritage Old Town', 8, 48000.00, '1990-12-10', 1, 19),
(20, 'Zenith Airport', 5, 39000.50, '2005-10-20', 0, 20);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bank_branch`
--
ALTER TABLE `bank_branch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banco_id` (`id_bank`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `bank_branch`
--
ALTER TABLE `bank_branch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bank_branch`
--
ALTER TABLE `bank_branch`
  ADD CONSTRAINT `bank_branch_ibfk_1` FOREIGN KEY (`id_bank`) REFERENCES `bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
