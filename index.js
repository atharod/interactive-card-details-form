//Replicate right-panel input on cards 
function replicator(ide1, ide2) {
    let ide1_selec = document.getElementById(ide1);
    let ide2_selec = document.getElementById(ide2);
    let blank = ide2_selec.innerText

    ide1_selec.addEventListener("input", function(e) {
        if (ide1 == "month") {
            var phrase = e.target.value
            //Change month value on card
            if (e.target.value.length == 0) {
                ide2_selec.innerText = "00/00"
            }
            else if (e.target.value.length == 1) {
                ide2_selec.innerText = phrase + "0/00"
            }
            else if (e.target.value.length == 2) {
                ide2_selec.innerText = phrase + "/00"
            }
        }
        //Change year value on card
        else if (ide1 == "year") {
            var word1 = document.getElementById("date-back").innerText[0] + document.getElementById("date-back").innerText[1] +  document.getElementById("date-back").innerText[2];
            if (e.target.value.length == 1) {
                ide2_selec.innerText = word1 + e.target.value + "0";
            }
            else if (e.target.value.length == 2) {
                ide2_selec.innerText = word1 + e.target.value
            }
        }
        //Change numbers on card (+add space each 4 digits)  (add event for backspace key)
        else if (ide1 == "card-number") {
            document.addEventListener('keydown', (event) => {
                var key_pressed = event.key;
                if((e.target.value.length + 1) % 5 == 0 && e.target.value.length != 19 && key_pressed != "Backspace") {
                    e.target.value = e.target.value + " ";
                    ide2_selec.innerText = e.target.value
                }
                else {
                    ide2_selec.innerText = e.target.value;
                }
            })
        }

        // Change for name and CVC
        else {
            ide2_selec.innerText = e.target.value;
        };
        if (ide2_selec.innerText == "") {
            ide2_selec.innerText = blank
        }
    });
};

replicator("name", "card-name");
replicator("card-number" , "card-num-front");
replicator("month", "date-back");
replicator("year", "date-back");
replicator("CVC", "CVC-back");


//Errors handler (blank or digits)

function getErrorId(ide3) {
    var inputs = document.querySelectorAll(ide3);
    var errors_id = []
    inputs.forEach(input => {
        if (input.value.length == 0) {
            errors_id.push(input.id)
        }
    });
    return errors_id
};

function getErrorIdFormat(ide4) {
    var inputs_format = document.querySelectorAll(ide4);
    var errors_id_format = [];
    var reg = /^[\d ]*$/;
    inputs_format.forEach(input_format => {
        if (reg.test(input_format.value) == false && input_format.value.length != 0) {
            if (input_format.id != "name") {
                errors_id_format.push(input_format.id)
            }
        };
    });
    return errors_id_format
};

// Action for clicking on confirm button (check if errors and display completed form)
document
    .getElementById("confirm-button")
    .addEventListener("click", function(e) {
        var error_id = getErrorId('input');
        var error_id_format = getErrorIdFormat('input');

        if (error_id.length == 0 && error_id_format == 0) {
            document.getElementById("infos").style.display = "none";
            document.getElementById("completed").style.display = "flex";
        }
        else{
            if (error_id.length != 0) {
                error_id.forEach(id => {
                    document.querySelector("label#" + id).style.display = "flex";
                    document.querySelector("input#" + id).style.border = "1px solid red"
                })
            };
            if (error_id_format.length != 0)  {
                error_id_format.forEach(id_format => {
                    document.querySelector("label#" + id_format + "-wrong-format").style.display = "flex";
                    document.querySelector("input#" + id_format).style.border = "1px solid red"
                })
            } 
        }
    });



//continue Button (on completed form)
document
    .getElementById("continue-button")
    .addEventListener("click", function(e) {
        document.getElementById("infos").style.display = "flex";
        document.getElementById("completed").style.display = "none";
        document.querySelectorAll('input').forEach(input_value => {
            input_value.value = ""
        });
        document.querySelectorAll(".card-para").forEach(tochange => {
            if (tochange.id == "card-num-front") {
                tochange.innerText = "0000 0000 0000"
            } 
            else if (tochange.id == "card-name") {
                tochange.innerText = "Jane Appleseed"
            }
            else if (tochange.id == "date-back") {
                tochange.innerText = "00/00"
            }
            else if (tochange.id == "fuckoff") {
                tochange.innerText = "000"
            }
        })
        //document.getElementById("fuckoff").innerText = ""
    });



//Reset inputs after clicking continue button
getErrorId("input").forEach(erase => {
    document.querySelector("input#" + erase).addEventListener("click", function(e) {
        if (document.querySelector("label#" + erase).style.display == "flex") {
            document.querySelector("label#" + erase).style.display = "none"
        };
        if (e.target.id != "name") {
            if (document.querySelector("label#" + erase + "-wrong-format").style.display == "flex") {
                document.querySelector("label#" + erase + "-wrong-format").style.display = "none"
            }
        }  
    })
});


//change border on focus and blur
function changeBorderFocus(x) {
    x.style.border = "2px solid transparent";
    x.style.background = "linear-gradient(#fff 0 0) padding-box, linear-gradient(to bottom right, var(--grad-1), var(--grad-2)) border-box"
}

function changeBorderBlur(x) {
    x.style.border = "1px solid var(--light-violet)";
}