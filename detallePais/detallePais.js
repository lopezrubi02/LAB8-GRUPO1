
const urlParams = new URLSearchParams(window.location.search);
//const nameCountry = urlParams.get('name');
//const countryCode = urlParams.get('countryCode');
//const countryCode = urlParams.get('slug');
const nameCountry = "Peru";
const countryCode = "PE";
const slug = "peru";

$(document).ready(function () {
    // const caseCovid = 'confimed';

    $("#titulo").html('Resumen del país ' + nameCountry);
    const urlbanderapais = "https://www.countryflags.io/" + countryCode + "/flat/64.png";
    const imagen = "<img src=" + urlbanderapais + ">";  //Bandera de pais recibido
    $("#bandera-div").append(imagen);

    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://restcountries.eu/rest/v2/alpha/" + countryCode
    }).done(function (data) {
        $("#capital").html(data.capital);
        $("#population").html(data.population);
        $("#subregion").html(data.subregion);
        console.log("datos obtenidos")
        console.log(data.capital);
        console.log(data.population);
        console.log(data.subregion);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });

    obtenerDataPais();
});

function seleccionarCasos() {
    //TODO
    const caseCovid = $("#caseCovid").val();
    console.log("Parámetro obtenido");
    console.log(caseCovid);
}

function obtenerDataPais() {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        const fecha = data.fecha;
        const fecha2 = formatDate(fecha);
        console.log(fecha2);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    date.toDateString();
}