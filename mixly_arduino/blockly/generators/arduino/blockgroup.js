'use strict';

goog.provide('Blockly.Arduino.blockgroup');

goog.require('Blockly.Arduino');

Blockly.Arduino.serial_begin = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || profile.default.serial;
  Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+content+');';
  return '';
};

Blockly.Arduino.serial_write = function () {
    var serial_select = this.getFieldValue('serial_select');
    var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
    if (Blockly.Arduino.setups_['setup_serial_' + serial_select + profile.default.serial]) {
    } else {
        Blockly.Arduino.setups_['setup_serial_' + serial_select + profile.default.serial] = serial_select + '.begin(' + profile.default.serial + ');';
    }
    var code = serial_select + '.write(' + content + ');\n';
    return code;
};

Blockly.Arduino.serial_print = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.print('+content+');\n';
  return code;
};

Blockly.Arduino.serial_println = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.println('+content+');\n';
  return code;
};

Blockly.Arduino.serial_print_hex = function() {
  var serial_select = this.getFieldValue('serial_select');
  var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0'
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.println('+content+',HEX);\n';
  return code;
};

Blockly.Arduino.serial_available = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".available() > 0";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".readString()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_readstr_until = function() {
   var serial_select = this.getFieldValue('serial_select');
   var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var code =serial_select+".readStringUntil("+content+")";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_parseInt_Float = function() {
   var serial_select = this.getFieldValue('serial_select');
   if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
   }
   var dropdown_stat = this.getFieldValue('STAT');
   var code =serial_select+'.'+dropdown_stat+'()';
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.serial_flush = function() {
  var serial_select = this.getFieldValue('serial_select');
  if(Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial]){
  }else{
	Blockly.Arduino.setups_['setup_serial_'+serial_select+profile.default.serial] = serial_select+'.begin('+profile.default.serial+');';
  }
  var code = serial_select+'.flush();\n';
  return code;
};

Blockly.Arduino.serial_softserial = function () {
  var serial_select = this.getFieldValue('serial_select');
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'RX',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'TX',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_SoftwareSerial'] = '#include <SoftwareSerial.h>';
  Blockly.Arduino.definitions_['var_' + serial_select] = 'SoftwareSerial '+ serial_select+'(' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  return '';
};

Blockly.Arduino.ir_recv = function() {
   var variable = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['var_declare'+variable] = 'long '+variable+';';
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var branch = Blockly.Arduino.statementToCode(this, 'DO');
   var branch2 = Blockly.Arduino.statementToCode(this, 'DO2');
   var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   //Blockly.Arduino.definitions_['var_declare'+varName] = 'long '+varName+';\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+variable+'=results_'+dropdown_pin+'.value;\n';
   code += '  String type="UNKNOWN";\n';
   ////////////////////////////////////////////////////////////////
   code += '  String typelist[14]={"UNKNOWN", "NEC", "SONY", "RC5", "RC6", "DISH", "SHARP", "PANASONIC", "JVC", "SANYO", "MITSUBISHI", "SAMSUNG", "LG", "WHYNTER"};\n';
   code += '  if(results_'+dropdown_pin+'.decode_type>=1&&results_'+dropdown_pin+'.decode_type<=13){\n';
   code += '    type=typelist[results_'+dropdown_pin+'.decode_type];\n'
   code += '  }\n';
   code += '  Serial.print("IR TYPE:"+type+"  ");\n';
   code += branch;
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='} else {\n';
   code +=branch2;
   code +='}\n';
   return code;
};

Blockly.Arduino.serial_event = function() {
    var serial_select = this.getFieldValue('serial_select');
    var funcName = 'attachPinInterrupt_fun_' + serial_select;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void ' + serial_select.replace('Serial', 'serialEvent') + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
    return "";
};

Blockly.Arduino.ir_recv_enable = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>';
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var code='irrecv_'+dropdown_pin+'.enableIRIn();\n';
	return code;
}

