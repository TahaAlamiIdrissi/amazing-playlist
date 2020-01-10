function Song(artist, title, duration, isPlaying) {
  this.artist = artist;
  this.audio = new Audio();
  Media.call(this, title, duration, isPlaying);
}

Song.prototype = Object.create(Media.prototype);
Song.prototype.constructor = Song;

Song.prototype.play = function() {
  this.audio.src = `./resources/audio/${this.title}.mp3`;
  this.audio.play();
  this.isPlaying = true;
  return this;
};
Song.prototype.stop = function() {
  this.audio.ended = true;
  this.audio.pause();
  this.isPlaying = false;
};

Song.prototype.getTitle = function() {
  return this.title;
};
Song.prototype.toHTML = function() {};

Song.prototype.getArtist = function() {
  return this.artist;
};

Song.prototype.getDuration = function() {
  return this.duration;
};
