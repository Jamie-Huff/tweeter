

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

  const data = [ 
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

//$('#old-tweet-section').append(createTweetElement(tweetData));

  const renderTweets = function(tweetsArray) {
    for (let i = 0; i < tweetsArray.length; i++) {
      $('#old-tweet-section').prepend(createTweetElement(tweetsArray[i]))
    }
  }

  $("#post-tweet").on('submit', function(event) {
    event.preventDefault()
    $.ajax('/tweets/', { method: "POST", data: $(`#tweet-text`)})
    .then(
      $('#old-tweet-section').empty(),
      loadTweets(renderTweets)
      )
  })

  const loadTweets = (done) => {
    $.ajax('/tweets/', { method: "GET"})
    .then(res => done(res))
  }
  // this will load tweets on page load
  loadTweets(renderTweets)

})


