
$(document).ready(function () {
    $.ajax({
        method: "GET",
        datatype: "json",
        url: "https://api.covid19api.com/summary"
    }).done(function (data) {
        console.log(data);
        //TODO
    }).fail(function (err) {
        console.log(err);
        alert("ocurrió un error al cargar la página");
    });
});

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    // TODO
}

function formatDate(date) {
    // TODO
}