// ==UserScript==
// @name    PyFix
// @namespace   http://informationen.pytalhost.net/pyfix/
// @description Neue Funktionen und kleine Ausbesserungen für Pytal.
// @include http*://www.pytal.de/*
// ==/UserScript==

/*******************************************************************************************
                       _____       ______ _               ___   ____  
                      |  __ \     |  ____(_)             / _ \ |___ \ 
                      | |__) |   _| |__   ___  __ __   _| | | |  __) |
                      |  ___/ | | |  __| | \ \/ / \ \ / / | | | |__ < 
                      | |   | |_| | |    | |>  <   \ V /| |_| | ___) |
                      |_|    \__, |_|    |_/_/\_\   \_/  \___(_)____/ 
                              __/ |                                   
                             |___/                                    
********************************************************************************************/
// Visit http://informationen.pytalhost.net/pyfix/ for more info.

/*********************** FÜR OPERA-BENUTZER: HIER CONFIG ANPASSEN **************************/
function setdefaultsettings () {
    /*
    * Zur usehttps-Option: Opera führt auf verschlüsselten Seiten 
    * normalerweiße keine Userskripte aus. Möchtest du PyFix 
    * mit Opera auf der Verschlüsselten Pytal-Seite benutzen, 
    * musst du die Option "User JavaScript on HTTPS" aktivieren
    * (opera:config#UserPrefs|UserJavaScriptonHTTPS)
    */
    pyfix_setValue('usehttps', false);
    pyfix_setValue('bbcodeurlfix', true);
    pyfix_setValue('usesig', true);
    pyfix_setValue('sig', '\\n\\n----\\n[url="http://chat.pytalhost.org/"]Benutzt den Pytal-Chat![/url]');
    pyfix_setValue('advedit', true);
    pyfix_setValue('modfix', true);
    pyfix_setValue('fixsmileys', true);
    pyfix_setValue('addtabs', true);
    pyfix_setValue('postfocus', true);
    pyfix_setValue('nickhigh', true);
    pyfix_setValue('submitaccess', true);
    pyfix_setValue('firstrun', false);    
    pyfix_setValue('nick', 'feuerfuchs');
}
/******************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

var smileycodes = 'var smileys = new Object();' +
'smileys[":wall:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/wall.gif[/img]";' +
'smileys[":finger:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/finger.gif[/img]";' +
'smileys[":war:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/waffen.gif[/img]";' +
'smileys[":evil:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/teufel.gif[/img]";'+
'smileys[":kugel:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/glaskugel.gif[/img]";' +
'smileys[":pylol:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal001.gif[/img]";' +
'smileys[":pysmile:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal002.gif[/img]";' +
'smileys[":pysad:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal003.gif[/img]";' +
'smileys[":pycool:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal004.gif[/img]";' +
'smileys[":pyangry:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal005.gif[/img]";' +
'smileys[":pyquest:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal006.gif[/img]";' + 
'smileys[":pyarrow:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal007.gif[/img]";'+
'smileys[":monkey:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/affe.png[/img]";' +
'smileys[":angel:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/engel.png[/img]";';
        
var smileys = new Object();
smileys[":wall:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/wall.gif[/img]";
smileys[":finger:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/finger.gif[/img]";
smileys[":war:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/waffen.gif[/img]";
smileys[":evil:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/teufel.gif[/img]";
smileys[":kugel:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/glaskugel.gif[/img]";
smileys[":pylol:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal001.gif[/img]";
smileys[":pysmile:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal002.gif[/img]";
smileys[":pysad:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal003.gif[/img]";
smileys[":pycool:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal004.gif[/img]";
smileys[":pyangry:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal005.gif[/img]";
smileys[":pyquest:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal006.gif[/img]";
smileys[":pyarrow:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/pytal007.gif[/img]";
smileys[":monkey:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/affe.png[/img]";
smileys[":angel:"] = "[img]http://informationen.pytalhost.net/pyfix/smileys/engel.png[/img]";

// Version
var myver = "0.3.6";

var formurl = "http://informationen.pytalhost.net/pyfix/newform.html";

// Config-Variable für Browser, die nicht GreaseMonkey unterstützen
var config = new Object();
    
function confass() {
    setdefaultsettings();
    pyfix_log('Starting Configuration assistant.');
    
    if (typeof GM_setValue == 'function') {
        alert("Willkommen bei PyFix!\nPyfix läuft derzeit auf Standardkonfiguration. Bitte passe sie mit Extras > Greasemonkey > User Skript Kommandos deinen Vorstellungen an (der Menüpunkt erscheint nur, wenn du dich auf www.pytal.de befindest).");
        location.reload();
    }
}

// Fügt eine Abfrage bei Modjobs (löschen und schließen) hinzu
////////////////////////////////////////////////////////////////////////////////////////////
function addconfirm() {
////////////////////////////////////////////////////////////////////////////////////////////
    var links = document.getElementsByTagName('a'); 
    for (var i = 0; i < links.length; ++i) { 
        if(links[i].href == 'javascript:document.handler.submit();') { 
            links[i].setAttribute('onclick', links[i].getAttribute('onclick') + " return confirm('Diese Änderung durchführen?');");
        }
    }
}

// Hängt die Signatur an
////////////////////////////////////////////////////////////////////////////////////////////
function addsig () {
////////////////////////////////////////////////////////////////////////////////////////////
    if(typeof document.getElementsByName('text')[0] != "undefined" && pyfix_getValue('usesig') == true) {
        // Textfeld leer? Signatur anhängen!
        if(document.getElementsByName('text')[0].value == "") {
            // Anhängen
            var sig = (pyfix_getValue('sig').replace(/\\n/g, "\n"))
            // removed htmlentities
            // document.getElementsByName('text')[0].value=htmlentities(sig);
            document.getElementsByName('text')[0].value=sig;
        }
    }
}

// ins()-Funktion von SELFHTML
////////////////////////////////////////////////////////////////////////////////////////////
function addshtmlins() {
////////////////////////////////////////////////////////////////////////////////////////////
    // Add ins-function
    var skript = document.createElement("script");
    skript.setAttribute("type", "text/javascript");
    skript.innerHTML = "function ins(aTag, eTag) { var input = document.forms['post'].elements['text'];input.focus();var start = input.selectionStart;var end = input.selectionEnd;var insText = input.value.substring(start, end);input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);var pos;if (insText.length == 0) { pos = start + aTag.length; } else { pos = start + aTag.length + insText.length + eTag.length; } input.selectionStart = pos; input.selectionEnd = pos;}";
    document.body.appendChild(skript);
}

// Auf HTTPS umleiten
////////////////////////////////////////////////////////////////////////////////////////////
function rdhttps() {
////////////////////////////////////////////////////////////////////////////////////////////
    if(window.location.protocol != "https:") {
        location.href="https://www.pytal.de" + window.location.pathname + window.location.search;
    }
}

// Beim Posten/Einloggen Fokus auf das Text-/Thema-/Username-Feld setzen (von Tblue)
////////////////////////////////////////////////////////////////////////////////////////////
function setpostfocus() {
////////////////////////////////////////////////////////////////////////////////////////////
    if (typeof document.getElementsByName('title')[0] != "undefined") {
        document.getElementsByName('title')[0].focus();
        document.getElementsByName('title')[0].setSelectionRange(0,0);
    }
    else if (typeof document.getElementsByName('text')[0] != "undefined") {
        document.getElementsByName('text')[0].focus();
        document.getElementsByName('text')[0].setSelectionRange(0,0);
    }
}

function setloginfocus() {
    if (typeof document.getElementsByName('usr')[0] != "undefined") {
        document.getElementsByName('usr')[0].focus();
        document.getElementsByName('usr')[0].setSelectionRange(0,0);
    }
}

// [url]-BB-Code berichtigen und [wiki] hinzufügen
////////////////////////////////////////////////////////////////////////////////////////////
function fixbb() {
////////////////////////////////////////////////////////////////////////////////////////////
    if(typeof document.getElementsByName("post")[0] != "undefined") {
        document.getElementsByName("post")[0].addEventListener('submit',
            function(eve) {
                document.getElementsByName("text")[0].value=
                document.getElementsByName("text")[0].value.replace(
                /\[url=\"(.*)\"\](.*)\[\/url\]/ig,
                '[url="$2"]$1[/url]'
                );
                /*document.getElementsByName("text")[0].value=
                document.getElementsByName("text")[0].value.replace(
                /\[wiki\](.*)\[\/wiki\]/ig,
                '[url="$1"]http://wiki.pytalhost.de/pywiki/$1[/url]'
                );*/
            },
        false);
        
        /*document.getElementsByName("text")[0].value=
        document.getElementsByName("text")[0].value.replace(
        /\[url=\"(.*)\"\]http:\/\/wiki\.pytalhost\.de\/pywiki\/(.*)\[\/url\]/ig,
        '[wiki]$2[/wiki]'
        );*/
    
        // Swap it again
        document.getElementsByName("text")[0].value=
        document.getElementsByName("text")[0].value.replace(
        /\[url=\"(.*)\"\](.*)\[\/url\]/ig,
        '[url="$2"]$1[/url]'
        );
        smileyfix();
    }
}

