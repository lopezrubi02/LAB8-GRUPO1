
$(document).ready(function () {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/summary"
    }).done(function (data) {
        console.log(data);
        //TODO

            let global= data.Global;
            var texto="Resumen Global al ";
            let fecha= global.Date;
            var fecha2 = formatDate(fecha);
            texto += fecha2;
            $("#titulo-resumen-global").html(texto);
            let nuevosConfirmados = global.NewConfirmed;
            let nuevosMuertos = global.NewDeaths;
            let nuevosRecuperados = global.NewRecovered;
            let totalConfirmados = global.TotalConfirmed;
            let totalMuertos = global.TotalDeaths;
            let totalRecuperados = global.TotalRecovered;
            $("#newConfirmed").html(nuevosConfirmados);
            $("#newDeaths").html(nuevosMuertos);
            $("#newRecovered").html(nuevosRecuperados);
            $("#totalConfirmed").html(totalConfirmados);
            $("#totalDeaths").html(totalMuertos);
            $("#totalRecovered").html(totalRecuperados);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
    obtenerListaPaises()
});

function obtenerListaPaises() {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/summary"
    }).done(function (data) {
        const listaPaises=data.Countries;
        listaPaises.sort(compare);

        var contentHtml="";
        $.each(listaPaises,function(i,pais){

            const totalConfirmados =pais.TotalConfirmed;


            contentHtml += "<tr>";
            contentHtml += "<td>" + (i+1) +"</td>";
            contentHtml += "<td>" + pais.Country +"</td>";
            contentHtml += "<td>" + pais.TotalConfirmed +"</td>";
            contentHtml += "<td>" + pais.TotalDeaths +"</td>";
            contentHtml += "<td>" + pais.TotalRecovered +"</td>";
            contentHtml += "<td>" + pais.NewConfirmed +"</td>";
            contentHtml += "<td>" + pais.NewDeaths +"</td>";
            contentHtml += "<td>" + pais.NewRecovered +"</td>";
            contentHtml += "<td><a class=\"btn btn-primary\" " +
                "href=/detallePais/detallePais.html?name="+pais.Country+"&slug="+pais.Country.Slug+
                "&countryCode="+pais.CountryCode+"&caseCovid=confirmed"+ ">Ver detalle</a>" +
                "                        </td>";
            contentHtml += "</tr>";
        });
            $("#body-paises").html(contentHtml);

        }).fail(function (err) {
            console.log(err);
            alert("ocurrió un error al cargar la página");
        });
}
function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    // TODO
    const muertesA=a.TotalConfirmed;
    const muertesB=b.TotalConfirmed;

    let comparison=0;
    if(muertesA<muertesB){
        comparison=1;
    }else if(muertesA>muertesB){
        comparison=-1;
    }
    return comparison;
}

function formatDate(date) {
    var fecha = date.slice(0, 10);
    fecha = fecha.replace("-", "/");
    fecha = fecha.replace("-", "/");
    return fecha;
}