"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  
  $allStoriesList.show();
}

async function putNewStoryOnPage(evt) {
  evt.preventDefault();
  let author = $("#create-author").val();
  let title = $("#create-title").val();
  let url = $("#create-url").val();
  let newStory = await storyList.addStory(currentUser, {title: title, author:author, url:url});
  let $newStory = generateStoryMarkup(newStory)
  $allStoriesList.prepend($newStory);

  $submitForm.trigger("reset");
  $submitForm.hide();
  updateMyStories();
}

$submitForm.on("submit", putNewStoryOnPage)


function updateFavorites(){
  $favoritedStoriesList.empty();
  for(let fav of currentUser.favorites) {
    let $fav = generateStoryMarkup(fav)
    $favoritedStoriesList.append($fav)
  }
}  

function updateMyStories() {
  $myStoriesList.empty();
  for(let myStory of currentUser.ownStories){
    let $myStory = generateStoryMarkup(myStory, true)
    $myStoriesList.append($myStory)
  }
}

$allStoriesList.on("click", async function(evt) {
    if(evt.target.classList.contains("far")){
      let clickedItem = evt.target;
      let parentId = clickedItem.closest("li").id
      await User.addStoryToFavorites(currentUser.username,parentId,currentUser.loginToken)
      clickedItem.classList.replace("far", "fas")
    }
    else if(evt.target.classList.contains("fas")){
      let parentId = evt.target.closest("li").id
     await User.removeStoryFromFavorites(currentUser.username,parentId,currentUser.loginToken)
      evt.target.classList.replace("fas", "far")
    }
  })

$favoritedStoriesList.on("click", function(evt){
    let parentId = evt.target.closest("li").id
    User.removeStoryFromFavorites(currentUser.username,parentId,currentUser.loginToken)
    evt.target.classList.replace("fas", "far")
  })
$myStoriesList.on("click", function(evt) {
  console.log(evt.target)
    if(evt.target.classList.contains('fas')){
    let parentId = evt.target.closest("li").id
    storyList.removeStory(parentId)
    evt.target.closest("li").remove();
    }
  })
    
