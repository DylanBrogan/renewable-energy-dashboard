-- Create the solar_data table
CREATE TABLE IF NOT EXISTS solar_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    surface_temperature REAL,
    ambient_temperature REAL,
    watts REAL,
    current REAL,
    bus_voltage REAL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create historical solar data table
CREATE TABLE IF NOT EXISTS historic_solar_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    avg_surface_temperature REAL,
    avg_watts REAL,
    create_date DATETIME
);

-- Create the hydro_data table
CREATE TABLE IF NOT EXISTS hydro_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    flowrate REAL,
    watts REAL,
    current REAL,
    bus_voltage REAL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create historical hydro data table
CREATE TABLE IF NOT EXISTS historic_hydro_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    avg_flowrate REAL,
    avg_watts REAL,
    create_date DATETIME
);

-- Create the wind_data table
CREATE TABLE IF NOT EXISTS wind_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    watts REAL,
    current REAL,
    bus_voltage REAL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create historical wind data table
CREATE TABLE IF NOT EXISTS historic_wind_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    avg_watts REAL,
    create_date DATETIME
);

