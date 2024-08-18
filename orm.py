#!/usr/bin/env python3
import serial
import sqlite3

conn = sqlite3.connect('data/orm_test.db')
cr = conn.cursor()

def insert_test():
    if __name__ == '__main__':
        ser = serial.Serial('/dev/ttyACM0', 9600, timeout=1)
        ser.reset_input_buffer()
    
        buffer=""
        data_started=False
        print("Program started, waiting for <start> tag\n")
        while True:
            chunk = ser.read(ser.in_waiting).decode('utf-8')
    
            if chunk:
                buffer += chunk
                if not data_started:
                    # Look for the start tag
                    start_idx = buffer.find("<start>")
                    if start_idx != -1:
                        data_started = True
                        buffer = buffer[start_idx + len("<start>"):]  # Start processing after the start tag
                else:
                    # Look for the end tag to process complete messages
                    end_idx = buffer.find("<end>")
                    if end_idx != -1:
                        lines = buffer[:end_idx].strip().splitlines()
                        for line in lines:
                            query="INSERT INTO ins_test (str, num) VALUES "
                            substr = line.split(',')
                            char = substr[0].strip()
                            num = substr[1].strip()
                            query += f'("{char}", {num})'
                            cr.execute(query)
                            
                        conn.commit()
                        conn.close()
                        break
    
                        # Optional: set data_started to False if you only want to process one message at a time
               
def select_test():
    cr.execute("SELECT * FROM ins_test")
    return cr.fetchone()

print(select_test())