// Erweiterter Editor
////////////////////////////////////////////////////////////////////////////////////////////
function addadvedit() {
////////////////////////////////////////////////////////////////////////////////////////////
    pyfix_log('Advedit: Init.');
    if(typeof document.getElementsByName('post')[0] != 'undefined' && typeof document.getElementsByTagName('tbody')[0] != 'undefined') {
        // Load advanced Editor
        // Creating new post?
        if (navigator.appName == 'Opera') {
            switch(document.getElementsByTagName('tbody')[0].childNodes.length) {
                case 2:       
                    pyfix_log('Guess: Creating new post.');
                    addadvedit_load('Post');
                break;
                case 1: 
                    pyfix_log('Guess: Creating new PM.');
                    addadvedit_load('PM');
                break;
                case 3: 
                    pyfix_log('Guess: Creating new thread.');
                    addadvedit_load('Thread');
                break;
                default:
                    alert('Oh.. There is something unknown... Please report this Bug. Thank you. =)');
                break;
            }
        } else {
            switch(document.getElementsByTagName('tbody')[0].childNodes.length) {
                case 4:          
                    pyfix_log('Guess: Creating new post.');
                    addadvedit_load('Post');
                break;
                case 2:
                    pyfix_log('Guess: Creating new PM.');
                    addadvedit_load('PM');
                break;
                case 6: 
                    pyfix_log('Guess: Creating new thread.');
                    addadvedit_load('Thread');
                break;
                default:
                    alert('Oh.. There is something unknown... Please report this Bug. Thank you. =)');
                break;      
            }
        }   
    }
}

