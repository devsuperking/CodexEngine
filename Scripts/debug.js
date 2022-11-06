// Developer mode.
isDebug = false;

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("debug") == "true") {
    isDebug = true;
}

function saveChangesNotify() {
    // Save changes notification.
    window.addEventListener('beforeunload', function (e) {
        if (!isDebug) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

saveChangesNotify();

function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Debug {
    // Display error.
    static error(text, content) {
        const errorSound = new Audio("/Sounds/showError.mp3");
        errorSound.play();
    
        const error = document.getElementById("errorContainer");
        const Errortitle = document.getElementById("errortitle");
        const Errorcontent = document.getElementById("errorcontent");
    
        Errortitle.innerHTML = (text);
        Errorcontent.innerHTML = (content);
    
        $("#errorContainer").fadeIn(150);
    }
    // Close error.
    static closeError() {
        const errorSound = new Audio("/Sounds/hideError.mp3");
        errorSound.play();
    
        $("#errorContainer").fadeOut(150);
    }
    static setState(data) {
        const debug = document.getElementById("debugData");
        debug.innerHTML = data;
    }
    static tooltip(tooltipText, object, type, interval = 3) {
        // Remove exsisting tooltip.
        for (var i = 0; i < object.children.length; i++) {
            if (object.children[i].tagName == "TOOLTIP") {
                object.children[i].remove();
            }
        }
    
        // Create tooltip with style.
        var tooltip = document.createElement("tooltip");
        var tooltipText = document.createTextNode(tooltipText);
        if (type == "top" || type == "bottom" || type == "left" || type == "right") {
            tooltip.setAttribute("type", type);
            tooltip.appendChild(tooltipText);
            object.appendChild(tooltip);
            $(tooltip).fadeIn(450);
            if (interval !== null) {
                setTimeout(() => {
                    $(tooltip).fadeOut(450, () => {tooltip.remove();});
                }, interval * 1000);
            }
        } else {
            // Display Console Error.
            console.error("Cannot set tooltip. Invalid type.")
        }
    }
    static showConsole() {
        if (!isDebug) {
            Debug.error('Ta funkcja nie jest jeszcze dostępna.', 'Ta funkcja nie jest dostępna w tym trybie.<br><br><color blue>ERR_HTTPPOST_405</color>');
        } else {

        }
    }
}

// Debug only parent
function debugonly() {
    // Debug only
    let debugElements = document.getElementsByTagName("debugonly");

    if (!isDebug) {
        for (var i = 0; i < debugElements.length; i++) {
            for (var element of debugElements[i].children) {
                element.style.display = "none";
            }
        }
    }
}
debugonly();
saveChangesNotify();

Debug.log("test");
Debug.log("<color red>test</color>");
Debug.log("<color blue>test</color>");