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
    searchFor = searchFor.split(",");

    for(var i in searchFor){
        searchFor[i] = searchFor[i].replace(' ', '');
    }
    
    

    for(var i in data){
        for(var j = 0; j<searchFor.length;j++){
            console.log(searchFor[j])
            if(data[i]['borough'].toLowerCase().replace(' ', '') == searchFor[j].toLowerCase().replace(' ', '')){
                resultNum+=1;
                build += Mustache.render(template, data[i])
                
            }

        }
        
        
    }
    
    $('#sResults').text(resultNum)
    $('#dataReturn').html(build);
}
var dropbox = false;
var dText = ' text'

function switchHead(){
    if(!dropbox){
        dropbox =  true;
        dText = 'drop down menu';

        $('#method').animate({
            'width':'-100vw'
        },300,function(){
            $('#method').html(dText)
            $('#method').animate({
                'width':'100%'
            },100);
        });

        $('#input1').animate({
            'width':'0vw'
        },200,function(){
            
            $('#input2').animate({
                'width':'10vw',
                'display':'inline'
            },200);
        });

    }else{
        dropbox =  false;
        dText = 'text';

        $('#method').animate({
            'width':'-100vw'
        },300,function(){
            $('#method').html(dText)
            $('#method').animate({
                'width':'100%'
            },100);
        });

        $('#input2').animate({
            'width':'0vw'
        },200,function(){
            $('#input1').animate({
                'width':'10vw',
                'display':'inline'
            },200);
        });

       
    }

    
    
}

getData();

$(document).ready(function(){
    $('#loading').css('pointer-events',' none')
    $('#loading').addClass('fadeOut')
    $(this).scrollTop(0);

    $('#title').click(switchHead)

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
            }, 500);
        }else{
            $('#map').animate({
                'left':'0'
            },400,function(){buildData(gData)});
            //$('body').css('overflow-x','scroll')
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