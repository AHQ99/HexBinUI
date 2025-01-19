let Memory = {
    ["100"]: "",
    ["101"]: "",

    ["102"]: "",

    ["103"]: "",

    ["104"]: "",

    ["105"]: "",

    ["106"]: "",

    ["107"]: "",

    ["108"]: "",

    ["109"]: "",

    ["10A"]: "",

    ["10B"]: "",

    ["10C"]: "",

    ["10D"]: "",

    ["10E"]: "",

    ["10F"]: "",

    ["110"]: "",

    ["111"]: "",

    ["112"]: "",

    ["113"]: "",

    ["114"]: ""
}
let Register = {
    PC : "100",
    AR : "",
    DR : "",
    AC : "",
    IR : "",
    SC : 0,
    E : '0',
    
    INPR: "",
    FGI: 0,
    OUTER: "",
    FGO: 1,
    IEN : 0,
    
    S : 1
}

function memoryValues(values){
    Memory["100"] = values[0].value;
    Memory["101"] = values[1].value;
    Memory["102"] = values[2].value;
    Memory["103"] = values[3].value;
    Memory["104"] = values[4].value;
    Memory["105"] = values[5].value;
    Memory["106"] = values[6].value;
    Memory["107"] = values[7].value;
    Memory["108"] = values[8].value;
    Memory["109"] = values[9].value;
    Memory["10A"] = values[10].value;
    Memory["10B"] = values[11].value;
    Memory["10C"] = values[12].value;
    Memory["10D"] = values[13].value;
    Memory["10E"] = values[14].value;
    Memory["10F"] = values[15].value;
    Memory["110"] = values[16].value;
    Memory["111"] = values[17].value;
    Memory["112"] = values[18].value;
    Memory["113"] = values[19].value;
    Memory["114"] = values[20].value;
}