$(function() {
    
			$(document).ready(function(){
				$('.charms-arrow').trigger('click');
			});
    
    // charms initialization
    $('.charms-arrow').click(function () {
        $('#charms').animate({ width: "240px" }, 500);

    });
    $('#charms .backbutton').click(function () {
        $('#charms').animate({ width: "0px" }, 500);
    });

    $('#marker_link').click(function () {
        $('.charm-box').show(500);
    });

    $('#charm-box .backbutton').click(function () {
        $('.charm-box').hide(500);
    });
    
    $('#navigation a').hover(
        function () { $(this).addClass('ui-state-hover'); },
        function () { $(this).removeClass('ui-state-hover'); }
    );

	
	$('#openFileLink').bind("click" , function () {
        $('#files').click();
    });
	
    // dialog			
    $('#search').dialog({
        autoOpen: false,
        width: 600,
        modal: true,
        buttons: {
            "Ok": function() {
                $(this).dialog("close");
            },
            "Cancel": function() {
                $(this).dialog("close");
            }
        }
    });

    // Dialog Link
    $('#search_link').click(function() {
        $('#search').dialog('open');
        return false;
    });
	        
    $('#query').bind('change', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
       // $.mobile.showPageLoadingMsg();

        // Prevent form send
        e.preventDefault();

        var searchUrl = 'http://ws.geonames.org/searchJSON?featureClass=P&maxRows=10';
        searchUrl += '&name_startsWith=' + $('#query')[0].value;
        $.getJSON(searchUrl, function(data) {
            $.each(data.geonames, function() {
                var place = this;
                $('<li>')
                    .hide()
                    .append($('<h2 />', {
                        text: place.name
                    }))
                    .append($('<p />', {
                        html: '<b>' + place.countryName + '</b> ' + place.fcodeName
                    }))
                    .appendTo('#search_results')
                    .click(function() {
                        //$.mobile.changePage('#mappage');
                        $('#search').dialog('close');
                        var lonlat = new OpenLayers.LonLat(place.lng, place.lat);
                        map.setCenter(lonlat.transform(gg, sm), 10);
                    })
                    .show();
            });
           // $('#search_results').listview('refresh');
           // $.mobile.hidePageLoadingMsg();
        });
    });

});