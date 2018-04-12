/*
- Your work must include JavaScript with Mustache, jQuery, HTML and CSS.
- You must display a stand-alone Google Map (within a container) using location information.
- Extra credit for teams that use features such as Bootstrap (a framework for responsive web design)
---Javier F. 
---Matthew
*/

//custom alert box
var jf = {
    alert: function(txt){
        var d = document.createElement('div');
        var dTxt = txt;
        $(d).text(dTxt);
        $(d).addClass('popMsg');
        $(d).addClass('popMsgAnim');

        
        $('body').append( $(d) );
       console.log($(d).width());
       var curLeft = parseInt($(d).css("left"));
       var newOffset = $(d).width()/2;
       $(d).css({
           left:  curLeft - newOffset,
       })
    }
};

//Load data into gData to store locally
var gData = {};
var finishedLoading = false;

//Store boolean on which search method is being used
var dropbox = false;
var dText = ' text'

//Load data
getData();

//Document is ready
$(document).ready(function(){
    $(this).scrollTop(0);
    removeOverlay();
    jf.alert('welcome')
    //on click run switchHead
    $('#title').click(function(){
        switchHead(dropbox,dText)
    })

    //Click back on map to go back to landing
    $('#info_search').click(goSearch);

    //Clickon search button
    $('#btn').click(function(){
        if(searchBtn(dropbox)){
            jf.alert('Use shift + middle mouse to see more items');
        }
        
        $('#input1').blur();
    })
    //Release enter to search
    $('body').on('keyup', '#input1', searchEnter);

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