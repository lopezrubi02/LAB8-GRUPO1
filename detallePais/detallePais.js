
const urlParams = new URLSearchParams(window.location.search);
//const nameCountry = urlParams.get('name');
//const countryCode = urlParams.get('countryCode');
//const slug = urlParams.get('slug');
//const caseCovid = urlParams.get('caseCovid');

const nameCountry = "Peru";
const countryCode = "PE";
const slug = "peru";
const caseCovid = "confirmed";

$(document).ready(function () {

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
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
    $('#redirect-grafico').attr("href","../grafico/graficoEvolutivo.html?name=" + nameCountry + "&slug=" +
        slug + "&countryCode=" + countryCode + "&caseCovid=" + caseCovid);
    obtenerDataPais();
});

function seleccionarCasos() {
    //TODO
    //const caseCovid = $("#caseCovid").val();
    console.log("Parámetro obtenido");
    console.log($("#caseCovid").val());
    var caseCovid = $("#caseCovid").val();
    $('#redirect-grafico').attr("href","../grafico/graficoEvolutivo.html?name=" + nameCountry + "&slug=" +
        slug + "&countryCode=" + countryCode + "&caseCovid=" + caseCovid);
}

function obtenerDataPais() {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        const listacasos = data;
        var contentHtml = "";

        $.each(listacasos, function( index, value ) {

            contentHtml += "<tr>";
            contentHtml += "<td>" + formatDate(value.Date) +"</td>";
            contentHtml += "<td>" + value.Cases +"</td>";
            contentHtml += "</tr>";

        });

        $("#body-paises").append(contentHtml);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
}

function formatDate(date) {
    var fecha = date.slice(0, 10);
    fecha = fecha.replace("-", "/");
    fecha = fecha.replace("-", "/");
    return fecha;
}