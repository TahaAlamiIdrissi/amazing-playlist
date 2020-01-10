function Media(title, duration, isPlaying) {
  this.title = title;
  this.duration = duration;
  this.isPlaying = false;
}
Media.prototype = {
  play: function() {},
  stop: function() {},
  toHTML: function() {},
  getTitle: function() {
    return this.title;
  }
};







//let songOne = new Song("tomjerry", 1, false);
/* let songTwo = new Song("looneytunes", 1, false);
let songThree = new Song("close", 1, false); */

/* let arrayOfSongs = ["tomjerry", "looneytunes", "close"];

const arrayOfSongsTag = document.getElementById("arrayOfSongs");
const audioPlayer = document.getElementById("audioPlayer");

arrayOfSongs.forEach(s => {
  let li = document.createElement("li");
  let a = document.createElement("a");

  arrayOfSongsTag.appendChild(li);
  li.appendChild(a);
  a.setAttribute("href", `./resources/audio/${s}.mp3`);
  a.innerHTML = `${s}`;
  a.addEventListener("click", e => {
    e.preventDefault();
    audioPlayer.setAttribute("src", e.target);
  });
}); */