function addadvedit_load(type) {
    var url = formurl;
        if (typeof GM_xmlhttpRequest == 'function') {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(xhr) { 
                    addadvedit_insert(xhr.responseText, type);
                }
            });
        } else {
            if (typeof XMLHttpRequest != 'undefined') {
                var xmlHttp = new opera.XMLHttpRequest();
            }
            if (xmlHttp) {
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4) {
                        addadvedit_insert(xmlHttp.responseText, type);  
                    }
                };
                xmlHttp.open('GET', url, true);
                xmlHttp.send(null);
            }   
        }  
}

function addadvedit_insert(form, type) {
    addshtmlins();
        
    // Save text
    var oldtext = document.getElementsByName("text")[0].value;
        
    // Insert stylesheet
    pyfix_addStyle('.editorbtn img { border: 1px solid #999;padding:0;margin:0; } .editorbtn img:hover { background: #eee; } .editorbtn { margin: 1px; }');
    
    switch(type) {
        case 'PM':
            document.getElementsByTagName('tr')[2].innerHTML = form;
            document.getElementsByName("text")[0].value=oldtext;        
        break;
        case 'Post':
            document.getElementsByTagName('tr')[0].innerHTML = form;
            document.getElementsByName("text")[0].value=oldtext; 
        break;
        case 'Thread':
            document.getElementsByTagName('tr')[1].innerHTML = form;
            document.getElementsByName("text")[0].value=oldtext; 
        break;
    }
    
    fixbb();
    addsig();
    //imageUpload();
    // smileyfix(); // moved to fixbb() 
    //fixcode(); // Not working
    setpostfocus();
}

