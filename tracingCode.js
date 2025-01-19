function T0(){
    Register.AR = Register.PC;
    Register.SC++;
}

function T1(){
    Register.IR = Memory[Register.AR];
    Register.PC = increment(Register.PC,12);
    Register.SC++;
}

function T2(){
    Register.IR = hex2bin(Register.IR);
    var iBit = Register.IR[0];
    var opcode = Register.IR.slice(1, 4);
    var IR0_11 = Register.IR.slice(4);
    Register.AR = bin2hex(IR0_11);
    Register.SC++;
    Register.IR = bin2hex(Register.IR);
    return [iBit, opcode];
}


function T3_Memory(){
    Register.AR = Memory[Register.AR];
    Register.AR = Register.AR.slice(1,4);
    Register.SC++;
}
function T3_Register(instruction){
    switch(instruction){
        case "CLA":
            CLA();
            break;
        case "CLE":
            CLE();
            break;
        case "CMA":
            CMA();
            break;
        case "CME":
            CME();
            break;
        case "CIR":
            CIR();
            break;
        case "CIL":
            CIL();
            break;
        case "INC":
            INC();
            break;
        case "SPA":
            SPA();
            break;
        case "SNA":
            SNA();
            break;
        case "SZA":
            SZA();
            break;
        case "SZE":
            SZE();
            break;
        case "HLT":
            HLT();
            break;
    }
}
function T3_INPUT_OUTPUT(instruction){
    switch(instruction){
        case "INP":
            INP();
            break;
        case "OUT":
            OUT();
            break;
        case "SKI": 
            SKI();
            break;
        case "SKO":
            SKO();
            break;
        case "INO":
            ION();
            break;
        case "IOF":
            IOF();
            break;
    }
}

function T4(instruction){
    switch(instruction){
        case "AND":
            AND_D0T4();
            break;

        case "ADD":
            ADD_D1T4();
            break;

        case "LDA":
            LDA_D2T4();
            break;

        case "STA":
            STA_D3T4();
            break;

        case "BUN":
            BUN_D4T4();
            break;

        case "BSA":
            BSA_D5T4();
            break;

        case "ISZ":
            ISZ_D6T4();
            break;    
    }
}
function T5(instruction){
    switch(instruction){
        case "AND":
            AND_D0T5();
            break;

        case "ADD":
            ADD_D1T5();
            break;

        case "LDA":
            LDA_D2T5();
            break;

        case "BSA":
            BSA_D5T5();
            break;

        case "ISZ":
            ISZ_D6T5();
            break;
    }
}
