#!/usr/bin/env python3
import serial
import csv
import io
import sqlite3
import time

def insert(data):
    # connect to db
    database = 'data/dummy_data.db';
    table = 'solar_data';
    conn = sqlite3.connect(database)
    cursor = conn.cursor()
    
    # execute
    surface_temperature = data[6]
    watts = data[4]
    sql = f"""INSERT INTO {table} (surface_temperature, watts, create_date)
            VALUES ({surface_temperature}, {watts}, DATETIME('now', 'localtime'))"""
    cursor.execute(sql)
    
    # commit and close connection
    conn.commit()
    conn.close()
    
if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()
    
    while True:
        # wait for serial data
        if ser.in_waiting > 0:
            # interpret data as csv
            chunk = ser.read(ser.in_waiting).decode('utf-8')
            csv_data = io.StringIO(chunk)
            csv_reader = csv.reader(csv_data)
            
            # disregard garbage
            for row in csv_reader:
                if len(row) > 0:
                    if (row[0] == '<BEGIN>' and row[len(row)-1] == '<END>'):
                        # do insert
                        print(row)
                        insert(row)
                    else:
                        #error
                        print("BAD")
                        
        # wait one second
        time.sleep(1)
    
        
