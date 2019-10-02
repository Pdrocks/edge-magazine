/* scripts.js
 * JavaScript functions for The Edge Magazine.
 * Author: Christina Holden
 * September 2015
 *
 * Source:
 *  For the CSS used for the menu slide: Mary Lou of CodDrops,
 *  http://tympanus.net/codrops/2013/04/17/slide-and-push-menus/
 *  For Google Custom Search API, https://developers.google.com/custom-search/docs/tutorial/introduction?hl=en
 *  For Disqus API, https://disqus.com
 */

/*
 * This object stores a master list of navigational links.
 * It is used to instantiate a dynamic menu including all or part of the list.
 * Parameter firstItemIndex: index of the first link to include on the menu.
 * Parameter lastItemIndex: index of the last link to include on the menu.
 */
function Menu (firstItemIndex, lastItemIndex) {
  var menuItems = new Array (
    '<li><a class="button" id="title" href="index.html">Home</a></li>',
    '<li><a class="button" href="events.html">What\'s Happening</a></li>',
    '<li><a class="button" href="submission-guidelines.html">Make a Contribution</a></li>',
    '<li><a class="button" href="resources.html">Find a Resource</a></li>',
    '<li><a class="button submenu" href="#">Sections<span>&nbsp;&nbsp;&#x25bc;</span></a><ul>',
        '<li><a class="button" href="social-issues.html">Social Issues</a></li>',
        '<li><a class="button" href="environment.html">The Environment</a></li>',
        '<li><a class="button" href="sustainable-living.html">Sustainable Living</a></li>',
        '<li><a class="button" href="solutions.html">Solutions</a></li>',
        '<li><a class="button" href="reviews.html">Reviews</a></li></li></ul>',
    '<li><a class="button submenu" href="#">About Us<span>&nbsp;&nbsp;&#x25bc;</span></a><ul>',
        '<li><a class="button" href="about.html">About</a></li>',
        '<li><a class="button" href="contributors.html">Contributers</a></li>',
        '<li><a class="button" href="policies.html">Policies</a></li>',
        '<li><a class="button" href="contact-form.html">Contact Us</a></li></li></ul>'
  );
  this.firstIndex = firstItemIndex;
  this.lastIndex = lastItemIndex +1;
  this.length = menuItems.length;
  this.menu;
  if (this.lastIndex != length) {
    this.menu = menuItems.slice(this.firstIndex, this.lastIndex);
  }
  else {
    this.menu = menuItems.slice(this.firstIndex);
  }
}

/*
 * Loads the menu into a variable that is then sent to the page at a specified * point in the DOM.
 * Parameter elementId: the id of the DOM element to which the menu will be   * added.
 */
Menu.prototype.addToPage = function(elementId) {
  var element = document.getElementById(elementId);
  var markup = "";
  for (var i = 0; i < this.lastIndex; i++) {
    var link = this.menu[i];
    markup = markup + link;
  }
  element.innerHTML = markup;
}

 /*
  * Instantiates a Menu object that includes all navigational links.
  */
var slideMenu = new Menu (0, 14);

/*
 * Toggles the navigation menu on and offscreen.
 */
function slide () {
  $("#icon").click(function(){
    $("#slide-menu").toggleClass("on-screen", "off-screen");
  });
}
/*
 * Gives accordian behaviour to the slide navigation menu.
 */
function dropDown() {
  $("#slideMenu ul")
  .hide()
  .click(function(event) {
    event.stopPropagation();
  });
  $(".submenu").toggle(function() {
    $(this).siblings().slideDown()
    // Use unicode to emulate an open and closed indicator icon
    $(this).find("span").replaceWith('<span>&nbsp;&nbsp;&#x25b2;</span>');
  }, function() {
    $(this).siblings().slideUp();
    $(this).find("span").replaceWith('<span>&nbsp;&nbsp;&#x25bc;</span>');
  });
}
/*
 * Collapses and expands table menus, allowing only one table to be visible at * a time.
 */
function toggleTable () {
  $("#resources table").attr("class", "collapse");
  $("h3").click (function() {
      if ($(this).next().attr("class") == "expand") {
        $(this).next().attr("class", "collapse");
      }
      else {
        $("#resources table").attr("class", "collapse");
        $(this).next().attr("class", "expand");
      }
  })
}
/*
 * Runs functions needed on page load. More can be added as needed without    * having to add anything to the markup.
 * Called onload of body element.
 */
function loadScripts() {
  slideMenu.addToPage("slideMenu");
  slide();
  dropDown();
  toggleTable();
}

$(document).ready(function(){
  // Load home page article blurbs into the sidebar navigation of each page.
  if (document.documentElement.clientWidth > 680) {
    $("#search").html("<h2>Search</h2>");
    $("#links").html("<h2>Recent Articles</h2>");
    $("#events").html("<h2>Upcoming Events</h2>");
    $("#sidebarLinks").load("index.html #front-page .info");
    $("#sidebarLinks-home").load("events.html #event-list");
  };
  if (document.documentElement.clientWidth < 680) {
    $("<gcse:searchbox-only></gcse:searchbox-only>").insertBefore("footer");
  };
  // Google custom search load function
  (function() {
    var cx = '000069724499995381963:we-mqoczkqs';
        var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
  // Disqus load function
  (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//edgemagazine.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  })();
});

