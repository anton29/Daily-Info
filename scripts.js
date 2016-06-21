// using simple weather http://simpleweatherjs.com/
$(document).ready(function() {  
  var tonightPhase = getMonnPhase();
  var tonightPhaseName = phaseName(tonightPhase);
  getWeather(); //Get the initial weather.
  GetClock();   //Get Time/Date
  setInterval(getWeather, 600000); //Update the weather.
  setInterval(GetClock,1000);      //Update the Time.
  document.getElementById("MoonPhase").innerHTML ="Tonight's MoonPhase is: " + tonightPhaseName;
});

//weather functions start

function getWeather() {
  $.simpleWeather({
    location: 'Bronx,NY',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';  
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

//weather functions end


//from http://www.ricocheting.com/code/javascript/html-generator/date-time-clock
//Clock start
tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");

function GetClock(){
var d=new Date();
var nday=d.getDay(),nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
if(nyear<1000) nyear+=1900;
var nhour=d.getHours(),nmin=d.getMinutes(),ap;
if(nhour==0){ap=" AM";nhour=12;}
else if(nhour<12){ap=" AM";}
else if(nhour==12){ap=" PM";}
else if(nhour>12){ap=" PM";nhour-=12;}

if(nmin<=9) nmin="0"+nmin;

document.getElementById('clockbox').innerHTML=""+tday[nday]+", "+tmonth[nmonth]+" "+ndate+", "+nyear+" "+nhour+":"+nmin+ap+"";
}
//clock end


//Monn Phase start
var  moon_phase_name = [ "New",
            "Waxing crescent",
            "First quarter",
            "Waxing gibbous",
            "Full",
            "Waning gibbous",
            "Third quarter",
            "Waning crescent" ];

var day_year = [ -1, -1, 30, 58, 89, 119,
            150, 180, 211, 241, 272,
            303, 333 ];


function moonPhase(year, month, day) {

        var             phase;          // Moon phase
        var             cent;           // Century number (1979 = 20)
        var             epact;          // Age of the moon on Jan. 1
        var             diy;            // Day in the year
        var             golden;         // Moon's golden number

        if (month < 0 || month > 12) month = 0;     // Just in case
        diy = day + day_year[month];                // Day in the year
        if ((month > 2) && isLeapYearP(year))
            diy++;                                  // Leapyear fixup
        cent = (year / 100) + 1;                    // Century number
        golden = (year % 19) + 1;                   // Golden number
        epact = ((11 * golden) + 20                 // Golden number
                + (((8 * cent) + 5) / 25) - 5       // 400 year cycle
                - (((3 * cent) / 4) - 12)) % 30;    //Leap year correction
        if (epact <= 0)
            epact += 30;                        // Age range is 1 .. 30
        if ((epact == 25 && golden > 11) ||
                epact == 24)
            epact++;

        // Calculate the phase, using the magic numbers defined above.
        // Note that (phase and 7) is equivalent to (phase mod 8) and
        // is needed on two days per year (when the algorithm yields 8).

        phase = (((((diy + epact) * 6) + 11) % 177) / 22) & 7;
//        System.out.println(moon_phase_name[phase]);
        return(phase);
    }

function isLeapYearP(year) {
        return ((year % 4 == 0) &&
                ((year % 400 == 0) || (year % 100 != 0)));
}


function phaseName(phase) {
//      System.out.println(moon_phase_name[phase]);
        return moon_phase_name[phase];
}

function getMonnPhase(){
    var now = new Date();
    var currentYear = now.getFullYear();
    var currentMonth = now.getMonth()+1;
    var currentDay = now.getDate();


    return moonPhase(currentYear, currentMonth, currentDay);

}

$(document).ready(function() {  

   console.log(tonightPhase)
   console.log(tonightPhaseName)
   document.getElementById("MoonPhase").innerHTML ="Tonight's MoonPhase is: " + tonightPhaseName;


});
//MoonPhase End

