#include <Wire.h>
#include "DFRobot_INA219.h"
#include "DFRobot_MLX90614.h"

#define MLX90614_I2C_ADDR 0x5A   // mlx9614 default I2C communication address

DFRobot_MLX90614_I2C thermometer(/*uint8_t i2cAddr=*/MLX90614_I2C_ADDR, /*TwoWire *pWire = */&Wire, /*int sdaPin=*/SDA, /*int sclPin=*/SCL);
DFRobot_INA219_IIC hydro_wattmeter(&Wire, INA219_I2C_ADDRESS4);
DFRobot_INA219_IIC solar_wattmeter(&Wire, INA219_I2C_ADDRESS2);
DFRobot_INA219_IIC wind_wattmeter(&Wire, INA219_I2C_ADDRESS1);

// Revise the following two paramters according to actual reading of the INA219 and the multimeter
// for linearly calibration
float ina219Reading_mA = 1000;
float extMeterReading_mA = 1000;

byte statusLed    = 13;
byte sensorInterrupt = 0;  // 0 = digital pin 2
byte sensorPin       = 2;

// The hall-effect flow sensor outputs approximately 4.5 pulses per second per
// litre/minute of flow.
float calibrationFactor = 4.5;

volatile byte pulseCount;  

float flowRate;
unsigned int flowMilliLitres;
unsigned long totalMilliLitres;

unsigned long oldTime;

void setup()
{
  
  // Initialize a serial connection for reporting values to the host
  Serial.begin(9600);
  while(!Serial);

  // Initialize the wattmeters
  while(solar_wattmeter.begin() != true) {
    Serial.println("Solar INA219 begin failed");
    delay(2000);
  }
  while(hydro_wattmeter.begin() != true) {
      Serial.println("Hydro INA219 begin failed");
      delay(2000);
  }
  while(wind_wattmeter.begin() != true) {
      Serial.println("Wind INA219 begin failed");
      delay(2000);
  }
  while(wind_wattmeter.begin() != true) {
      Serial.println("Wind INA219 begin failed");
      delay(2000);
  }
  // Initialize the thermometer
  while( NO_ERR != thermometer.begin() ){
    Serial.println("Communication with device failed, please check connection");
    delay(3000);
  }

  // Linear Calibration
  solar_wattmeter.linearCalibrate(/*The measured current before calibration*/ina219Reading_mA, /*The current measured by other current testers*/extMeterReading_mA);
  hydro_wattmeter.linearCalibrate(/*The measured current before calibration*/ina219Reading_mA, /*The current measured by other current testers*/extMeterReading_mA);
  wind_wattmeter.linearCalibrate(/*The measured current before calibration*/ina219Reading_mA, /*The current measured by other current testers*/extMeterReading_mA);

  // Set up the status LED line as an output
  pinMode(statusLed, OUTPUT);
  digitalWrite(statusLed, HIGH);  // We have an active-low LED attached
  
  pinMode(sensorPin, INPUT);
  digitalWrite(sensorPin, HIGH);

  pulseCount        = 0;
  flowRate          = 0.0;
  flowMilliLitres   = 0;
  totalMilliLitres  = 0;
  oldTime           = 0;

  // The Hall-effect sensor is connected to pin 2 which uses interrupt 0.
  // Configured to trigger on a FALLING state change (transition from HIGH
  // state to LOW state)
  attachInterrupt(sensorInterrupt, pulseCounter, FALLING);

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

/**
 * Main program loop
 */
void loop(void)
{
   
   if((millis() - oldTime) > 1000)    // Only process counters once per second
  { 
    // Disable the interrupt while calculating flow rate and sending the value to
    // the host
    detachInterrupt(sensorInterrupt);
        
    // Because this loop may not complete in exactly 1 second intervals we calculate
    // the number of milliseconds that have passed since the last execution and use
    // that to scale the output. We also apply the calibrationFactor to scale the output
    // based on the number of pulses per second per units of measure (litres/minute in
    // this case) coming from the sensor.
    flowRate = ((1000.0 / (millis() - oldTime)) * pulseCount) / calibrationFactor;
    
    // Note the time this processing pass was executed. Note that because we've
    // disabled interrupts the millis() function won't actually be incrementing right
    // at this point, but it will still return the value it was set to just before
    // interrupts went away.
    oldTime = millis();
    
    // Divide the flow rate in litres/minute by 60 to determine how many litres have
    // passed through the sensor in this 1 second interval, then multiply by 1000 to
    // convert to millilitres.
    flowMilliLitres = (flowRate / 60) * 1000;
    
    // Add the millilitres passed in this second to the cumulative total
    totalMilliLitres += flowMilliLitres;
      
    unsigned int frac;
    

    // Solar Bus (V), Solar (mA), Solar (mW), Ambient (F), Object (F), Hydro Bus (V), Hydro (mA), Hydro (mW), Flow Rate(L/min), Wind Bus (V), Wind (mA), Wind (mW),
    Serial.print("<BEGIN>");
    Serial.print(solar_wattmeter.getBusVoltage_V(), 2);
    Serial.print(",");
    Serial.print(solar_wattmeter.getCurrent_mA(), 1);
    Serial.print(",");
    Serial.print(solar_wattmeter.getPower_mW(), 1);
    Serial.print(",");
    Serial.print(thermometer.getAmbientTempCelsius()*9/5 + 32);
    Serial.print(",");
    Serial.print(thermometer.getObjectTempCelsius()*9/5 + 32);   
    Serial.print(",");
    Serial.print(hydro_wattmeter.getBusVoltage_V(), 2);
    Serial.print(",");
    Serial.print(hydro_wattmeter.getCurrent_mA(), 1);
    Serial.print(",");
    Serial.print(hydro_wattmeter.getPower_mW(), 1);
    Serial.print(",");
    Serial.print(int(flowRate));
    Serial.print(",");
    Serial.print(wind_wattmeter.getBusVoltage_V(), 2);
    Serial.print(",");
    Serial.print(wind_wattmeter.getCurrent_mA(), 1);
    Serial.print(",");
    Serial.print(wind_wattmeter.getPower_mW(), 1);
    Serial.println("<END>");

    // Reset the pulse counter so we can start incrementing again
    pulseCount = 0;
    
    // Enable the interrupt again now that we've finished sending output
    attachInterrupt(sensorInterrupt, pulseCounter, FALLING);
    delay(1000);
  }
}

/*
Interrupt Service Routine
 */
void pulseCounter()
{
  // Increment the pulse counter
  pulseCount++;
}