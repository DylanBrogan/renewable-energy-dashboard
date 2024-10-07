#include <Wire.h>
#include "DFRobot_INA219.h"
#include "DFRobot_MLX90614.h"

/**
 * @fn DFRobot_INA219_IIC
 * @brief pWire I2C controller pointer
 * @param i2caddr  I2C address
 * @n INA219_I2C_ADDRESS1  0x40   A0 = 0  A1 = 0
 * @n INA219_I2C_ADDRESS2  0x41   A0 = 1  A1 = 0
 * @n INA219_I2C_ADDRESS3  0x44   A0 = 0  A1 = 1
 * @n INA219_I2C_ADDRESS4  0x45   A0 = 1  A1 = 1	 
  */

#define MLX90614_I2C_ADDR 0x5A   // mlx9614 default I2C communication address

DFRobot_MLX90614_I2C thermometer(/*uint8_t i2cAddr=*/MLX90614_I2C_ADDR, /*TwoWire *pWire = */&Wire, /*int sdaPin=*/SDA, /*int sclPin=*/SCL);
DFRobot_INA219_IIC wattmeter(&Wire, INA219_I2C_ADDRESS4);

// Revise the following two paramters according to actual reading of the INA219 and the multimeter
// for linearly calibration
float ina219Reading_mA = 1000;
float extMeterReading_mA = 1000;

void setup(void) 
{
    Serial.begin(9600);
    // Open the serial port
    while(!Serial);
    // Initialize the wattmeter
    while(wattmeter.begin() != true) {
        Serial.println("INA219 begin failed");
        delay(2000);
    }
    // Initialize the thermometer
    while( NO_ERR != thermometer.begin() ){
      Serial.println("Communication with device failed, please check connection");
      delay(3000);
    }

    // Linear calibration
    wattmeter.linearCalibrate(/*The measured current before calibration*/ina219Reading_mA, /*The current measured by other current testers*/extMeterReading_mA);
    
    /**
    * adjust sensor sleep mode
    * mode select to enter or exit sleep mode, it's enter sleep mode by default
    *      true is to enter sleep mode
    *      false is to exit sleep mode (automatically exit sleep mode after power down and restart)
    */  
    thermometer.enterSleepMode();
    delay(50);
    thermometer.enterSleepMode(false);
    delay(200);
}

void loop(void)
{
    // Header:
    // Bus Voltage (V), Shunt Voltage(mV), Current(mA), Power(mW), Ambient Temperatue(F), Object Temperature(F)
    Serial.print("<BEGIN>");
    Serial.print(wattmeter.getBusVoltage_V(), 2);
    Serial.print(",");
    Serial.print(wattmeter.getShuntVoltage_mV(), 3);
    Serial.print(",");
    Serial.print(wattmeter.getCurrent_mA(), 1);
    Serial.print(",");
    Serial.print(wattmeter.getPower_mW(), 1);
    Serial.print(",");
    Serial.print(thermometer.getAmbientTempCelsius()*9/5 + 32);
    Serial.print(",");
    Serial.print(thermometer.getObjectTempCelsius()*9/5 + 32);    
    Serial.println("<END>");
    delay(1000);
}
