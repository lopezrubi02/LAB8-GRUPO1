



$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const nameCountry = urlParams.get('name');
    const countryCode = urlParams.get('countryCode');
    const slug = urlParams.get('slug');
    const caseCovid = urlParams.get('caseCovid');
    //TODO
    var url = "";
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/total/dayone/country/" + slug + "/status/" + caseCovid
    }).done(function (data) {
        console.log("lo que manda en el get");
        console.log(caseCovid);
        const listacasos = data;

        var url = {};
        var d  = [];

        $.each(listacasos, function( index, value ) {
            d.push({
                "date"    : formatDate(value.Date),
                "close"  : value.Cases,
            });
        });

        url.d = d;
        console.log(JSON.stringify(url));
        $("#res").text(JSON.stringify(url));

        //-----------------------------------

        //$("#body-paises").append(contentHtml);

    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
    $('#redirect-detalle').attr("href", "../detallePais/detallePais.html?name=" + nameCountry + "&slug=" +
        slug + "&countryCode=" + countryCode + "&caseCovid=" + caseCovid);



    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 100 },
        width = 900 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%d-%m-%Y");
    // var parseTime = d3.timeParse("%d-%b-%y");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) { return x(d.date); })
        .y(function (d) { return y(d.cases); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#div-grafico").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.json(url, function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d.date = parseTime(formatDate(d.Date));
            d.cases = d.Cases;
        });

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) { return d.date; }));
        y.domain([0, d3.max(data, function (d) { return d.cases; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });


});

function formatDate(date) {
    var fecha = date.slice(0, 10);
    fecha = fecha.replace("-", "/");
    fecha = fecha.replace("-", "/");
    return fecha;
    //TODO-hecho
}