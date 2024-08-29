-- Create the solar_data table
CREATE TABLE IF NOT EXISTS solar_data (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    surface_temperature REAL,
    watts REAL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create the user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    property_name VARCHAR(50),
    property_value VARCHAR(50)
);