// Smileys an richtige Position einfügen
function smileyfix() {
    document.getElementsByName("post")[0].setAttribute('onsubmit', 
    smileycodes +
    'string = document.getElementsByName("text")[0].value;'+
    'for(key in smileys) {' +
    '    while (string.indexOf(key)>-1) {' +
    '       string = string.replace(key, smileys[key]);' +
    '    }' +
    '}' +
    'document.getElementsByName("text")[0].value = string;'
    );
    
    string = document.getElementsByName("text")[0].value;
    for(key in smileys) {
        while (string.indexOf(smileys[key])>-1) {
            string = string.replace(smileys[key], key);
        }
    }
    document.getElementsByName("text")[0].value = string;
}

function htmlentities(str) {
   str = str.replace(/ä/g, '&auml;');
   str = str.replace(/ö/g, '&ouml;');
   str = str.replace(/ü/g, '&uuml;');
   str = str.replace(/Ä/g, '&Auml;');
   str = str.replace(/Ö/g, '&Ouml;');
   str = str.replace(/Ü/g, '&Uuml;');
   str = str.replace(/ß/g, '&szlig;');
   return str;
}

// AccessKey auf Submit-Button
////////////////////////////////////////////////////////////////////////////////////////////
function accessSubmit() {
////////////////////////////////////////////////////////////////////////////////////////////
    if(typeof document.getElementsByName('send')[0] != "undefined") {
        document.getElementsByName('send')[0].setAttribute('accesskey', 's');
        if (navigator.appName == 'Opera') {
            document.getElementsByName('send')[0].setAttribute('title', 'Abschicken (Access-Key: Strg+Esc, S)')
        } else {
            document.getElementsByName('send')[0].setAttribute('title', 'Abschicken (Access-Key: Alt+Shift+S)');
        }
    }
}

// Stylesheet anhängen für die Thread-Vorschau
////////////////////////////////////////////////////////////////////////////////////////////
function stylePreview() {
////////////////////////////////////////////////////////////////////////////////////////////
    if(location.hash == '#py') {
        pyfix_addStyle('#main, body, #page, #content { background: none; } #header, #sidebar, #footer { display: none } #content, #main { width: 100%; } #page { width: 90%; } td.boa_ptext { width: 77%; } td.boa_pauthor { width: 23%; } a[href~="post,"] { display: none; }');
        // Replace links
        var links = document.getElementsByTagName('a'); 
        for (var i = 0; i < links.length; ++i) { 
            if(links[i].title.match(/Externer Link/)) {
                links[i].setAttribute('onclick', 'window.open(this.href);return false;');
            } else {
                links[i].href=links[i].href+'#py';
            }
        }
    }
}


