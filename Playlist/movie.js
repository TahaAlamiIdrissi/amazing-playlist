/* Movie Class */

/* 
* Movie will have the same property as Media adding to that the year of apparition
*/
function Movie(year, title, duration, isPlaying) {
  this.year = year;
  // Calling the Constructor of Media
  Media.call(this, title, duration, isPlaying);
}
// creating the Movie prototype from the Media proto
Movie.prototype = Object.create(Media.prototype);

// replacing the constructor of Movie (wich for the moment is Media) with Movie
Movie.prototype.constructor = Movie;

// the play method will set the movie as being played(vis versa for stop)
Movie.prototype.play = function() {
  this.isPlaying = true;
  return this;
};
 
Movie.prototype.stop = function() {
  this.isPlaying = false;
};

Movie.prototype.getTitle = function() {
  return this.title;
};
Movie.prototype.toHTML = function() {};

Movie.prototype.getYear = function() {
  return this.year;
};
Movie.prototype.getDuration = function() {
  return this.duration;
};
