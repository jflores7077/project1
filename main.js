/*
- Your work must include JavaScript with Mustache, jQuery, HTML and CSS.
- You must display a stand-alone Google Map (within a container) using location information.
- Extra credit for teams that use features such as Bootstrap (a framework for responsive web design)
---Javier F.
*/

//Load data into gData to store locally
var gData = {};
var finishedLoading = false;

var dropbox = false;
var dText = ' text'

//Load data
getData();

$(document).ready(function(){
    $(this).scrollTop(0);
    removeOverlay();

    //on click run switchHead
    $('#title').click(function(){
        switchHead(dropbox,dText)
    })

    //Click back on map to go back to landing
    $('#info_search').click(goSearch);

    //Clickon search button
    $('#btn').click(function(){
        searchBtn(dropbox)
        $('#input1').blur();
    })
    //Press enter to search
    $('body').on('keyup', '#input1', function (event) {
        if(!dropbox){
            //prevent default action
            event.preventDefault();
            //Enter runs dropbox
            if (event.keyCode === 13) {
                searchBtn(dropbox)
                $('#input1').blur();
            }
        }
    });

    //On hover of headCont
    $('#headCont').hover(function(){
        $('#search input').toggleClass('addAnim');
        $('#search input').toggleClass('removeAnim');
    });

    //.click does not work on new elements, elements added after dom.ready()
    $('body').on('click', '.p_mapLink', function () {
        var panel = $(this).parent(); 
        var lat = $(panel).find('.lat').text()
        var lng = $(panel).find('.lng').text()
        renderMap(lat,lng)
    });
});