/*
- Your work must include JavaScript with Mustache, jQuery, HTML and CSS.
- You must display a stand-alone Google Map (within a container) using location information.
- Extra credit for teams that use features such as Bootstrap (a framework for responsive web design)
*/

function renderMap() {
    var latlng = new google.maps.LatLng(39.305, -76.617);
    var mapProp= {
        center: latlng,
        zoom:5,
    };
    var map=new google.maps.Map(document.getElementById("body"),mapProp);
}
function getData(){
    $.getJSON( 'https://data.cityofnewyork.us/resource/vvv6-q4xc.json', function( data ) {
        buildData(data)
    });
}
function buildData(data){
    
    var template = document.getElementById('mainTempl').innerHTML
    var build = '';
    for(var i in data){
        build += Mustache.render(template, data[i])
    }
    document.getElementById('bcont').innerHTML += build;
    console.log(build)
}

window.onload = getData