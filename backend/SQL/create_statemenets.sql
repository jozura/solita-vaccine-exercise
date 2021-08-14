CREATE TABLE VaccineOrder (
  Id CHAR(36) NOT NULL UNIQUE,
  HealthCareDistrict ENUM('HYKS', 'KYS', 'OYS', 'TAYS', 'TYKS') NOT NULL,
  OrderNumber INT NOT NULL UNIQUE,
  ResponsiblePerson VARCHAR(255) NOT NULL,
  Arrived DATETIME NOT NULL,
  Vaccine ENUM('Zerpfy', 'Antiqua', 'SolarBuddhica') NOT NULL,
  Injections INT NOT NULL, 

  PRIMARY KEY (Id)
);

CREATE TABLE Vaccination (
  Id CHAR(36) NOT NULL UNIQUE,
  SourceBottle CHAR(36) NOT NULL,
  Gender ENUM('male', 'female', 'nonbinary') NOT NULL,
  VaccinationDate DATETIME NOT NULL,

  PRIMARY KEY (Id)
);
