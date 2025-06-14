import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.0.11/+esm";

const db = new Dexie('PersonasDB');
db.version(1).stores({
    personas: '++id,nombre,apellido,anoNacimiento, mesNacimiento'
});

$(document).ready(function () {
    $('.enviar').click(() => {
        let nombreV = $('#nombre').val();
        let apellidoV = $('#apellido').val();
        let anoNacimiento = $('#anoNacimiento').val();
        let mesNacimiento = $('#mesDeNacimiento').val();

        db.personas.add({
            nombre: nombreV,
            apellido: apellidoV,
            anoNacimiento: anoNacimiento,
            mesNacimiento: mesNacimiento
        }).then(() => {
            console.log('Persona agregada');
            mostrarPersonas();

        }).catch((error) => {
            console.log('Error al agregar persona: ', error);
        });

    });
    mostrarPersonas();
    limpiarFomrulario();

});


function esAnoBisiesto(anoNacimiento) {
    const ano = parseInt(anoNacimiento);
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0) ? 'Sí' : 'No';
}


function esPar(mesNombre) {
    const meses = {
        enero: 1,
        febrero: 2,
        marzo: 3,
        abril: 4,
        mayo: 5,
        junio: 6,
        julio: 7,
        agosto: 8,
        septiembre: 9,
        octubre: 10,
        noviembre: 11,
        diciembre: 12
    };

    const mesNum = meses[mesNombre.toLowerCase()];
    if (!mesNum) return 'Mes inválido';

    return mesNum % 2 === 0 ? 'Par' : 'Impar';
}


function mostrarPersonas() {
    db.personas.toArray().then((personas) => {
        let listaPersonas = $('#tablaDatos');
        listaPersonas.empty();
        personas.forEach((p) => {
            let html = "<tr>";
            html += "<td>" + p.nombre + "</td>";
            html += "<td>" + p.apellido + "</td>";
            html += "<td>" + p.anoNacimiento + "</td>";
            html += "<td>" + p.mesNacimiento + "</td>";
            html += "<td>" + esAnoBisiesto(p.anoNacimiento) + "</td>";
            html += "<td>" + esPar(p.mesNacimiento) + "</td>";
            html += "</tr>";
            listaPersonas.append(html);
        });
    });
}

