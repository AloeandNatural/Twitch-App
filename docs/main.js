var streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "McLoken"
];

streamers.forEach(function(element) {
  // get streaming info
  $.getJSON(
    "https://wind-bow.glitch.me/twitch-api/streams/" + element + "?callback=?",
    function(json) {
      // if live, add info for JSON stream
      if (json.stream !== null) {
        $(
          "<div class='user online'><span class='icon'><img src=" +
            json.stream.channel.logo +
            "></span><span class='username'><a target=_blank href=\"https:\\\\www.twitch.tv\\" +
            json.stream.channel.name +
            '">' +
            json.stream.channel.display_name +
            "</a><div class='status'>" +
            json.stream.channel.status.substr(0, 35) +
            "..." +
            "</div><span class='icon-active'><i class='fa fa-smile-o'></i></span></div>"
        ).appendTo("#twitch-content");
      }
      // if not live, make another json request and use that info to add info
      else {
        $.getJSON(
          "https://wind-bow.glitch.me/twitch-api/users/" +
            element +
            "?callback=?",
          function(json2) {
            $(
              "<div class='user offline'><span class='icon'><img src=" +
                json2.logo +
                "></span><span class='username'><a target=_blank href='https:\\\\www.twitch.tv\\" +
                json2.name +
                "'>" +
                json2.display_name +
                "</a><div class='status'></div><span class='icon-inactive'><i class='fa fa-frown-o'></i></span> </div>"
            ).appendTo("#twitch-content");
          }
        );
      }
    }
  );
});

/****** Twitch user toggling *****/

// toggle tabs when clicking
$("#tabs").on("click", ".tab", function() {
  $(".active").removeClass("active");
  $(this).addClass("active");
});

// show all users
$("#all").on("click", function() {
  $(".online").show("drop", 500);
  $(".offline").show("drop", 500);
});

// show online users
$("#online").on("click", function() {
  $(".offline").hide("drop", 500);
  $(".online").show("drop", 500);
});

// show offline users
$("#offline").on("click", function() {
  $(".online").hide("drop", 500);
  $(".offline").show("drop", 500);
});
