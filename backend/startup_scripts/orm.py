#!/usr/bin/env python3
import serial
import csv
import io
import sqlite3
import time

def solar_insert(data):
    # connect to db
    database = '/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # Gather values from row
    surface_temperature = data[6]
    watts = data[4]
    ambient_temperature = data[5]
    current = data[3]
    bus_voltage = data[1]

    # SQL to execute
    solar_sql = f"""INSERT INTO solar_data (surface_temperature, watts, ambient_temperature, current, bus_voltage, create_date)
            VALUES ({surface_temperature}, {watts}, {ambient_temperature}, {current}, {bus_voltage}, DATETIME('now', 'localtime'))"""
    cursor.execute(solar_sql)
    
    # commit and close connection
    conn.commit()
    conn.close()

def hydro_insert(data):
    # connect to db
    database = '/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # Gather values from row
    flowrate = data[]
    watts = data[]
    current = data[]
    bus_voltage = data[]

    # SQL to execute
    hydro_sql = f"""INSERT INTO hydro_data (watts, current, bus_voltage, flowrate, create_date)
            VALUES ({watts}, {current}, {bus_voltage}, {flowrate}, DATETIME('now', 'localtime'))"""
    cursor.execute(hydro_sql)
    
    # commit and close connection
    conn.commit()
    conn.close()
 
def wind_insert(data):
    # connect to db
    database = '/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # Gather values from row
    watts = data[]
    current = data[]
    bus_voltage = data[]

    # SQL to execute
    wind_sql = f"""INSERT INTO wind_data (watts, current, bus_voltage, create_date)
            VALUES ({watts}, {current}, {bus_voltage}, DATETIME('now', 'localtime'))"""
    cursor.execute(wind_sql)
    
    # commit and close connection
    conn.commit()
    conn.close()
   
if __name__ == '__main__':
    ser1 = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser1.reset_input_buffer()
    ser2 = serial.Serial('/dev/ttyACM1', 9600, timeout=1)
    ser2.reset_input_buffer()

    # Buffer to accumulate serial data
    buffer1 = "" 
    buffer2 = ""
    
    while True:
        # wait for serial data
        if ser1.in_waiting > 0:
            # read serial data
            chunk = ser1.read(ser1.in_waiting).decode('utf-8')
            buffer1 += chunk
            
            # check if buffer1 contains a complete message
            if '<BEGIN>' in buffer1 and '<END>' in buffer1:
                # extract full message
                start_idx = buffer1.index('<BEGIN>')
                end_idx = buffer1.index('<END>') + len('<END>')
                message = buffer1[start_idx:end_idx]
                
                # remove processed part from buffer1
                buffer1 = buffer1[end_idx:]
                
                # process CSV data
                csv_data = io.StringIO(message)
                csv_reader = csv.reader(csv_data)
                
                for row in csv_reader:
                    if len(row) > 0 and row[0] == '<BEGIN>' and row[-1] == '<END>':
                        # do insert
                        print(row)
                        insert(row)
                        buffer1 = ""
                    else:
                        print("BAD")
                        
        if ser2.in_wating > 0:
            # Read serial data
            chunk = ser1.read(ser1.in_waiting).decode('utf-8')
            buffer2 += chunk
            
            # Check if buffer2 contains a complete message
            if '<BEGIN>' in buffer2 and '<END>' in buffer2:
                # extract full message
                start_idx = buffer2.index('<BEGIN>')
                end_idx = buffer2.index('<END>') + len('<END>')
                message = buffer2[start_idx:end_idx]
                
                # remove processed part from buffer2
                buffer2 = buffer2[end_idx:]
                
                # process CSV data
                csv_data = io.StringIO(message)
                csv_reader = csv.reader(csv_data)
                
                for row in csv_reader:
                    if len(row) > 0 and row[0] == '<BEGIN>' and row[-1] == '<END>':
                        # do insert
                        print(row)
                        hydro_insert(row)
                        wind_insert(row)
                        buffer2 = ""
                    else:
                        print("BAD")

        time.sleep(1)
        
