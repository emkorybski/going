/**
 * Created by emk on 02/01/2016.
 */
$(window).load(function() {
    $('#going').delay(600).animate({ zoom :0.7, top: 40 }, 500);
    $('header').delay(1200).animate({ marginTop: 0 }, 400, function(){
        $('body').css({ backgroundColor: '#efefef' });
        $('#location').fadeIn('fast');
        //$('#content').fadeIn('fast');

        // handle choosing location
        $("#location-list li a").on("click", function(){
            if($("#events-list:not(:empty)")){
                $("#events-list").empty();
            }
            $('#preloading').show('fast');
            //$('#location').slideUp('fast');
            $("#location-name").slideDown("fast");
            var city_name = $(event.currentTarget).data("lastValue");
            console.log(city_name);
            $("#location-name").text(city_name);

            $('#content').fadeIn('fast');

            // populate event list
            var url = 'http://db9939e9b6.testurl.ws/events/city/' + city_name;
            $.ajax({
                type: 'GET',
                url: url,
                //async: false,
                crossDomain: true,
                success: function(json) {
                    var data = $.parseJSON(json);
                    console.log(data);
                    $.each(data, function (id, el) {

                        $("#events-list").append(
                            "<li class='card'>" +
                            "<p>" + el.evt + "</p>" +
                            "</li>"
                        );
                    });
                    $('#preloading').hide('fast');

                },
                error: function(e) {
                    console.log(e.message);
                }
            });
        });

        // tabs
        $("ul#tabs li button").on("click", function(e){
            if (!$(this).hasClass("active")) {
                var tabNum = $(this).parent().index();

                $("ul#tabs button.active").removeClass("active");
                $(this).addClass("active");
                var ev_list = $("ul#events-list");
                var go_list = $("ul#goers-list");
                switch (tabNum){
                    case 1:
                        $(ev_list).removeClass("active");
                        $(ev_list).addClass("hide");
                        $(go_list).removeClass("hide");
                        $(go_list).addClass("active");
                        break;

                    case 0:
                        $(go_list).removeClass("active");
                        $(go_list).addClass("hide");
                        $(ev_list).addClass("active");
                        $(ev_list).removeClass("hide");
                        break;
                }
            }
        });
       /*
        $.getJSON( "http://localhost/tabcfeed/feed", function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
                items.push( "<li id='" + key + "'>" + val + "</li>" );
            });

            $( "<ul/>", {
                "class": "my-new-list",
                html: items.join( "" )
            }).appendTo( "#events" );
        });
        */
    });
});