// Update
////////////////////////////////////////////////////////////////////////////////////////////
function checkForUpdates_init() {
////////////////////////////////////////////////////////////////////////////////////////////
    var url = 'http://informationen.pytalhost.net/pyfix/ver';
    if (typeof GM_xmlhttpRequest == 'function') {
        GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(xhr) { 
            checkForUpdates_showmessage(xhr.responseText);
        }
    });
    } else {
        if (typeof XMLHttpRequest != 'undefined') {
            var xmlHttp = new opera.XMLHttpRequest();
        }
        if (xmlHttp) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4) {
                    checkForUpdates_showmessage(xmlHttp.responseText);  
                }
            };
            xmlHttp.open('GET', url, true);
            xmlHttp.send(null);
        }   
    }
}

function checkForUpdates_showmessage(currver) {
    if(currver != myver) {
        alert('Deine PyFix-Version ist nicht aktuell. Aktuell ist Version ' + currver + '. Bitte update auf die neuste Version.');
        if (typeof GM_openInTab == 'function') {
            GM_openInTab('http://informationen.pytalhost.net/pyfix/?update=' + myver);
        }
    } else {
        alert('Deine PyFix-Version ist aktuell.');
    }
}

// Konfiguration
////////////////////////////////////////////////////////////////////////////////////////////
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
////////////////////////////////////////////////////////////////////////////////////////////
    // Load current value into variable
    window[key] = pyfix_getValue(key, defaultValue);
    // Add menu toggle
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), 
    function() {
        GM_setValue(key, !window[key]);
        location.reload();
    });
}

// Nick-Highlighting
////////////////////////////////////////////////////////////////////////////////////////////
function nickhigh() {
////////////////////////////////////////////////////////////////////////////////////////////
        var search = new RegExp(pyfix_getValue('nick'), 'gi');
        document.body.innerHTML = document.body.innerHTML.replace(search, '<span style="color: yellow;background:red;">' + pyfix_getValue('nick') + '</span>');
}

// Tabs hinzufügen
////////////////////////////////////////////////////////////////////////////////////////////
function addTabs() {
////////////////////////////////////////////////////////////////////////////////////////////
    pyfix_addStyle('img[title="Pytal"] { float:left} ul#pytabs { margin:0;padding:0; } ul#pytabs li a { display:block;float:left; padding:2px; margin-top:59px;background: #D86633; color: #ffffff; } ul#pytabs li {list-style-type:none; }ul#pytabs li a:hover { padding-bottom: 4px; }');
    document.getElementById("headercenter").innerHTML+='<ul id="pytabs"><li><a href="/index">Start</a></li><li><a href="/mypytal">Mein Pytal</a></li><li><a href="/community">Community</a></li><li><a href="/hosting">Webhosting</a></li><li><a href="http://wiki.pytalhost.de">Wiki</a></li></ul>';
}

// Diverse Funktionen zur Kompatibilität mit Opera (von JanRei)
////////////////////////////////////////////////////////////////////////////////////////////
//Debugging-Funktion
function pyfix_log(message) {
    if(typeof opera != 'undefined') {
        opera.postError('PyFix: ' + message);
    }
    if(typeof GM_log == 'function') {
        GM_log('PyFix: ' + message);
    } 
}

//Funktion zum Abfragen eines Einstellungswertes
function pyfix_getValue(key) {
    if(typeof GM_getValue == 'function') {
        return GM_getValue(key);
    } else {
        return config[key];
    } 
}

//Funktion zum Setzen eines Einstellungswertes
function pyfix_setValue(key, setting) {
    if(typeof GM_setValue == 'function') {
        GM_setValue(key, setting);
    } else {
        config[key] = setting;
    }
}

function pyfix_addStyle(style) {
    // Just CSS-Injection
    if (typeof GM_addStyle == 'function') {
        GM_addStyle(style);
    } else {
        var styleelement = document.createElement("style");
        styleelement.setAttribute("type", "text/css");
        styleelement.innerHTML = style;
        document.getElementsByTagName('head')[0].appendChild(styleelement);
    }  
}

