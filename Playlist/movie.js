function Movie(year, title, duration, isPlaying) {
  this.year = year;

  Media.call(this, title, duration, isPlaying);
}

Movie.prototype = Object.create(Media.prototype);
Movie.prototype.constructor = Movie;

Movie.prototype.play = function() {
  this.isPlaying = true;
  return this;
};
Movie.prototype.stop = function() {
  console.log("MOUT");

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
