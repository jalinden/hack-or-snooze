"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  $myStoriesList.hide();
  $submitForm.hide();
  $favoritedStoriesList.hide();
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $loginForm.hide();
  $signupForm.hide();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  $myStoriesList.hide();
  $favoritedStoriesList.hide();
  $submitForm.show();
  $allStoriesList.show();

}

$navSubmit.on("click", navSubmitClick);

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt)
  $myStoriesList.hide();
  $allStoriesList.hide();
  $submitForm.hide();
  $favoritedStoriesList.show();

}

$navFavorites.on("click", navFavoritesClick)

function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  $allStoriesList.hide();
  $submitForm.hide();
  $favoritedStoriesList.hide();
  $myStoriesList.show();
}
$navMyStories.on("click", navMyStoriesClick)