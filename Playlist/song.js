/* Song class */

/* 
* this class will have the same property of media's adding to that the artist
*/
function Song(artist, title, duration, isPlaying) {
  this.artist = artist;
  this.audio = new Audio();
  Media.call(this, title, duration, isPlaying);
}

// creating the Song prototype from the Media proto
Song.prototype = Object.create(Media.prototype);

// replacing the constructor of Song (wich for the moment is Media) with Song
Song.prototype.constructor = Song;

// the play method will set the song as being played(vis versa for stop)
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
