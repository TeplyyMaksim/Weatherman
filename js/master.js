// TODO:
// 1) Use Icons from API depends on state.lower (main.lower)
// 2) Radial gradient background depends on weather
// 3) LinkedIn link in nav                                    DONE
// 4) Debug using changing to fake coordinates                DONE
// 5) Info values - 30px                                      DONE
// 6) Write that user does not support to see weather         DONE
$(document).ready(function() {
  $('#fcswap').hide();
  $('#logo').hide();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      var myAppid = '0839f8f78d7f9f2176bfbc7f526aef92';
      var request = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + myAppid;
      $.getJSON(request, function (json) {
        /* location */
        var location = json.name;
        var country = json.sys.country;
        $('#location').html(location);
        $('#country').html(country);

        /* temperature */
        var celsium = Math.floor((json.main.temp) - 273.15);
        var farengheits = Math.floor(1.8 * ((json.main.temp) - 273.15) + 32);
        $('#temperature').html(celsium +'&#8451;');
        $('#temperature').addClass('c');
        $('#fcswap').show();
        $('#fcswap').on('click', function() {
          if ($('#temperature').hasClass('f')) {
            $('#temperature').html(celsium +'&#8451;');
            $('#temperature').addClass('c');
            $('#temperature').removeClass('f');
            $('#fcswap').html('Show in &#8457;');
          } else {
            $('#temperature').html(farengheits +'&#8457;');
            $('#temperature').addClass('f');
            $('#temperature').removeClass('c');
            $('#fcswap').html('Show in &#8451;');
          }
        });

        /* status */
        var status = json.weather[0].main;
        var statusIcon = '<img src="http://openweathermap.org/img/w/' + json.weather[0].icon + '.png" alt="logo" width="30px" height="30px">';
        $('#status').html(status);
        $('#logo').show();
        $('#logo').html(statusIcon);
      });
    });
  }
});
