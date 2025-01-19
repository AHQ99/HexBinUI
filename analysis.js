var array = []; //to push the functions into the keylistener
var array2 = []; // to push the values of regeters and momory into the functions
var counter2 = 0; // to count the row of the vlaues
var functionCounter = 0; //to count the function it should display
var arrayDisplayCounter = 1; //Counts the heddin tables and diplay them


//select the button
var con = document.instructions.convert;
//add Event listener when the uesr click the button it will do the
//following
con.addEventListener('click', function () {
    let orginal = document.getElementsByClassName('orginalInstruction');
    let instructionType = document.getElementsByClassName("instruction");
    let num = document.querySelectorAll("form input");
    let Binray = document.getElementsByClassName('BinrayInstruction');
    let iBit = document.getElementsByClassName('iBit');
    let opcode = document.getElementsByClassName("opcode");
    let address = document.getElementsByClassName("address");
    let InstructionCategory = document.getElementsByClassName("InstructionCategory");
    let Addressingmode = document.getElementsByClassName("Addressingmode");

    for (let i = 0; i < orginal.length; i++) {
        orginal[i].innerHTML = `<td>instruction ${i + 1}: ` + num[i].value + "</td>";
        Binray[i].textContent = hex2bin(num[i].value);
        iBit[i].textContent = Binray[i].textContent.slice(0, 1);
        opcode[i].textContent = Binray[i].textContent.slice(1, 4);
        address[i].textContent = Binray[i].textContent.slice(4);
        let isInstructionMemory = addrssing_Mode(opcode[i].textContent);
        let getTypeOfInsturtionAndAddressingMode = isInstructionMemoryReference(isInstructionMemory, iBit[i].textContent);
        var instruction = getInstruction(getTypeOfInsturtionAndAddressingMode[0], opcode[i].textContent, address[i].textContent);
        instructionType[i].textContent = "Instruction mnemonic: "+instruction;
        InstructionCategory[i].textContent = getTypeOfInsturtionAndAddressingMode[0];
        Addressingmode[i].textContent = getTypeOfInsturtionAndAddressingMode[1];
    }
    
    //we store the values inserted into the memory
    //the function is in file Memory-Registers.js
    memoryValues(num);
    var j=1;
    //for loop will run four time, each time for one tracing table
    while (Register.S==1) {
        functionCounter=0; //reset the function counter in case convert button is repressed
        let initial = document.querySelectorAll(`#Tracing${j} .Initial`);
        //we push the values of the registers, memory, E bit to array2  
        array2.push([Register.PC, Register.AR, Register.DR, Register.AC, Register.IR, Memory[Register.AR], Register.E,Register.SC]);
        //we push a function that sets the values of array2 to initial row of the trancing tables 
        array.push(function () {
            //we select the table in each for loop then increment the counter
            var displayTable = document.querySelector(`#Tracing${arrayDisplayCounter++}`);
            //the table is heddin is css, we will display it in its defualt display to show it              
            displayTable.style.display = 'table';
            //to show the hedden row, for each element in the row we display it in default deplay
            initial.forEach(function(e){e.style.display = 'table-cell';});

            //we change the text of row cells to the elemnts we pushed in array 2 in order
            initial[1].textContent = array2[counter2][0]; //the first element pushed (Register.PC)
            initial[2].textContent = array2[counter2][1]; //Register.AR
            initial[3].textContent = array2[counter2][2]; //Register.DR
            initial[4].textContent = array2[counter2][3]; //Register.AC
            initial[5].textContent = array2[counter2][4]; //Register.IR
            initial[6].textContent = array2[counter2][5]; //Memory[Regester.AR]
            initial[7].textContent = array2[counter2][6]; //Register.E
            initial[8].textContent = array2[counter2][7]; //Register.SC
            //we increment the counter of array2 so we will push new values for new rows
            counter2++; 
        })


        var tracingInstruction;
        var i = 0; //while loop counter
        var I; var op; //the I bit and OpCode
        do { //do wile loop, will run for the rows (t0,t1,t2,...) inside each table
            let t = document.querySelectorAll(`#Tracing${j} .T${i}`);

            if (i == 4) {
                tracingInstruction = memoryInstructions(op);
            }

            switch (i) {
                case 0:
                    T0();
                    break;
                case 1:
                    T1();
                    break;
                case 2:
                    //we fetch the values and store the I bit And OpCode
                    results = T2();
                    I = results[0];
                    op = results[1];
                    break;
                case 3:

                    var tracingAddress = hex2bin(Register.AR);
                    if (op == "111") {
                        if (I == "1") {
                            tracingInstruction = inputOutputInstructions(tracingAddress);
                            T3_INPUT_OUTPUT(tracingAddress);
                            Register.SC = 0;
                        }
                        else {
                            tracingInstruction = registerInstructions(tracingAddress);
                            T3_Register(tracingInstruction);
                        }
                    }
                    else {
                        if (I == "1")
                            T3_Memory();
                        else
                            Register.SC++;
                    }
                    break;
                case 4:
                    T4(tracingInstruction);
                    break;
                case 5:

                    T5(tracingInstruction);

                    break;
                case 6:
                    //ISZ is the only instruction will run when SC = 6
                    ISZ_D6T6();
                    break;
            }
            //the same is explained for the initial row above
            array2.push([Register.PC, Register.AR, Register.DR, Register.AC, Register.IR, Memory[Register.AR], Register.E,Register.SC]);

            array.push(function () {
                t.forEach(function(e){e.style.display = 'table-cell';});
                t[1].textContent = array2[counter2][0];
                t[2].textContent = array2[counter2][1];
                t[3].textContent = array2[counter2][2];
                t[4].textContent = array2[counter2][3];
                t[5].textContent = array2[counter2][4];
                t[6].textContent = array2[counter2][5];
                t[7].textContent = array2[counter2][6];
                t[8].textContent = array2[counter2][7];
                counter2++

            })
            i++; //increment the counter of the while loop

        } while (Register.SC != 0); 
    j++;
    }

});
//keyListener, active when the keyboard is pressed
window.onkeypress = function (e) { //e take the key pressed by the keyboard
    if (e.code == "Digit2") //if the button pressed is 2
    //store the function of the row that we pushed into the function array then increase the counter
    var z = array[functionCounter++]; 
    z(); // run the function stored to display the row
}