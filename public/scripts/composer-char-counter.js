$(document).ready(function() {
  $("#tweet-text").on('input', function(event) {
    const value = $("#tweet-text").val()
    let textContents = 140 - value.length
    $("#new-tweet-characters-remaining").val(textContents)
    if (textContents < 0) {
      $("#new-tweet-characters-remaining").css({ "color":"red" })
    } else if (textContents >= 0) {
      $("#new-tweet-characters-remaining").css({ "color":"grey" })
    }
  });
})
