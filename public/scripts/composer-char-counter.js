$(document).ready(function() {
  /*
  monitors the number of characters in a tweet thats being created
  starting at 140, counts down on every input
  if the user goes over 140 characters the text goes red
  */
  $("#tweet-text").on('input', function(event) {
    const value = $("#tweet-text").val();
    let textContents = 140 - value.length;
    $("#new-tweet-characters-remaining").val(textContents);
    if (textContents < 0) {
      $("#new-tweet-characters-remaining").css({ "color":"red" });
    } else if (textContents >= 0) {
      $("#new-tweet-characters-remaining").css({ "color":"#373737" });
    }
  });
});