Blockly.Arduino.ir_send_nec = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
	Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
	var data = Blockly.Arduino.valueToCode(this, 'data',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var bits = Blockly.Arduino.valueToCode(this, 'bits',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var type = this.getFieldValue('TYPE');
	var code='irsend.send'+type+'('+data+','+bits+');\n';
	/*
	for (var name in Blockly.Arduino.definitions_) {
		var def = Blockly.Arduino.definitions_[name];
		if (def.match(/^IRrecv irrecv_/)) {
			var tmp=def.substring(7,def.indexOf('('));
			code=code+tmp+'.enableIRIn();\n';
		}
	}*/
	return code;
}

Blockly.Arduino.ir_recv_raw = function() {
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
   Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
   if(Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial]){
   }else{
	 Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');'; 
   }
   Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
   var code="if (irrecv_"+dropdown_pin+".decode(&results_"+dropdown_pin+")) {\n"
   code += '  '+'dumpRaw(&results_'+dropdown_pin+');\n';
   code +='  irrecv_'+dropdown_pin+'.resume();\n'
   code +='}\n';
   var funcode='void dumpRaw(decode_results *results) {\n' 
	+ '  int count = results->rawlen;\n'
	+ '  Serial.print("RawData (");\n'
	+ '  Serial.print(count, DEC);\n'
	+ '  Serial.print("): ");\n'
	+ '  for (int i = 0; i < count; i++) {\n'
	+ '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
	+ '    if(i!=count-1){\n'
	+ '      Serial.print(",");\n'
	+ '    }\n'
	+ '  }\n'
	+ '  Serial.println("");\n'
	+ '}\n';
   Blockly.Arduino.definitions_['dumpRaw'] = funcode;
   return code;
};

Blockly.Arduino.ir_send_raw = function() {
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
	Blockly.Arduino.definitions_['var_ir_send'] = 'IRsend irsend;\n';
	var length = Blockly.Arduino.valueToCode(this, 'length',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var freq = Blockly.Arduino.valueToCode(this, 'freq',Blockly.Arduino.ORDER_ATOMIC) || '0';
	var text = this.getFieldValue('TEXT');
	var code='unsigned int buf_raw['+length+']={'+text+'};\n'
	code=code+'irsend.sendRaw(buf_raw,'+length+','+freq+');\n';
	return code;
}

Blockly.Arduino.i2c_master_writer = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
   var device = Blockly.Arduino.valueToCode(this, 'device',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var value = Blockly.Arduino.valueToCode(this, 'value',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var code ="Wire.beginTransmission("+device+");\n";
   code += "Wire.write("+value+");\n";
   code += "Wire.endTransmission();\n";
   return code;
};
Blockly.Arduino.i2c_master_reader = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
   var device = Blockly.Arduino.valueToCode(this, 'device',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var bytes = Blockly.Arduino.valueToCode(this, 'bytes',Blockly.Arduino.ORDER_ATOMIC) || '0';
   var code ="Wire.requestFrom("+device+", "+bytes+");\n";
   return code;
};
Blockly.Arduino.i2c_master_reader2 = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
   var code ="Wire.read()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_available = function() {
   Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
   Blockly.Arduino.setups_['setup_i2c'] = 'Wire.begin();';
   var code ="Wire.available()";
   return [code,Blockly.Arduino.ORDER_ATOMIC];
};
Blockly.Arduino.i2c_slave_onreceive = function() {
	var pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>\n';
	Blockly.Arduino.setups_['setup_i2c_'+pin] = 'Wire.begin('+pin+');';
	Blockly.Arduino.setups_['setup_i2c_onReceive_'+pin] = 'Wire.onReceive(i2cReceiveEvent_'+pin+');';
	var funcName = 'i2cReceiveEvent_' + pin;
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code2 = 'void' + ' ' + funcName + '(int howMany) {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code2;
	return '';
}

Blockly.Arduino.spi_transfer = function() {
   Blockly.Arduino.definitions_['define_spi'] = '#include <SPI.h>';
   Blockly.Arduino.setups_['setup_spi'] = 'SPI.begin();';
   var pin = Blockly.Arduino.valueToCode(this, 'pin',Blockly.Arduino.ORDER_ATOMIC);
   var value = Blockly.Arduino.valueToCode(this, 'value',Blockly.Arduino.ORDER_ATOMIC);
   Blockly.Arduino.setups_['setup_output_'+pin] = 'pinMode('+pin+', OUTPUT);';
   var code ="digitalWrite("+pin+", LOW);\n";
   code += "SPI.transfer("+value+");\n";
   code += "digitalWrite("+pin+", HIGH);\n";
   return code;
};

Blockly.Arduino.servo_move = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '0'
  //delay_time = delay_time.replace('(','').replace(')','');
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Arduino.servo_writeMicroseconds = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');'; 
  var code = 'servo_'+dropdown_pin+'.writeMicroseconds('+value_degree+');\n';
  return code;
};

