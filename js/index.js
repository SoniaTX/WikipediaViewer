$(document).ready(function () {
  
    $("input").keydown(function(){
        $("input").css("background-color", "yellow");
    });
    $("input").keyup(function(){
        $("input").css("background-color", "pink");
    });
  
     $( ".fa-refresh" ).on( "click", function ( event ) {
    $( "#articles" ).empty();
    $( "#searchTerm" ).val("");
    $("i").css("display");
   
  });
  
  
    var articles = $('.articles');
    var input = $('input');
    var button = $('button');
    var toSearch = '';
    var searchUrl = 'https://en.wikipedia.org/w/api.php';

  
    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            dataType: 'jsonp',
            data: {
            action: 'query',
            format: 'json',
            generator: 'search',
            gsrsearch: toSearch,
            gsrnamespace: 0,
            gsrlimit:  20,
            prop: 'extracts|pageimages',
            exchars: 300,
            exlimit: 'max',
            explaintext: true,
            exintro: true,
            piprop: 'thumbnail',
            pilimit: 'max',
            pithumbsize: 600
            },
            success: function (json) {
                var pages = json.query.pages;
                $.map(pages, function (page) {
                    var pageElement = $('<div>');
                  
                  
 pageElement.append($('<h2>').append($('<a>').attr('target', '_blank').attr('href', 'http://en.wikipedia.org/wiki/'  + page.title).text(page.title)));

                    if (page.thumbnail) pageElement.append($('<img>').attr('width', 250).attr('src', page.thumbnail.source));

                  pageElement.append($('<p>').text(page.extract));

                     pageElement.append($('<hr class="bigHr">'));
 
                    articles.append(pageElement);
                  
                    
                });
            }
        });
    };      
             
    input.autocomplete({
        source: function (request, response) {
            $.ajax({
                url: searchUrl,
                dataType: 'jsonp',
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function (data) {
                    response(data[1]);
                }
            });
        }
    });
    
    button.click(function () {
        articles.empty();
        toSearch = input.val();
        ajaxArticleData();
    
   });
 
});