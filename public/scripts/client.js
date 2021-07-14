/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
const createTweetElement = function(tweetData) {
  const $html = 
  `
  <article id="old-tweet-article">
    <header id="old-tweet-header">  
      <div id="old-tweet-name">
        <img id="old-tweet-profile-photo" src="${tweetData.user.avatars}">
        <h4 id="old-tweet-name-text">${tweetData.user.name}</h4>
      </div>
      <h4 id="old-tweet-handle">${tweetData.user.handle}</h4>
    </header>
    <div id="old-tweet-text">${tweetData.content.text}</div>
    <footer id="old-tweet-footer">
      <div id="post-created-date">${timeago.format(tweetData.created_at)}</div>
      <div id="post-links">
        <i id='post-report' class="fas fa-flag"></i>
        <i id='post-retweet' class="fas fa-retweet"></i>
        <i id='post-like' class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
  `
  return $html
  }

//$('#old-tweet-section').append(createTweetElement(tweetData));

  const renderTweets = function(tweetsArray) {
    for (let i = 0; i < tweetsArray.length; i++) {
      let valHold = createTweetElement(tweetsArray[i])
      $('#old-tweet-section').prepend(valHold)
    }
  }

  const loadTweets = () => {
    $.ajax('/tweets/', { method: "GET" })
    .then((result) => {
      $('#old-tweet-section').empty()
      tweetClearer()
      renderTweets(result)
    })
  }

  loadTweets()

  $("#post-tweet").on('submit', function(event) {
    event.preventDefault()
    if ($("#tweet-text").val().length > 140) {
      return alert ("Error: Tweet length exceeds maximum allowed.")
    } 
    if ($("#tweet-text").val().length === 0 || $("#tweet-text").val().length === null) {
      return alert ("Error: Tweet cannot be empty.")
    } else {
    $.ajax('/tweets/', { method: "POST", data: $(`#tweet-text`)})
    .then(() => {
      loadTweets()
    })
  }})

  const tweetClearer = function() {
    $("#tweet-text").val('')
    $("#new-tweet-characters-remaining").text(140)
  }

  
  // this will load tweets on page load
  

})


