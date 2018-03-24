/*
- Your work must include JavaScript with Mustache, jQuery, HTML and CSS.
- You must display a stand-alone Google Map (within a container) using location information.
- Extra credit for teams that use features such as Bootstrap (a framework for responsive web design)
*/
var gData = {};
var finishedLoading = false;

function renderMap(x,y) {
    var latlng = new google.maps.LatLng(x, y);
    
    var map=new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 18,
    });

    console.log('map')
    google.maps.event.trigger(map, 'resize');

    /** 
    latLong = new google.maps.LatLng(47.0303105, 28.815481);
    map = new google.maps.Map(document.getElementById('canvas'), {
        center: latLong,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14
    });
    console.log("Map is ready.")
    */
}

function loadedData(){
    console.log('LOADED DATA')
}

function getData(){
    $.getJSON( 'https://data.cityofnewyork.us/resource/byk8-bdfw.json', function( data ) {
        gData = data
        console.log(gData)
        loadedData();
    });
}
function buildData(data){
    
    var template = document.getElementById('mainTempl').innerHTML
    var build = '';
    var resultNum = 0;
    var searchFor = $('#input1').val()
    $('#sQuery').text(searchFor)

    for(var i in data){
        console.log('sfor:'+searchFor.length)
        if(data[i]['borough'].toLowerCase() == searchFor.toLowerCase()){
            resultNum+=1;
            build += Mustache.render(template, data[i])
            
        }
        
    }
    
    $('#sResults').text(resultNum)
    $('#dataReturn').html(build);
}
getData();
//renderMap(data[i]['latitude'],data[i]['longitude'])
$(document).ready(function(){
    $(this).scrollTop(0);
    $('#info_search').click(function(){
        $('#map').animate({
            'left':'100vw'
        },400,function(){
            $('#head').animate({
                'height':'100vh'
            },200)
        });
    });
    document.getElementById('btn').onclick = function(){
        $('#search input').addClass('addAnim');
        if($('#input1').val()==''){
            $('#input1').css({
                'background':'rgba(219, 57, 8, 0.9)',
                'transform':'rotate(2deg)'
            })
            setTimeout(function(){
                $('#input1').css({
                    'background':'rgba(219, 57, 8, 0)',
                    'transform':'rotate(0deg)'
                })
            }, 200);
        }else{
            $('#map').animate({
                'left':'0'
            },400,function(){buildData(gData)});
            $('#dataReturn').css('overflow','visible')
            $('#dataReturn').text('')
            
            $('#head').animate({
                'height':'45vh'
            },200)
        }
        
    }

    $('#headCont').hover(function(){
        $('#search input').toggleClass('addAnim');
        $('#search input').toggleClass('removeAnim');
    });

    //.click does not work on new elements, elements added after dom.ready()
    $('body').on('click', '.p_mapLink', function () {
        var panel = $(this).parent(); 
        var lat = $(panel).find('.lat').text()
        var lng = $(panel).find('.lng').text()
        console.log(lat)
        renderMap(lat,lng)
    });
});