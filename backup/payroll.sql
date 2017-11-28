CREATE TABLE IF NOT EXISTS `payroll`.`Employee` (
  `idEmployee` INT NOT NULL,
  `Employee Number` INT UNSIGNED NOT NULL,
  `Last Name` VARCHAR(45) NOT NULL,
  `First Name` VARCHAR(45) NOT NULL,
  `SSN` DECIMAL(10,0) NOT NULL,
  `Pay Rate` VARCHAR(40) NULL,
  `Pay Rates_idPay Rates` INT NOT NULL,
  `Vacation Days` INT NULL,
  `Paid To Date` DECIMAL(2) NULL,
  `Paid Last Year` DECIMAL(2) NULL,
  PRIMARY KEY (`Employee Number`, `Pay Rates_idPay Rates`),
  UNIQUE INDEX `Employee Number_UNIQUE` (`Employee Number` ASC),
  INDEX `fk_Employee_Pay Rates` (`Pay Rates_idPay Rates` ASC),
  CONSTRAINT `fk_Employee_Pay Rates`
    FOREIGN KEY (`Pay Rates_idPay Rates`)
    REFERENCES `mydb`.`Pay Rates` (`idPay Rates`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `payroll`.`Pay Rates` (
  `idPay Rates` INT NOT NULL,
  `Pay Rate Name` VARCHAR(40) NOT NULL,
  `Value` DECIMAL NOT NULL,
  `Tax Percentage` DECIMAL NOT NULL,
  `Pay Type` INT NOT NULL,
  `Pay Amount` DECIMAL NOT NULL,
  `PT - Level C` DECIMAL NOT NULL,
  PRIMARY KEY (`idPay Rates`))
ENGINE = InnoDB