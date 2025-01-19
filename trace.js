// IT increments Binary numbers of 12-16 bits
function increment(value, Bits){
    //if value = FFFF we increment it by reset the value to 0000
    if(value =='FFFF'){
        value = '0000';
        return value;
    }
    else if(value == 'FFF'){
        value = '000';
    }
    else{
        value = [...(parseInt(value,16)+1).toString(2)];
        while (value.length != Bits )
        {
            value.unshift("0");
        }
        value =value.join("");
    }
    return bin2hex(value);
}
function sum(value1,value2){
    value1 = [...(parseInt(value1,16)+parseInt(value2,16)).toString(2)];
    while (value1.length < 16 )
    {
        value1.unshift("0");
    }
    value1 =value1.join("");    
    if(value1.length == 17){
        value1 = value1.slice(1);
        Register.E = '1';
    }
    return bin2hex(value1);
}


//Memory Reference Instructions
function AND_D0T4(){
    Register.DR = Memory[Register.AR];
    Register.SC++;
}
function AND_D0T5(){
    var arrAC = [...hex2bin(Register.AC)];
    var arrDR = [...hex2bin(Register.DR)];

    for(i=0; i<arrAC.length;i++){
        if(arrAC[i] == '1' && arrDR[i] == '1')
            arrAC[i] = '1';
        else
            arrAC[i] = '0';
    }
    arrAC = arrAC.join("");
    Register.AC = bin2hex(arrAC);

    Register.SC = 0;
}

function ADD_D1T4(){
    Register.DR = Memory[Register.AR];
    Register.SC++;
}

function ADD_D1T5(){
    Register.AC = sum(Register.AC,Register.DR);
    Register.SC = 0;
}

function LDA_D2T4(){
    Register.DR = Memory[Register.AR];
    Register.SC++;

}
function LDA_D2T5(){
    Register.AC = Register.DR;
    Register.SC = 0;
}

function STA_D3T4(){
    Memory[Register.AR] = Register.AC;
    Register.SC = 0;

}

function BUN_D4T4()
{
    Register.PC = Register.AR;
    Register.SC = 0;
}

function BSA_D5T4()
{
    Memory[Register.AR] = '0' + Register.PC;

    Register.AR = increment(Register.AR, 12);
    Register.SC++;
}

function BSA_D5T5()
{
    Register.PC = Register.AR;
    Register.SC = 0;

}

function ISZ_D6T4()
{
    Register.DR = Memory[Register.AR];
    Register.SC++;
}

function ISZ_D6T5()
{
    Register.DR = increment(Register.DR, 16);
    Register.SC++;
}

function ISZ_D6T6()
{
    Memory[Register.AR] = Register.DR;
    if(Register.DR == '0000'){
        Register.PC = increment(Register.PC, 12);
    }
        Register.SC = 0;    
}

//Register Reference Instructions
function CLA(){
    Register.AC = '0000';
    Register.SC = 0;
}

function CLE(){
    Register.E = '0';
    Register.SC = 0;

}

function CMA(){
    var arrAC = [...hex2bin(Register.AC)];
    for(i=0;i<arrAC.length;i++){
        if(arrAC[i]=='1')
            arrAC[i]='0';
        else
            arrAC[i]='1';
    }
    arrAC = arrAC.join("");
    Register.AC = bin2hex(arrAC);
    Register.SC = 0;
}

function CME(){
    if(Register.E =='0')
    Register.E ='1';
    else Register.E = '0';
    SC = 0;
}

function CIR(){
    Register.AC = hex2bin(Register.AC);
    var Ebit = Register.AC[15];
    var cir = Register.E +  Register.AC.slice(0,15);
    Register.E = Ebit;    
    Register.AC = cir;
    Register.SC = 0;
    Register.AC = bin2hex(Register.AC);
}

function CIL(){
    Register.AC = hex2bin(Register.AC);
    var Ebit = Register.AC[0];
    var cil =  Register.AC.slice(1,16)+Register.E;
    Register.E = Ebit;
    Register.AC = cil;
    Register.SC = 0;
    Register.AC = bin2hex(Register.AC);   
}

function INC(){
    if(Register.AC == 'FFFF')
        Register.E = '1';
    Register.AC = increment(Register.AC, 16);

    Register.SC =0;

}

function SPA(){
    if(Register.AC[0]=='0'){
        Register.PC = increment(Register.PC, 12);
    }
    Register.SC = 0;
}

function SNA(){
    if(Register.AC[0]=='1'){
        Register.PC = increment(Register.PC, 12);
    }
    Register.SC = 0;
}

function SZA(){
    if(Register.AC=='0000000000000000'){
        Register.PC = increment(Register.PC, 12);
    }
    Register.SC = 0;
}

function SZE(){
    if(Register.E=='0'){
        Register.PC = increment(Register.PC, 12);
    }
    Register.SC = 0;
}

function HLT(){
    Register.S=0;
    Register.SC = 0;
}

//Input Output Reference Instructions 

function INP(){ //not finished yet
    // Register.AC = Register.INPR;

    Register.FGI = 0;
    Register.SC = 0;
}

function OUT(){
    Register.OUTER = Register.AC.slice(8);
    Register.FGO = 0;
    Register.SC = 0;
}

function SKI(){
    if(Register.FGI == 1){
        Register.PC = increment(Register.PC, 12);

    }
    Register.SC = 0;
}

function SKO(){
    if(Register.FGO == 1){
        Register.PC = increment(Register.PC, 12);
    }
    Register.SC = 0;
}
function ION(){
    Register.IEN = 1
    Register.SC = 0;
}
function IOF(){
    Register.IEN = 0;
    Register.SC = 0;
}