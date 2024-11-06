import sqlite3
from datetime import datetime, timedelta

# Connect to the SQLite database
conn = sqlite3.connect('/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db')
cursor = conn.cursor()

# Get oldest hour from solar_data table
cursor.execute('''
    SELECT MIN(create_date)
    FROM solar_data;
''')
oldest_hour = datetime.strptime(cursor.fetchone()[0], '%Y-%m-%d %H:%M:%S')

if oldest_hour:
    # Calculate the timestamp for the end of the oldest hour
    end_of_oldest_hour_str = (oldest_hour + timedelta(hours=1)).strftime('%Y-%m-%d %H:00:00')

    # Get the average surface temperature and watts for the oldest hour
    cursor.execute('''
        SELECT AVG(surface_temperature), AVG(watts)
        FROM solar_data
        WHERE create_date >= ? AND create_date < ?
    ''', (oldest_hour, end_of_oldest_hour_str))

    avg_surface_temp, avg_watts = cursor.fetchone()

    # Insert the averages into the historic_solar_data table
    cursor.execute('''
        INSERT INTO historic_solar_data (avg_surface_temperature, avg_watts, create_date)
        VALUES (?, ?, ?)
    ''', (avg_surface_temp, avg_watts, oldest_hour.replace(minute=0, second=0, microsecond=0)))

    # Delete the data from the oldest hour in the solar_data table
    cursor.execute('''
        DELETE FROM solar_data
        WHERE create_date >= ? AND create_date < ?
    ''', (oldest_hour, end_of_oldest_hour_str))

    conn.commit()

conn.close()
