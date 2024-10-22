#!/usr/bin/env python3
import serial
import csv
import io
import sqlite3
import time

def insert(data):
    # connect to db
    database = '/home/wolfmano1/Projects/renewable-energy-dashboard/backend/data/data.db';
    table = 'solar_data';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # execute
    surface_temperature = data[6]
    watts = data[4]
    ambient_temperature = data[5]
    current = data[3]
    bus_voltage = data[1]
    sql = f"""INSERT INTO {table} (surface_temperature, watts, create_date, ambient_temperature, current, bus_voltage)
            VALUES ({surface_temperature}, {watts}, DATETIME('now', 'localtime'), {ambient_temperature}, {current}, {bus_voltage})"""
    cursor.execute(sql)
    
    # commit and close connection
    conn.commit()
    conn.close()
    
if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()
    
    buffer = ""  # Buffer to accumulate serial data
    
    while True:
        # wait for serial data
        if ser.in_waiting > 0:
            # read serial data
            chunk = ser.read(ser.in_waiting).decode('utf-8')
            buffer += chunk
            
            # check if buffer contains a complete message
            if '<BEGIN>' in buffer and '<END>' in buffer:
                # extract full message
                start_idx = buffer.index('<BEGIN>')
                end_idx = buffer.index('<END>') + len('<END>')
                message = buffer[start_idx:end_idx]
                
                # remove processed part from buffer
                buffer = buffer[end_idx:]
                
                # process CSV data
                csv_data = io.StringIO(message)
                csv_reader = csv.reader(csv_data)
                
                for row in csv_reader:
                    if len(row) > 0 and row[0] == '<BEGIN>' and row[-1] == '<END>':
                        # do insert
                        print(row)
                        insert(row)
                        buffer = ""
                    else:
                        print("BAD")
                        
        # wait one second
        time.sleep(1)
    
        
