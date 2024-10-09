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

-- Create the user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name VARCHAR(50),
    property_value VARCHAR(50)
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_type VARCHAR(50),
    alert_message TEXT,
    triggered_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