Blockly.Arduino.servo_read_degrees = function() {
  var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  
  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');';
  
  var code = 'servo_'+dropdown_pin+'.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.tone_notes = function() {
  var code = this.getFieldValue('STAT');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_tone=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = ""; 
   if(window.isNaN(dropdown_pin)){
      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "tone("+dropdown_pin+","+fre+");\n";
   return code;
};

Blockly.Arduino.controls_tone2=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var fre = Blockly.Arduino.valueToCode(this, 'FREQUENCY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var dur = Blockly.Arduino.valueToCode(this, 'DURATION',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
   var code = ""; 
   if(window.isNaN(dropdown_pin)){
      code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
      Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "tone("+dropdown_pin+","+fre+","+dur+");\n";
   return code;
};

Blockly.Arduino.controls_notone=function(){
   var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
   var code='';
   if(window.isNaN(dropdown_pin)){
     code = code+'pinMode('+dropdown_pin+', OUTPUT);\n';
   }else{
     Blockly.Arduino.setups_['setup_output_'+dropdown_pin] = 'pinMode('+dropdown_pin+', OUTPUT);';
   }
   code += "noTone("+dropdown_pin+");\n";
   return code;
};

Blockly.Arduino.group_lcd_init = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['define_i2c_lcd'] = '#include <LiquidCrystal_I2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_'+varName] = 'LiquidCrystal_I2C '+varName+'('+device+','+TYPE+');';
  return '';
};

Blockly.Arduino.group_lcd_init2 = function() {
  var varName = this.getFieldValue('VAR');
  var TYPE = this.getFieldValue('TYPE');
  var device = Blockly.Arduino.valueToCode(this, 'device', Blockly.Arduino.ORDER_ATOMIC) || '0x27';
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_softi2c'] = '#include <SoftI2CMaster.h>';
  Blockly.Arduino.definitions_['define_softi2c_lcd'] = '#include <LiquidCrystal_SoftI2C.h>';
  Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] = 'LiquidCrystal_SoftI2C ' + varName + '(' + device + ',' + TYPE + ',' + dropdown_pin1 + ',' + dropdown_pin2 + ');';
  return '';
};

