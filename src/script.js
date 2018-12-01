var pirmas = undefined;
var antras = undefined;
var veiksmas = undefined;
var atsakymas = undefined;

var Action = function (nr1, nr2, action, answer) {
    this.nr1 = nr1;
    this.nr2 = nr2;
    this.action = action;
    this.answer = answer;

};

var istorija = [];

function handleInput(value) {
    if (atsakymas != undefined) {
        atsakymas = undefined;
        document.getElementById('output').innerHTML = '';
    }
    switch (value) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            document.getElementById('output').innerHTML += value;
            break;
        case '.':
            if (document.getElementById('output').innerHTML.indexOf(value) == -1) {
                document.getElementById('output').innerHTML += value;
            }
            break;
        case '+':
        case '-':
        case '/':
        case '*':
            if (pirmas == undefined) {
                pirmas = Number(document.getElementById('output').innerHTML);
                document.getElementById('output').innerHTML = '';
            }
            veiksmas = value;
            break;
        case '=':
            antras = Number(document.getElementById('output').innerHTML);
            if (isNaN(antras)) {
                antras = 0;
            }
            handleSkaiciuok();
            break;
    }
}

function handleSkaiciuok() {
    if (pirmas != undefined && antras != undefined && veiksmas != undefined) {
        switch (veiksmas) {
            case '+':
                atsakymas = pirmas + antras;
                break;
            case '-':
                atsakymas = pirmas - antras;
                break;
            case '/':
                atsakymas = pirmas / antras;
                break;
            case '*':
                atsakymas = pirmas * antras;
                break;
        }
        document.getElementById('output').innerHTML = atsakymas;
        var veiksmai = new Action(pirmas, antras, veiksmas, atsakymas);
        debugger;
        istorija.push(veiksmai);
        pirmas = undefined;
        antras = undefined;
        action = undefined;

        perpiestiLentele();
    }
}

function perpiestiLentele() {
    var template = "<tr><td>{nr1}</td><td>{action}</td><td>{nr2}</td><td>{answer}</td></tr>";
    var table = document.getElementById('history');
    table.innerHTML = "<tr class='header'><td>A</td><td>Veiksmas</td><td>B</td><td>=<button  onclick='handleSortUp()'>up</button><button  onclick='handleSortDown()'>down</button></td></tr>";

    istorija.forEach(item => {
        var eilute = template.replace('{nr1}', item.nr1).replace('{nr2}', item.nr2).replace('{action}', item.action).replace('{answer}', item.answer);
        table.innerHTML += eilute;
    })
}


function handleSortUp() {
    istorija = istorija.sort((a, b) => {

        return a.answer - b.answer;
    });
    perpiestiLentele();
}

function handleSortDown() {
    istorija = istorija.sort((a, b) => {
        return b.answer - a.answer;
    });
    perpiestiLentele();
}