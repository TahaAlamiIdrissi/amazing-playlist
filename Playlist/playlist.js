/* This is our Playlist */

/*
 * it will contain
 * - A set of songs
 * - A set of movies
 * - the current playing index
 */
function Playlist() {
  this.songs = [];
  this.movies = [];
  this.nowPlayingIndex = 0;
}
/* Getting document element in this section */
const arrayOfSongsTag = document.getElementById("arrayOfSongs");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
/* ------------------------------------------------------- */

Array.prototype.next = function() {
  return this[++this.current];
};
Array.prototype.prev = function() {
  return this[--this.current];
};
Array.prototype.current = 0;

/* Defining methods for our Playlist Object in the prototype */
Playlist.prototype = {
  // the play method will check either its a song or a movie and depending on that it will play the media
  play: function(media) {
    if (media instanceof Song) this.songs[this.nowPlayingIndex].play();
    else if (media instanceof Movie) this.movies[this.nowPlayingIndex].play();
  },

  // the setPlayingIndex will set the nowPlayingIndex property depending on the media that will be passed to this func
  setPlayingIndex: function(media) {
    if (media instanceof Song)
      this.nowPlayingIndex = this.songs.findIndex(song => song === media);
    else if (media instanceof Movie)
      this.nowPlayingIndex = this.movies.findIndex(movie => movie === media);
  },
  // return the current playing media
  getCurrentPlaying: function(media) {
    if (media instanceof Song) return this.songs[this.nowPlayingIndex];
    else if (media instanceof Movie) return this.movies[this.nowPlayingIndex];
  },
  // stop the current playing media
  stop: function(media) {
    if (media instanceof Song) this.songs[this.nowPlayingIndex].stop();
    else if (media instanceof Movie) this.movies[this.nowPlayingIndex].stop();
  },
  // initializing the sets of medias
  add: function(media) {
    if (media instanceof Song) this.songs.push(media);
    else if (media instanceof Movie) this.movies.push(media);
  },
  // sliding next in the playlist if the mod of the index +1 and the length of the set return 0 then we go back to the first media
  next: function(media) {
    if (media instanceof Song) {
      this.nowPlayingIndex = (this.nowPlayingIndex + 1) % this.songs.length;
      return this.songs[this.nowPlayingIndex];
    } else if (media instanceof Movie) {
      this.nowPlayingIndex = (this.nowPlayingIndex + 1) % this.movies.length;
      return this.movies[this.nowPlayingIndex];
    }
  },
  // sliding back
  previous: function(media) {
    this.nowPlayingIndex--;
    if (media instanceof Song) {
      this.nowPlayingIndex =
        this.nowPlayingIndex < 0 ? this.songs.length - 1 : this.nowPlayingIndex;
      return this.songs[this.nowPlayingIndex];
    } else if (media instanceof Movie) {
      this.nowPlayingIndex =
        this.nowPlayingIndex < 0
          ? this.movies.length - 1
          : this.nowPlayingIndex;
      return this.movies[this.nowPlayingIndex];
    }
  },
  renderInElement: function() {
    // this flag will let us handle the visual part for showing the PAUSE and PLAY BUTTONS
    let flag = false;
    // creating the frame
    let ifrm = document.createElement("iframe");

    // we create dynamically each song in the set
    this.songs.forEach(s => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      //console.log(s)
      arrayOfSongsTag.appendChild(li);
      li.appendChild(a);

      // then on click we prevent its default behaviour and for each other media we check if its playing then we stop it
      a.addEventListener("click", e => {
        e.preventDefault();
        // we parse each movie and each song to see if isPlaying is set to true  if so we stop it
        this.movies.forEach(m => {
          if (m.isPlaying == true) {
            this.getCurrentPlaying(m).stop();
            // remove the fram tag
            if (ifrm) ifrm.parentNode.removeChild(ifrm);
          }
          if (s.isPlaying == true) this.getCurrentPlaying(s).stop();
        });
        this.songs.forEach(e => {
          if (e.isPlaying == true) {
            this.getCurrentPlaying(s).stop();
          }
        });

        // then we set the current playing to s
        this.setPlayingIndex(s);

        // handling the visual part of showing the PAUSE AND PLAY BUTTON
        if (flag == false) {
          this.play(s);
          playButton.setAttribute("src", "./resources/img/pause.png");
          flag = true;
        } else {
          this.stop(s);
          playButton.setAttribute("src", "./resources/img/play.png");
          flag = false;
        }
      });
      a.innerHTML = `${s.getTitle()}-${s.getArtist()} --- ${s.getDuration()}`;
    });

    playButton.addEventListener("click", e => {
      // we parse each movie and each song to see if isPlaying is set to true  if so we stop it
      this.songs.forEach(s => {
        if (s.isPlaying == true) {
          this.getCurrentPlaying(s).stop();
        }
      });
      this.movies.forEach(m => {
        if (m.isPlaying == true) {
          this.getCurrentPlaying(m).stop();
          if (ifrm) ifrm.parentNode.removeChild(ifrm);
        }
      });

      // we always start the play from the begining of the list
      if (flag == false) {
        this.play(this.songs[0]);
        playButton.setAttribute("src", "./resources/img/pause.png");
        flag = true;
      } else {
        this.stop(this.getCurrentPlaying(this.songs[0]));
        playButton.setAttribute("src", "./resources/img/play.png");
        flag = false;
      }
    });

    nextButton.addEventListener("click", e => {
      // we parse each song to see if isPlaying is set to true  if so we stop it
      this.songs.forEach(s => {
        if (s.isPlaying == true) {
          this.getCurrentPlaying(s).stop();
        }
      });
      console.log(this.nowPlayingIndex);

      // we parse each movie to see if isPlaying is set to true  if so we stop it
      this.movies.forEach(m => {
        if (m.isPlaying == true) {
          this.getCurrentPlaying(m).stop();
          if (ifrm) ifrm.parentNode.removeChild(ifrm);
        }
      });
      this.setPlayingIndex(
        this.next(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]))
      );
      if (flag == false) {
        this.play(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]));
        playButton.setAttribute("src", "./resources/img/pause.png");
        flag = true;
      } else {
        this.stop(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]));
        playButton.setAttribute("src", "./resources/img/play.png");
        flag = false;
      }
    });

    previousButton.addEventListener("click", e => {
      // we parse each movie and each song to see if isPlaying is set to true  if so we stop it
      this.songs.forEach(s => {
        if (s.isPlaying == true) {
          this.getCurrentPlaying(s).stop();
        }
      });
      this.movies.forEach(m => {
        if (m.isPlaying == true) {
          this.getCurrentPlaying(m).stop();
          if (ifrm) ifrm.parentNode.removeChild(ifrm);
        }
      });
      this.setPlayingIndex(
        this.previous(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]))
      );
      if (flag == false) {
        this.play(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]));
        playButton.setAttribute("src", "./resources/img/pause.png");
        flag = true;
      } else {
        this.stop(this.getCurrentPlaying(this.songs[this.nowPlayingIndex]));
        playButton.setAttribute("src", "./resources/img/play.png");
        flag = false;
      }
    });

    // same thing for movies
    this.movies.forEach(m => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      li.setAttribute("class","film");
      arrayOfSongsTag.appendChild(li);
      li.appendChild(a);
      a.innerHTML = `${m.getTitle()}-${m.getYear()} --- ${m.getDuration()}`;

      a.addEventListener("click", e => {
        this.songs.forEach(s => {
          if (s.isPlaying == true) {
            this.getCurrentPlaying(s).stop();
          }
          if (m.isPlaying == true) this.getCurrentPlaying(m).stop();
        });
        this.setPlayingIndex(m);
        ifrm.setAttribute("src", `./resources/movies/${m.getTitle()}.mp4`);
        ifrm.setAttribute("id", `${m.getTitle()}`);
        ifrm.style.width = "500px";
        ifrm.style.height = "300px";
        arrayOfSongsTag.appendChild(ifrm);

        if (flag == false) {
          this.play(m);
          playButton.setAttribute("src", "./resources/img/pause.png");
          flag = true;
        } else {
          this.stop(m);
          if (ifrm) ifrm.parentNode.removeChild(ifrm);
          playButton.setAttribute("src", "./resources/img/play.png");
          flag = false;
        }
      });
    });
  }
};
