//
// score calculation and manipulation section
//


function divideBy2(value) {
    // takes in a value then returns that value divided by 2
    divided = Math.floor(value / 2);
    return divided;
}

function divideBy5(value) {
    // takes in a value then returns that value divided by 5
    divided = Math.floor(value / 5);
    return divided;
}

function updateScores(id) {
    // called by an element in html, takes in id, calls divideBy2 and divideBy5, automatically sets half and fifth values in html
    try {
        var score = document.getElementById(id).value;
    }
    
    catch (err) {
        console.error(err.message);
    }
    
    if (score != null) {
        half = divideBy2(score);
        fifth = divideBy5(score);
        idHalf = id + "Half";
        idFifth = id + "Fifth";

        document.getElementById(idHalf).value = half;
        document.getElementById(idFifth).value = fifth;

        console.debug("updateScores of id: '" + id + "' with values of score: '" + score + "' half: '" + half + "' fifth: '" + fifth);


    } else {
        console.error("Failed to find value for id: " + id);
    }

}

function calcHP() {
    // gets con and siz values from html then calculates max HP with them, also sets the max value of current HP
    var conScore = parseInt(document.getElementById("con").value);
    var sizScore = parseInt(document.getElementById("siz").value);

    if (conScore > 0 && sizScore > 0) {
        var hpScore = Math.floor((conScore += sizScore) / 10);
        document.getElementById("hpMax").value = hpScore;
        document.getElementById("hpCurrent").setAttribute("max", hpScore);
    }
}

function calcDodge() {
    // if dex hasn't been changed by itself yet, copies the value from dexHalf to populate the dodge value
    var dexScore = document.getElementById("dexHalf").value;

    if (localStorage.getItem("dodgeChanged") != 1) {
        document.getElementById("dodge").value = dexScore;
        document.getElementById("dodgeHalf").value = divideBy2(dexScore);
        document.getElementById("dodgeFifth").value = divideBy5(dexScore);
    }
}


function calcDamageBonusAndBuild() {
    // gets the values of str and siz, combines them, then runs that number through a bunch of elifs to set dmgBns and build
    var strScore = parseInt(document.getElementById("str").value);
    var sizScore = parseInt(document.getElementById("siz").value);

    if (strScore > 0 && sizScore > 0) {
        combi = strScore += sizScore;
        if (combi > 445) {
            document.getElementById("dmgBns").value = "+5d6";
            document.getElementById("build").value = "6";
        } else if (combi > 364) {
            document.getElementById("dmgBns").value = "+4d6";
            document.getElementById("build").value = "5";
        } else if (combi > 284) {
            document.getElementById("dmgBns").value = "+3d6";
            document.getElementById("build").value = "4";
        } else if (combi > 204) {
            document.getElementById("dmgBns").value = "+2d6";
            document.getElementById("build").value = "3";
        } else if (combi > 164) {
            document.getElementById("dmgBns").value = "+1d6";
            document.getElementById("build").value = "2";
        } else if (combi > 124) {
            document.getElementById("dmgBns").value = "+1d4";
            document.getElementById("build").value = "1";
        } else if (combi > 84) {
            document.getElementById("dmgBns").value = "None";
            document.getElementById("build").value = "0";
        } else if (combi > 64) {
            document.getElementById("dmgBns").value = "-1";
            document.getElementById("build").value = "-1";
        } else {
            document.getElementById("dmgBns").value = "-2";
            document.getElementById("build").value = "-2";
        }
    }
}

function calcMove() {
    // gets the values of dex, str, and siz, then calculates the maximum move speed and populates the box
    var dexScore = parseInt(document.getElementById("dex").value);
    var strScore = parseInt(document.getElementById("str").value);
    var sizScore = parseInt(document.getElementById("siz").value);

    if (dexScore > 0 && strScore > 0 && sizScore > 0) {
        if (strScore > sizScore && dexScore > sizScore) {
            document.getElementById("moveMax").value = 9;
        } else if (strScore >= sizScore || dexScore >= sizScore) {
            document.getElementById("moveMax").value = 8;
        } else {
            document.getElementById("moveMax").value = 7;
        }
    }
}

