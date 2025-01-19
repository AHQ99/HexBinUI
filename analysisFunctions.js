//convert from hex to binary
function hex2bin(x) {
    let z = "";
    for (let i = 0; i < x.length; i++) {
        switch (x[i]) {
            case "0":
                z += "0000";
                break;
            case "1":
                z += "0001";
                break;
            case "2":
                z += "0010";
                break;
            case "3":
                z += "0011";
                break;
            case "4":
                z += "0100";
                break;
            case "5":
                z += "0101";
                break;
            case "6":
                z += "0110";
                break;
            case "7":
                z += "0111";
                break;
            case "8":
                z += "1000";
                break;
            case "9":
                z += "1001";
                break;
            case "A":
                z += "1010";
                break;
            case "B":
                z += "1011";
                break;
            case "C":
                z += "1100";
                break;
            case "D":
                z += "1101";
                break;
            case "E":
                z += "1110";
                break;
            case "F":
                z += "1111";
                break;
        }
    }
    return z;
}
// binary to hex
function bin2hex(x) {
    let z = "";
    x = [x.slice(0, 4), x.slice(4, 8), x.slice(8, 12), x.slice(12)];
    for (let i = 0; i < x.length; i++) {
        switch (x[i]) {
            case "0000":
                z += "0";
                break;
            case "0001":
                z += "1";
                break;
            case "0010":
                z += "2";
                break;
            case "0011":
                z += "3";
                break;
            case "0100":
                z += "4";
                break;
            case "0101":
                z += "5";
                break;
            case "0110":
                z += "6";
                break;
            case "0111":
                z += "7";
                break;
            case "1000":
                z += "8";
                break;
            case "1001":
                z += "9";
                break;
            case "1010":
                z += "A";
                break;
            case "1011":
                z += "B";
                break;
            case "1100":
                z += "C";
                break;
            case "1101":
                z += "D";
                break;
            case "1110":
                z += "E";
                break;
            case "1111":
                z += "F";
                break;
        }
    }
    return z;
}

function addrssing_Mode(opcode) {
    let isInstruction_Memory_reference = false;

    switch (opcode) {
        case "000":
        case "001":
        case "010":
        case "011":
        case "100":
        case "101":
        case "110":
            isInstruction_Memory_reference = true;
            break;
    }
    if (isInstruction_Memory_reference)
        return true;
    else
        return false;
}

function isInstructionMemoryReference(isInstructionMemory, iBit) {
    let addressingMode;
    let Instruction_Category;
    if (isInstructionMemory) {
        Instruction_Category = "Memory Reference Instruction";
        //direct
        if (iBit == '0') {
            addressingMode = 'direct';
        }
        //indirect
        else {
            addressingMode = 'indirect';
        }
    }
    // I/O Memory Reference OR Register-Memory Reference
    else {
        //check if Regester-Memory Reference
        if (iBit == '0') {
            addressingMode = '?';
            Instruction_Category = "Register Reference Instruction";
        }
        //check if Input/Output-Memory Reference
        else {
            addressingMode = '?';
            Instruction_Category = "Input/Output Reference Instruction";
        }
    }
    return [Instruction_Category, addressingMode];
}
function memoryInstructions(opcode) {
    let instructionName;
    switch (opcode) {
        case '000':
            instructionName = "AND";
            break;
        case "001":
            instructionName = "ADD";
            break;
        case "010":
            instructionName = "LDA";
            break;
        case "011":
            instructionName = "STA";
            break;
        case "100":
            instructionName = "BUN";
            break;
        case "101":
            instructionName = "BSA";
            break;
        case "110":
            instructionName = "ISZ";
            break;
    }
    return instructionName;
}
function registerInstructions(address) {
    address = bin2hex(address);
    let instructionName;
    switch (address) {
        case "800":
            instructionName = "CLA";
            break;
        case "400":
            instructionName = "CLE";
            break;
        case "200":
            instructionName = "CMA";
            break;
        case "100":
            instructionName = "CME";
            break;
        case "080":
            instructionName = "CIR";
            break;
        case "040":
            instructionName = "CIL";
            break;
        case "020":
            instructionName = "INC";
            break;
        case "010":
            instructionName = "SPA";
            break;
        case "008":
            instructionName = "SNA";
            break;
        case "004":
            instructionName = "SZA";
            break;
        case "002":
            instructionName = "SZE";
            break;
        case "001":
            instructionName = "HLT";
            break;
    }
    return instructionName;
}
function inputOutputInstructions(address) {
    address = bin2hex(address);
    let instructionName;
    switch (address) {
        case "800":
            instructionName = "INP";
            break;
        case "400":
            instructionName = "OUT";
            break;
        case "200":
            instructionName = "SKI";
            break;
        case "100":
            instructionName = "SKO";
            break;
        case "080":
            instructionName = "ION";
            break;
        case "040":
            instructionName = "IOF";
            break;
    }
    return instructionName;
}
function getInstruction(addrssing_Mode, opcode, address) {
    switch (addrssing_Mode) {
        case "Memory Reference Instruction":
            instruction = memoryInstructions(opcode);
            break;
        case "Register Reference Instruction":
            instruction = registerInstructions(address);
            break;
        case "Input/Output Reference Instruction":
            instruction = inputOutputInstructions(address);
            break;
    }
    return instruction;
}