$(document).ready(function() {
  //This function is called later on, and mutated with specific values to generate
  //and display all old tweets on our webpage
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
      <div id="old-tweet-text">${escape(tweetData.content.text)}</div>
      <footer id="old-tweet-footer">
        <div id="post-created-date">${timeago.format(tweetData.created_at)}</div>
        <div id="post-links">
          <i id='post-report' class="fas fa-flag"></i>
          <i id='post-retweet' class="fas fa-retweet"></i>
          <i id='post-like' class="fas fa-heart"></i>
        </div>
      </footer>
    </article>
    `;
  return $html;
  };
  // Creates an error message and applies it to our "#error-message" div
  const createErrorMessage = function($error) {
      $('#error-message').text($error);
  }
  /*
  renderTweets loops through all of our tweets in our database,
  It calls createTweetElement on each iteraction, and prepends it to our #old-tweet-section
  Filling out the relevant information in the $html variable
  prepend allows the tweets to be added in order from most recent ->
  */
  const renderTweets = function(tweetsArray) {
    for (let i = 0; i < tweetsArray.length; i++) {
      let valHold = createTweetElement(tweetsArray[i]);
      $('#old-tweet-section').prepend(valHold);
    }
  };

  /*
  loadTweets sends a get request to our database at /tweets/,
  once it recieves this information, it fulfills its promise which then,
  empities all values currently stores in #old-tweet-section to prevent duplicates,
  calls createErrorMessage with an empty string, to clear any excisiting error messages in our newtweet
  and renders our tweets using the result from our get request,

  and running our renderTweets function with our result as a parameter
  */
  const loadTweets = () => {
    $.ajax('/tweets/', { method: "GET" })
    .then((result) => {
      $('#old-tweet-section').empty();
      tweetClearer();
      createErrorMessage('');
      renderTweets(result);
    });
  }
  // loads any existing tweets on first webpage load, so the webpage isn't empty
  loadTweets();

  /*
  When a user clicks our Tweet button, an event is fired,
  stops the default of a redirect,
  checks for error conditions of 
    - no text
    - over 140 characters of text
  then sends a post request of our information to /tweets 
  and after the post request is complete we run loadTweets so we can
  refresh our current tweets and see the most recently created tweet
  */
  $("#post-tweet").on('submit', function(event) {
    event.preventDefault();
    if ($("#tweet-text").val().length > 140) {
      return createErrorMessage("Oh no! Your tweet is too long!");
    } 
    if ($("#tweet-text").val().length === 0 || $("#tweet-text").val().length === null) {
      return createErrorMessage('Oh no! Your tweet is too short!');
    } else {
    $.ajax('/tweets/', { method: "POST", data: $(`#tweet-text`)})
    .then(() => {
      loadTweets();
    })
  }})
  
  // when a user submits a post, the tweet-text field is cleared,
  // and our characters remaining field is reset
  const tweetClearer = function() {
    $("#tweet-text").val('');
    $("#new-tweet-characters-remaining").text(140);
  }
  // escape function safely grabs data from our server to prevent xss
  // more info on xss here: https://owasp.org/www-community/attacks/xss/
  // stops users from injecting javascript code into our frontend.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
})


