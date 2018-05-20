/**
 * Created by emk on 05/07/2018.
 */

var body_el = document.getElementsByTagName('body');
var header_el = document.getElementsByTagName('header');
var logo_div = document.getElementById('going');
var location_bar = document.getElementById('location');
var location_name = document.getElementById('location-name');
var location_list = document.getElementById('location-list');
var page_content = document.getElementById('content');

window.addEventListener('DOMContentLoaded', function() {
  
  	console.log('window - DOMContentLoaded - capture'); // 1st

  	location_bar.style.display = 'block';
  	page_content.style.display = 'block';

  	logo_div.addEventListener("animationend", function() {
  		location_bar.style.display = 'block';
  		page_content.style.display = 'block';
  		header_el[0].style.marginTop = '-1px';
  		body_el[0].style.backgroundColor = 'white';
  		console.log('anim ended');
  	}, false);
	//el.addEventListener("animationstart", function() {}, false);
	//el.addEventListener("animationiteration", function() {}, false);

  //logo_div.classList.add("logo-to-view");
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
       

}, true);