function calcMagic() {
    console.debug("running calcMagic");
    var powScore = parseInt(document.getElementById("pow").value);
    var magMaxScore = divideBy5(powScore);

    document.getElementById("magMax").value = magMaxScore
    document.getElementById("magCurrent").setAttribute("max", magMaxScore);
}

function calcSanMax() {
    var mythosScore = parseInt(document.getElementById("cthulhumythos").value);
    var sanMaxScore = 99 - mythosScore;

    document.getElementById("sanMax").value = sanMaxScore;
}

function setLanguageMinimum() {
    var eduScore = parseInt(document.getElementById("edu").value);

    document.getElementById("language4").setAttribute("min", eduScore);
}

function weaponStatSelector(number) {
    // gets the values for 'regular', 'hard', and 'extreme' in the weapons section depending on the stat
    var selector = "combatStatSelector" + number;

    try {
        var opt = document.getElementById(selector).value;
    } catch {
        console.error("null value in combatStatSelector with " + selector);
    }

    console.log("option " + opt + " selected")
    var wepSlot = "weapon" + number + "Diff";

    if (opt == "blankOption") {
        document.getElementById(wepSlot).value = "";
        document.getElementById(wepSlot + "Half").value = "";
        document.getElementById(wepSlot + "Fifth").value = "";
    } else if (opt == "fightingbrawlOption") {
        document.getElementById(wepSlot).value = document.getElementById("fightingbrawl").value;
        sendChangeEvent(wepSlot);
    } else if (opt == "firearmshandgunOption") {
        document.getElementById(wepSlot).value = document.getElementById("firearmshandgun").value;
        sendChangeEvent(wepSlot);
    } else if (opt == "firearmsrifleshotgunOption") {
        document.getElementById(wepSlot).value = document.getElementById("firearmsrifleshotgun").value;
        sendChangeEvent(wepSlot);
    } else if (opt == "fighting1Option") {
        document.getElementById(wepSlot).value = document.getElementById("fighting1").value;
        sendChangeEvent(wepSlot);
    } else if (opt == "fighting2Option") {
        document.getElementById(wepSlot).value = document.getElementById("fighting2").value;
        sendChangeEvent(wepSlot);
    } else if (opt == "firearms1Option") {
        document.getElementById(wepSlot).value = document.getElementById("firearms1").value;
        sendChangeEvent(wepSlot);
    }
}

//
// utilities section
//

function updateCombatScores() {
    // updates the scores found in the weapons section whenever one of the combat skills is changed
    weaponStatSelector(1);
    weaponStatSelector(2);
    weaponStatSelector(3);
}

function sendChangeEvent(id) {
    // this sends a change event to an element to trigger any onchange functions present
    var element = document.getElementById(id);
    var changeEvent = new Event('change');
    element.dispatchEvent(changeEvent);
}

function discreteDodge() {
    // saves a key to localStorage with item 1
    if (localStorage.getItem("dodgeChanged") != 1) {
        console.debug("dodgeChanged set to 1");
        localStorage.setItem("dodgeChanged", 1);
    }
}

//
// saving and loading section
//

function saveToLocalStorage(id) {
    // takes in ID of element that called the function
    // gets the type of the element that called
    // checks what type it is to save conditional data to localStorage

    var eType = document.getElementById(id).type;

    console.debug("attempting to save type: " + eType);

    if (eType == "number" || eType == "text") {
        var score = document.getElementById(id).value;
        localStorage.setItem(id, score);
        console.log("saved type: '" + eType + "' with key: '" + id + "' and value of: '" + score + "'")
    } else if (eType == "checkbox") {
        var checked = document.getElementById(id).checked;
        localStorage.setItem(id, checked);
        console.log("saved type: '" + eType + "' with key: '" + id + "' and value of: '" + checked + "'")
    } else if (eType == "select-one") {
        var selected = document.getElementById(id).value;
        localStorage.setItem(id, selected);
        console.log("saved type: '" + eType + "' with key: '" + id + "' and value of: '" + selected + "'")
    } else {
        // error handling
        console.error("failed to save type: '" + eType + "' with id: '" + id + "'");
    }
}

