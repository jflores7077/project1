//Render map
function renderMap(x,y) {

    //Coordinates
    var latlng = new google.maps.LatLng(x, y);
    
    var map=new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 18,
    });

    google.maps.event.trigger(map, 'resize');
}

function loadedData(){
    console.log('LOADED DATA')
}

//Get data and load it into gData
function getData(){
    $.getJSON( 'https://data.cityofnewyork.us/resource/byk8-bdfw.json', function( data ) {
        gData = data
        console.log(gData)
        loadedData();
    });
}

//Build html from gData
function buildData(data,d){
    
    var template = document.getElementById('mainTempl').innerHTML
    var build = '';
    //Hold number of results
    var resultNum = 0;

    if(!d){
        //Search query
        var searchFor = $('#input1').val()
        //display search query to user
        $('#sQuery').text(searchFor)
        //Split user's response into array, slice @ ,
        searchFor = searchFor.split(",");
        //Loop through the array and get rid of any spaces
        for(var i in searchFor){
            searchFor[i] = searchFor[i].replace(/ /g, "");
        }

    }else{
        //Search query
        var searchFor = $('#input2').val()
        //display search query to user
        $('#sQuery').text(searchFor)
        
    }
    
    
    
    //Loop through data 
    for(var i in data){
        //Loop through user search query array
        for(var j = 0; j<searchFor.length;j++){
            //Convert to lowercase and remove spaces
            var newgData = data[i]['borough'].toLowerCase().replace(/ /g, "")
            if(!d){
                var newgUser = searchFor[j].toLowerCase().replace(/ /g, "")
            }else{
                var newgUser = searchFor.toLowerCase().replace(/ /g, "")
            }

            //If they're equal, add one to result num and add to build
            if(newgData == newgUser){
                resultNum+=1;
                build += Mustache.render(template, data[i])
                
            }
        }
    }
    
    //Display results
    $('#sResults').text(resultNum)
    $('#dataReturn').html(build);
}

//Remove loading screen
function removeOverlay(){
    $('#loading').css('pointer-events',' none')
    $('#loading').addClass('fadeOut')
}

//Search animation
function goSearch(){
    $('#map').animate({
        'left':'100vw'
    },400,function(){
        $('#Madeby').animate({
            'opacity':'1'
        },200)
        $('#head').animate({
            'height':'100vh'
        },200)
    });
}

//click animation on landing
function searchBtn(d){
    //Prevent animation from toggling
    $('#search input').addClass('addAnim');

    if($('#input1').val()=='' && !d){
        //Prevent search on empty query
        $('#input1').css({
            'background':'rgba(219, 57, 8, 0.9)',
            'transform':'rotate(2deg)'
        })
        setTimeout(function(){
            $('#input1').css({
                'background':'rgba(219, 57, 8, 0)',
                'transform':'rotate(0deg)'
            })
        }, 300);
    }else{
        $('#map').animate({
            'left':'0'
        },400,function(){buildData(gData,d)});
        //$('body').css('overflow-x','scroll')
        $('#dataReturn').text('')
        $('#Madeby').animate({
            'opacity':'0'
        },200)
        $('#head').animate({
            'height':'45vh'
        },200)
        
    }
    
}

//Switch from landing page to map page
function switchHead(dropboxb,dText){
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