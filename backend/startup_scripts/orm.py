#!/usr/bin/env python3
import serial
import csv
import io
import sqlite3
import time

def sensor_insert(data):
    # connect to db
    database = '/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # Gather values from row
    # Solar Data
    solar_bus_voltage = data[1]
    solar_current = data[2]
    solar_watts = data[3]
    ambient_temperature = data[4]
    surface_temperature = data[5]
    # Hydro Data
    hydro_bus_voltage = data[6]
    hydro_current = data[7]
    hydro_watts = (float(hydro_current) if float(hydro_current) > 0 else 1) * float(hydro_bus_voltage)
    flow_rate = data[9]
    # Wind Data
    wind_bus_voltage = data[10]
    wind_current = data[11]
    wind_watts = (float(wind_current) if float(wind_current) > 0 else 1) * float(wind_bus_voltage)

    print(f"SOLAR[{solar_bus_voltage}, {solar_current}, {solar_watts}, {ambient_temperature}, {surface_temperature}] HYDRO[{hydro_bus_voltage}, {hydro_current}, {hydro_watts}, {flow_rate}] WIND[{wind_bus_voltage}, {wind_current}, {wind_watts}]")
    # SQL to execute
    solar_sql = f"""INSERT INTO solar_data (surface_temperature, watts, ambient_temperature, current, bus_voltage, create_date)
            VALUES ({surface_temperature}, {solar_watts}, {ambient_temperature}, {solar_current}, {solar_bus_voltage}, DATETIME('now', 'localtime'))"""
    hydro_sql = f"""INSERT INTO hydro_data (watts, current, bus_voltage, flowrate, create_date)
            VALUES ({hydro_watts}, {hydro_current}, {hydro_bus_voltage}, {flow_rate}, DATETIME('now', 'localtime'))"""
    wind_sql = f"""INSERT INTO wind_data (watts, current, bus_voltage, create_date)
            VALUES ({wind_watts}, {wind_current}, {wind_bus_voltage}, DATETIME('now', 'localtime'))"""
    cursor.execute(hydro_sql)
    cursor.execute(solar_sql)
    cursor.execute(wind_sql)
    
    # commit and close connection
    conn.commit()
    conn.close()
   
if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()

    # Buffer to accumulate serial data
    buffer = ""
    print("[solar_bus_voltage, solar_current, solar_watts, ambient_temperature, surface_temperature] [hydro_bus_voltage, hydro_current, hydro_watts, flow_rate] [wind_bus_voltage, wind_current, wind_watts]")   
    while True:
        # wait for serial data
        if ser.in_waiting > 0:
            # read serial data
            chunk = ser.read(ser.in_waiting).decode('utf-8')
            buffer += chunk

            # check if buffer1 contains a complete message
            if '<BEGIN>' in buffer and '<END>' in buffer:
                # extract full message
                start_idx = buffer.index('<BEGIN>')
                end_idx = buffer.index('<END>') + len('<END>')
                message = buffer[start_idx:end_idx]

                # remove processed part from buffer1
                buffer = buffer[end_idx:]

                # process CSV data
                csv_data = io.StringIO(message)
                csv_reader = csv.reader(csv_data)
                
                for row in csv_reader:
                    if len(row) > 0 and row[0] == '<BEGIN>' and row[-1] == '<END>':
                        # do insert
                        # print(row)
                        sensor_insert(row)
                        buffer = ""
                    else:
                        print("BAD")


        time.sleep(1)
        