function loadMap(value, key, map) {
    // used to sort out the map that's used in the loadFromLocalStorage function
    console.log("key: " + key + '\n' + "item: " + value + '\n' + "type: Option");
    document.getElementById(key).value = value;
    sendChangeEvent(key);
}

function loadFromLocalStorage() {
    // prints the number of keys in localStorage to console
    var storageSize = localStorage.length;
    console.log(storageSize + " items to be loaded from localStorage");

    // initialise a map for the purposes of enforcing a load order in specific cases
    var storedPairs = new Map();

    // goes through the list of keys & individually gets their type
    for (let i = 0; i < localStorage.length; i++) {
        var storageKey = localStorage.key(i);
        var storageItem = localStorage.getItem(storageKey);

        if (storageItem == "true" || storageItem == "false") {
            var storageType = "checkbox"
        } else {
            var storageType = "text"
        }

        // check type for loading conditional properties
        if (storageType == "text") {
            console.log("key: " + storageKey + '\n' + "item: " + storageItem + '\n' + "type: " + storageType);

            if (storageItem.indexOf("Option") > -1) {
                // the options that are chosen in the weapons section need to be loaded after their associated skill
                // and so are sent off to a map to be handled after everything else
                console.log("sending to storedPairs");
                storedPairs.set(storageKey, storageItem);

            } else if (document.getElementById(storageKey) != null) {
                // error handling for keys without a corresponding element
                console.log("key of: '" + storageKey + "' with value of : '" + storageItem + "' has no corresponding element")
                document.getElementById(storageKey).value = storageItem;
                sendChangeEvent(storageKey);

            } else {
                // catch-all on the off chance it gets past the condition above
                console.debug("localStorage entry without a destination, key of: '" + storageKey + "' and a value of: '" + storageItem + "'")
            }


        } else if (storageType == "checkbox") {
            console.log("key: " + storageKey + '\n' + "item: " + storageItem + '\n' + "type: " + storageType);

            // apparently "true" is different from true, so a new var is used
            if (storageItem == "true") {
                checkedValue = true;
            } else {
                checkedValue = false;
            }

            document.getElementById(storageKey).checked = checkedValue;

        } else {
            // if the type somehow isn't populated, just print to console without attempting to use it
            console.error("unknown type for key: '" + storageKey + "' with value: '" + storageItem + "'")
        }
    }
    // the map of keys ending in 'Option' are loaded
    if (storedPairs.size > 0) {
        storedPairs.forEach(loadMap);
    }
}

function convertToJson() {
    // makes character data portable. characters can be shared or moved
    // gets all the data from localStorage, turns it into a JSON string then shows it to the user
    var toBeSaved = new Map();

    for (i = 0; i < localStorage.length; i++) {
        var storageKey = localStorage.key(i);
        var storageItem = localStorage.getItem(storageKey);

        toBeSaved.set(storageKey, storageItem);
    }
    var jsonText = JSON.stringify(Array.from(toBeSaved.entries()));
    alert(jsonText);
}

function loadFromJson() {
    // checks if the value of 'Occupation' looks like a JSON string
    // if it isn't, tells the user to put a JSON string in then click the 'Load' button again
    // if it is, clears out localStorage and then loads in the data from the JSON string
    var jsonText = document.getElementById("charOccupation").value;

    if (jsonText.indexOf("[[") == -1) {
        alert("Enter json into the \"OCCUPATION\" box, then click \"LOAD\" again.\nBe careful, doing so will erase the currently loaded character.");
    } else {
        localStorage.clear();
        try {
            var parsedText = new Map(JSON.parse(jsonText));
            console.log(parsedText);
            parsedText.forEach(loadIntoLocalStorage);
            loadFromLocalStorage();
        } catch (error) {
            console.error("JSON incorrect. Review text and try again.");
        }

    }
}

function loadIntoLocalStorage(value, key, map) {
    // this function literally loads the data from the JSON string into localStorage
    console.log("saving localStorage entry with key: '" + key + "' and value: '" + value + "'");
    localStorage.setItem(key, value);
}

