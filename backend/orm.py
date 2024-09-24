#!/usr/bin/env python3
import serial
import sqlite3
import time

if __name__ == '__main__':
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
    ser.reset_input_buffer()
    
    while True:
        chunk = ser.read(ser.in_waiting).decode('utf-8')
        print("Received: ", chunk)
        time.sleep(1)
        