Blockly.Arduino.group_lcd_init3 = function () {
    var varName = this.getFieldValue('VAR');
    var TYPE = this.getFieldValue('TYPE');
    var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin5 = Blockly.Arduino.valueToCode(this, 'PIN5', Blockly.Arduino.ORDER_ATOMIC);
    var dropdown_pin6 = Blockly.Arduino.valueToCode(this, 'PIN6', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['define_lcd'] = '#include <LiquidCrystal.h>';
    Blockly.Arduino.definitions_['var_LiquidCrystal' + varName] = 'LiquidCrystal ' + varName + '(' + dropdown_pin1 + ',' + dropdown_pin2 + ',' + dropdown_pin3 + ',' + dropdown_pin4 + ',' + dropdown_pin5 + ',' + dropdown_pin6 + ');';
    Blockly.Arduino.setups_['setup_lcd_begin_' + varName] = varName + '.begin('+TYPE+');';
   
    return '';
};

Blockly.Arduino.group_lcd_print = function() {
  var varName = this.getFieldValue('VAR');
  var str1 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  var str2 = Blockly.Arduino.valueToCode(this, 'TEXT2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  //var str3 = Blockly.Arduino.valueToCode(this, 'TEXT3', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  //var str4 = Blockly.Arduino.valueToCode(this, 'TEXT4', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.setCursor(0, 0);\n'
  code+=varName+'.print('+str1+');\n';
  code+=varName+'.setCursor(0, 1);\n';
  code+=varName+'.print('+str2+');\n';  
  //code+=varName+'.setCursor(0, 2);\n';
  //code+=varName+'.print('+str3+');\n';
  //code+=varName+'.setCursor(0, 3);\n';
  //code+=varName+'.print('+str4+');\n';
  return code;
};

Blockly.Arduino.group_lcd_print2 = function() {
  var varName = this.getFieldValue('VAR');
  var str = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_ATOMIC) || 'String(\"\")';
  var row = Blockly.Arduino.valueToCode(this, 'row', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var column = Blockly.Arduino.valueToCode(this, 'column', Blockly.Arduino.ORDER_ATOMIC) || '1';
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.setCursor('+column+'-1, '+row+'-1);\n'
  code+=varName+'.print('+str+');\n';
  return code;
};

Blockly.Arduino.group_lcd_power = function() {
  var varName = this.getFieldValue('VAR');
  var dropdown_stat = this.getFieldValue('STAT');
  if (Blockly.Arduino.definitions_['var_LiquidCrystal_SoftI2C_' + varName] || Blockly.Arduino.definitions_['var_LiquidCrystal_I2C_' + varName]) {
      Blockly.Arduino.setups_['setup_lcd_init_' + varName] = varName + '.init();';
      Blockly.Arduino.setups_['setup_lcd_backlight_' + varName] = varName + '.backlight();';
  }
  var code = varName+'.'+dropdown_stat+'();\n'
  return code;
};

Blockly.Arduino.group_stepper_setup = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_setup2 = function() {
  var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'),Blockly.Variables.NAME_TYPE);
  var dropdown_pin1 = Blockly.Arduino.valueToCode(this, 'PIN1',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin2 = Blockly.Arduino.valueToCode(this, 'PIN2',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin3 = Blockly.Arduino.valueToCode(this, 'PIN3',Blockly.Arduino.ORDER_ATOMIC);
  var dropdown_pin4 = Blockly.Arduino.valueToCode(this, 'PIN4',Blockly.Arduino.ORDER_ATOMIC);
  var steps = Blockly.Arduino.valueToCode(this, 'steps',Blockly.Arduino.ORDER_ATOMIC);
  var speed = Blockly.Arduino.valueToCode(this, 'speed',Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
  Blockly.Arduino.definitions_['var_stepper'+varName] = 'Stepper '+varName+'('+steps+','+dropdown_pin1+','+dropdown_pin2+','+dropdown_pin3+','+dropdown_pin4+');';
  Blockly.Arduino.setups_['setup_stepper'+varName] = varName+'.setSpeed('+speed+');';
  return '';
};

Blockly.Arduino.group_stepper_move = function () {
    var varName = Blockly.Arduino.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var step = Blockly.Arduino.valueToCode(this, 'step', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['define_stepper'] = '#include <Stepper.h>';
    return varName + '.step(' + step + ');\n';
};
/*
Blockly.Arduino.lp2i_u8g_draw_string = function () {
    var value_text = Blockly.Arduino.valueToCode(this, 'Text', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    + 'do {\n'
    + '    String tmpstr='+value_text+';\n'
    + '    char tempcs[sizeof(tmpstr)];\n'
    + '    tmpstr.toCharArray(tempcs, sizeof(tempcs));\n'
    + '    u8g.drawStr(' + x + ', ' + y + ', tempcs);\n'
    + '}\n' 
    + 'while( u8g.nextPage() );\n';
    return code;
};
*/
Blockly.Arduino.lp2i_u8g_draw_4strings = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    + 'do {\n'
    + '    u8g.setPrintPos(0,14);\n'
    + '    u8g.print(' + value_text_line1 + ');\n'
    + '    u8g.setPrintPos(0,30);\n'
    + '    u8g.print(' + value_text_line2 + ');\n'
    + '    u8g.setPrintPos(0,46);\n'
    + '    u8g.print(' + value_text_line3 + ');\n'
    + '    u8g.setPrintPos(0,62);\n'
    + '    u8g.print(' + value_text_line4 + ');\n'
    + '}\n'
    +'while( u8g.nextPage() );\n';
    return code;
};

Blockly.Arduino.lp2i_u8g_print = function () {
    var value_n = Blockly.Arduino.valueToCode(this, 'N', Blockly.Arduino.ORDER_ATOMIC);
    var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_ATOMIC);
    var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
      'u8g.firstPage();\n'
      + '  do {\n'
      + '      u8g.setFont(u8g_font_unifont);\n'
      + '  } while( u8g.nextPage());\n'
      + '  delay(1000);\n';
    var code =
      'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.setPrintPos(' + x + ', ' + y + ');\n'
    code += '       u8g.print(' + value_n + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.lp2i_u8g_4draw_print = function () {
    var value_text_line1 = Blockly.Arduino.valueToCode(this, 'Text_line1', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line2 = Blockly.Arduino.valueToCode(this, 'Text_line2', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line3 = Blockly.Arduino.valueToCode(this, 'Text_line3', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_text_line4 = Blockly.Arduino.valueToCode(this, 'Text_line4', Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var value_n1 = Blockly.Arduino.valueToCode(this, 'N1', Blockly.Arduino.ORDER_ATOMIC);
    var value_n2 = Blockly.Arduino.valueToCode(this, 'N2', Blockly.Arduino.ORDER_ATOMIC);
    var value_n3 = Blockly.Arduino.valueToCode(this, 'N3', Blockly.Arduino.ORDER_ATOMIC);
    var value_n4 = Blockly.Arduino.valueToCode(this, 'N4', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_["define_u8g"] = '#include <U8glib.h>\n U8GLIB_SSD1306_128X64 u8g(U8G_I2C_OPT_DEV_0|U8G_I2C_OPT_NO_ACK|U8G_I2C_OPT_FAST);\n';
    //dans le setup    
    Blockly.Arduino.setups_["setup_u8g"] =
       'u8g.firstPage();\n'
      + '   do {\n'
      + '       u8g.setFont(u8g_font_unifont);\n'
      + '       u8g.drawStr( 0, 22, "Bonjour !");\n'
      + '   } while( u8g.nextPage());\n'
      + '   delay(1000);\n';
    var code = 'u8g.firstPage();\n'
    code += '   do {\n'
    code += '       u8g.drawStr(0, 12, ' + value_text_line1 + ');\n'
    code += '       u8g.setPrintPos(100, 12 );\n'
    code += '       u8g.print(' + value_n1 + ');\n'
    code += '       u8g.drawStr(0, 28, ' + value_text_line2 + ');\n'
    code += '       u8g.setPrintPos(100, 28 );\n'
    code += '       u8g.print(' + value_n2 + ');\n'
    code += '       u8g.drawStr(0, 44, ' + value_text_line3 + ');\n'
    code += '       u8g.setPrintPos(100, 44 );\n'
    code += '       u8g.print(' + value_n3 + ');\n'
    code += '       u8g.drawStr(0, 60, ' + value_text_line4 + ');\n'
    code += '       u8g.setPrintPos(100, 60 );\n'
    code += '       u8g.print(' + value_n4 + ');\n'
    code += '   }\n while( u8g.nextPage() );\n';
    return code;
};
Blockly.Arduino.display_rgb_init=function(){
    var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    var value_ledcount = Blockly.Arduino.valueToCode(this, 'LEDCOUNT', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
    Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
    Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin +  '(' + value_ledcount + ');';
    Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
    Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
    return '';
};
Blockly.Arduino.display_rgb=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var value_rvalue = Blockly.Arduino.valueToCode(this, 'RVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_gvalue = Blockly.Arduino.valueToCode(this, 'GVALUE', Blockly.Arduino.ORDER_ATOMIC);
  var value_bvalue = Blockly.Arduino.valueToCode(this, 'BVALUE', Blockly.Arduino.ORDER_ATOMIC);
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+value_rvalue+','+value_gvalue+','+value_bvalue+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_rgb2=function(){
  var dropdown_rgbpin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
  var value_led = Blockly.Arduino.valueToCode(this, '_LED_', Blockly.Arduino.ORDER_ATOMIC);
  var colour_rgb_led_color = this.getFieldValue('RGB_LED_COLOR');
  var color = goog.color.hexToRgb(colour_rgb_led_color);
  Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
  Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
  if (!Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin]) {
      Blockly.Arduino.definitions_['var_rgb_display' + dropdown_rgbpin] = 'Adafruit_NeoPixel  rgb_display_' + dropdown_rgbpin + '' + '(4);';
      Blockly.Arduino.setups_['setup_rgb_display_begin_' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.begin();';
      Blockly.Arduino.setups_['setup_rgb_display_setpin' + dropdown_rgbpin] = 'rgb_display_' + dropdown_rgbpin + '.setPin(' + dropdown_rgbpin + ');';
  }
  var code = 'rgb_display_'+dropdown_rgbpin+'.setPixelColor('+value_led+'-1, '+color+');\n';
  code+='rgb_display_'+dropdown_rgbpin+'.show();\n';
  return code;
};

Blockly.Arduino.display_4digitdisplay_power=function(){
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.'+stat+'();\n';
}
Blockly.Arduino.display_4digitdisplay_displayString=function(){
	var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.displayString('+value+');\n';
}
Blockly.Arduino.display_4digitdisplay_showDot=function(){
	var no=this.getFieldValue("NO");
	var stat=this.getFieldValue("STAT");
	Blockly.Arduino.definitions_['define_i2c'] = '#include <Wire.h>';
	Blockly.Arduino.definitions_['include_display'] = '#include "Mixly.h"';
	Blockly.Arduino.definitions_['var_display_4display'] = 'TM1650 tm_4display;';
	Blockly.Arduino.setups_['setup_wire_begin'] ='Wire.begin();';
	Blockly.Arduino.setups_['setup_display_4display_init'] ='tm_4display.init();';
	return 'tm_4display.setDot('+no+','+stat+');\n';
}
Blockly.Arduino.display_TM1637_init = function () {
    var CLK = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC);
    var DIO = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_tm1637'] = '#include <TM1637.h>';
    Blockly.Arduino.definitions_['var_tm1637'] = 'TM1637 tm1637(' + CLK + ',' + DIO + ');';
    Blockly.Arduino.setups_['setup_tm1637_init'] = ' tm1637.init();\n';
    return '';
};

Blockly.Arduino.display_TM1637_displayString = function () {
    var Speed = Blockly.Arduino.valueToCode(this, 'Speed', Blockly.Arduino.ORDER_ATOMIC);
    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
     var code = 'int8_t NumTab[]={';
    for (var i = 1; i + 1 < value.length; i++) {
        if (value[i].toLowerCase().charCodeAt() > 96 && value[i].toLowerCase().charCodeAt() < 103)
             code += (value[i].toLowerCase().charCodeAt() - 87);
        else if (value[i].toLowerCase().charCodeAt() > 47 && value[i].toLowerCase().charCodeAt() < 58)
            code += (value[i].toLowerCase().charCodeAt() - 48);
        if (i + 2 < value.length) code += ',';
      }
    code += '};'
    code += '\nint8_t ListDisp[4];\n int8_t run=1;\nunsigned char i = 0;\n  unsigned char count = 0;\ndelay(150);';
    code += ' while(run)\n{\n';
    code += 'i = count;\ncount++;\nif(sizeof(NumTab)<5)\nrun=0;\n';
    code += 'if(count == sizeof(NumTab)) \ncount = 0;\n';
    code += ' for(unsigned char BitSelect = 0;BitSelect <  sizeof(NumTab);BitSelect ++)\n';
    code += '{\nListDisp[BitSelect] = NumTab[i];\n';
    code += ' i++;\nif(i == sizeof(NumTab))\n i = 0;\n';
    code += '}\nfor(unsigned char k = 0;k <sizeof(NumTab);k ++)\n{\ntm1637.display(k,ListDisp[k]);\n};\n';
    code += 'delay(' + Speed + ');\n}\n';
    return code;
};

Blockly.Arduino.display_TM1637_displayTime = function () {
    var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
    var hour = Blockly.Arduino.valueToCode(this, 'hour', Blockly.Arduino.ORDER_ATOMIC);
    var minute = Blockly.Arduino.valueToCode(this, 'minute', Blockly.Arduino.ORDER_ATOMIC);
    var second = Blockly.Arduino.valueToCode(this, 'second', Blockly.Arduino.ORDER_ATOMIC);
    Blockly.Arduino.definitions_['include_timerone'] = '#include <TimerOne.h>';
    Blockly.Arduino.definitions_['definitions_on_off'] = '#define ON 1\n#define OFF 0\n';
    Blockly.Arduino.definitions_['definitions_TimeDisp'] = 'int8_t TimeDisp[] = {0x00,0x00,0x00,0x00};\nunsigned char ClockPoint = 1;\nunsigned char Update;\nunsigned char halfsecond = 0;\nunsigned char second=' + second + ';\nunsigned char minute = ' + minute + ';\nunsigned char hour = ' + hour + ';\n';
    Blockly.Arduino.definitions_['void_TimingISR'] = 'void TimingISR()\n{\nhalfsecond ++;\nUpdate=ON;\nif(halfsecond == 2){\nsecond ++;\nif(second==60)\n{\nminute ++;\nif(minute == 60){\nhour ++;\nif(hour == 24)\nhour = 0;\nminute = 0;\n}\nsecond = 0;\n}\nhalfsecond = 0;\n}\nClockPoint=(~ClockPoint) & 0x01;\n}';
    Blockly.Arduino.definitions_['void_TimeUpdate'] = ' void TimeUpdate(void){  if(ClockPoint)tm1637.point(POINT_ON);  else tm1637.point(POINT_OFF);   TimeDisp[0] = hour / 10;  TimeDisp[1] = hour % 10;  TimeDisp[2] = minute / 10;  TimeDisp[3] = minute % 10;  Update = OFF;}';
    Blockly.Arduino.setups_['setup_tm1637_init'] = 'tm1637.init();\nTimer1.initialize(500000);\n  Timer1.attachInterrupt(TimingISR);\n ';
    var code = ' if(Update == ON){TimeUpdate();tm1637.display(TimeDisp);}';
    return code;
};

Blockly.Arduino.display_TM1637_Stopwatch = function () {
    var STAT = this.getFieldValue('STAT');
    Blockly.Arduino.definitions_['include_EEPROM'] = '#include <EEPROM.h>';
    Blockly.Arduino.definitions_['include_timerone'] = '#include <TimerOne.h>';
    Blockly.Arduino.definitions_['include_pgmspace'] = '#include <avr/pgmspace.h>';
    Blockly.Arduino.definitions_['definitions_on_off'] = '#define ON 1\n#define OFF 0\n';

    Blockly.Arduino.definitions_['definitions_TimeDisp'] = 'int8_t TimeDisp[] = {0x00,0x00,0x00,0x00};\nunsigned char ClockPoint = 1;\nunsigned char Update;\nunsigned char microsecond_10 = 0;\nunsigned char second;\nunsigned char _microsecond_10 = 0;\nunsigned char _second;\nunsigned int eepromaddr;\nboolean Flag_ReadTime;\n';

    Blockly.Arduino.definitions_['void_TimingISR2'] = 'void TimingISR2()\n{\nmicrosecond_10 ++;\nUpdate = ON;\nif(microsecond_10 == 100)\n{\nsecond ++;\nif(second == 60)\n{\nsecond = 0;\n}\nmicrosecond_10 = 0; \n}\nClockPoint =(~ClockPoint) & 0x01;\nif(Flag_ReadTime == 0) \n {_microsecond_10 = microsecond_10;\n_second = second;  }\n}\n';

    Blockly.Arduino.definitions_['void_TimeUpdate2'] = 'void TimeUpdate2(void)\n{\nif(ClockPoint)tm1637.point(POINT_ON);\nelse tm1637.point(POINT_OFF);\nTimeDisp[2] = _microsecond_10 / 10;\nTimeDisp[3] = _microsecond_10 % 10;\nTimeDisp[0] = _second / 10;\nTimeDisp[1]= _second % 10;\nUpdate = OFF;\n}\n';

    Blockly.Arduino.definitions_['void_stopwatchStart'] = 'void stopwatchStart()\n{\n  Flag_ReadTime = 0;\nTCCR1B |=Timer1.clockSelectBits; \n}\n';
    Blockly.Arduino.definitions_['void_stopwatchPause'] = 'void stopwatchPause()\n{\nTCCR1B &= ~(_BV(CS10) | _BV(CS11) | _BV(CS12));\n}\n';

    Blockly.Arduino.definitions_['void_stopwatchReset'] = 'void stopwatchReset()\n{\n stopwatchPause();\nFlag_ReadTime = 0;\n_microsecond_10 = 0;\n_second = 0;\nmicrosecond_10 = 0;\nsecond = 0;\nUpdate = ON;\n}\n';
    Blockly.Arduino.definitions_['void_saveTime'] = 'void saveTime()\n{EEPROM.write(eepromaddr ++,microsecond_10);\nEEPROM.write(eepromaddr ++,second);\n}\n';

    Blockly.Arduino.definitions_['void_readTime'] = 'void readTime(){\nFlag_ReadTime = 1;\nif(eepromaddr == 0)\n{\nSerial.println("The time had been read");\n_microsecond_10 = 0;\n _second = 0;\n}\nelse{\n_second = EEPROM.read(-- eepromaddr);\n_microsecond_10 = EEPROM.read(-- eepromaddr);\nSerial.println("List the time");\n}\nUpdate = ON;\n}';

    Blockly.Arduino.setups_['setup_tm1637_stopwatch'] = '  tm1637.set();\n tm1637.init();\nTimer1.initialize(10000);\n  Timer1.attachInterrupt(TimingISR2);\n ';

    var code = STAT + '();\n';
    code += 'if(Update == ON)\n{\nTimeUpdate2();\ntm1637.display(TimeDisp);\n}';
    return code;
};

Blockly.Arduino.display_TM1637_Brightness = function () {
    var BRIGHTNESS = this.getFieldValue('BRIGHTNESS');
    var code = ' tm1637.set(' + BRIGHTNESS + ');\n';
    return code;
};