function pyfix_init_GM() {
    makeMenuToggle('usehttps', true, "Benutze verschlüsselte Verbindung", "Benutze unverschlüsselte Verbindung", "PyFix");
    makeMenuToggle('usesig', true, "Signatur einfügen", "Keine Signatur einfügen", "PyFix");
    GM_registerMenuCommand("PyFix: Signatur festlegen", 
        function() {
            var sigtext = prompt('Neuen Signaturtext eingeben', pyfix_getValue('sig'));
            if(!sigtext) {
                return false;
            } else {
                pyfix_setValue('sig', sigtext);
            }
        }
    );
    makeMenuToggle('advedit', true, "Erweiterten Editor einschalten", "Erweiterten Editor ausschalten", "PyFix");
    makeMenuToggle('modfix', true, "Nachfrage bei Modjobs einschalten", "Nachfrage bei Modjobs ausschalten", "PyFix");
    makeMenuToggle('addtabs', true, "PyTabs aktivieren", "PyTabs ausschalten", "PyFix");
    makeMenuToggle('nickhigh', true, "Nick-Highlighting einschalten", "Nick-Highlighting ausschalten", "PyFix");
    GM_registerMenuCommand("PyFix: Nick-Highlighting: Nick festlegen", 
        function() {
            var nick = prompt('Bitte gib deinen Nick bei Pytal ein (Regexe sind möglich, deswegen bitte auch alle Zeichen, die bei Regexen eine besondere Bedeitung haben, escapen)', pyfix_getValue('nick'));
            if(!nick) {
                return false;
            } else {
                pyfix_setValue('nick', nick);
            }
        }
    );
    makeMenuToggle('submitaccess', true, "Access-Key auf den Submit-Button legen", "Keinen Access-Key auf den Submit-Button legen", "PyFix");
    GM_registerMenuCommand("PyFix: Auf Updates prüfen", checkForUpdates_init);
}
// Hauptfunktion
////////////////////////////////////////////////////////////////////////////////////////////
function main() {
////////////////////////////////////////////////////////////////////////////////////////////
    if(window.location.hostname.indexOf('pytal.de') != -1) {
        pyfix_log('Init...');
        if(pyfix_getValue('firstrun') != false) {
            // First-run-assistant
            confass();
        }
        if (typeof GM_setValue != 'function') {
            setdefaultsettings();
        }
    
        if(pyfix_getValue('usehttps') == true) {
            rdhttps();
        }
        if(pyfix_getValue('advedit') == true) {
            pyfix_setValue('fixsmileys', false);
            addadvedit();
        }
        if(pyfix_getValue('modfix') == true) {
            addconfirm();
        }
        if(pyfix_getValue('submitaccess') == true) {
            accessSubmit();
        }
        if(pyfix_getValue('nickhigh') == true) {
            nickhigh();
        }
        if(pyfix_getValue('addtabs') == true) {
            addTabs();
        }
        stylePreview();
        if (typeof GM_registerMenuCommand == 'function') {
            pyfix_init_GM();
        }
        //pyfix_add_notice(); // Disabled - neues Pytal-Layout
        setloginfocus();
    }
}

// Disabled - neues Pytal-Layout
/*function pyfix_add_notice() {
    matchingElements = document.getElementsByTagName('div');
    for (i in matchingElements)
    {
        if (matchingElements[i]) {
            if (matchingElements[i].className == 'footer') {
                var newdiv = document.createElement('div')
                if (typeof GM_xmlhttpRequest != 'function') {
                    newdiv.innerHTML = 'Powered by <a href="http://informationen.pytalhost.net/pyfix/">PyFix</a> ' + myver + ' (<a href="javascript: checkForUpdates_init();">Pr&uuml;fe auf Update</a>)';
                } else {
                    newdiv.innerHTML = 'Powered by <a href="http://informationen.pytalhost.net/pyfix/">PyFix</a> ' + myver;
                }
                newdiv.className = 'brench';
                matchingElements[i].appendChild(newdiv);
            }
        }
    }
}*/

main();
