function Playlist() {
  this.songs = [];
  this.movies = [];
  this.nowPlayingIndex = 0;
}
const arrayOfSongsTag = document.getElementById("arrayOfSongs");
const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");

Array.prototype.next = function() {
  return this[++this.current];
};
Array.prototype.prev = function() {
  return this[--this.current];
};
Array.prototype.current = 0;

Playlist.prototype = {
  play: function(media) {
    if (media instanceof Song) this.songs[this.nowPlayingIndex].play();
    else if (media instanceof Movie) this.movies[this.nowPlayingIndex].play();
  },
  setPlayingIndex: function(media) {
    if (media instanceof Song)
      this.nowPlayingIndex = this.songs.findIndex(song => song === media);
    else if (media instanceof Movie)
      this.nowPlayingIndex = this.movies.findIndex(movie => movie === media);
  },
  getCurrentPlaying: function(media) {
    if (media instanceof Song) return this.songs[this.nowPlayingIndex];
    else if (media instanceof Movie) return this.movies[this.nowPlayingIndex];
  },
  stop: function(media) {
    if (media instanceof Song) this.songs[this.nowPlayingIndex].stop();
    else if (media instanceof Movie) this.movies[this.nowPlayingIndex].stop();
  },
  add: function(media) {
    if (media instanceof Song) this.songs.push(media);
    else if (media instanceof Movie) this.movies.push(media);
  },
  next: function(media) {
    if (media instanceof Song) {
      this.nowPlayingIndex = (this.nowPlayingIndex + 1) % this.songs.length;
      return this.songs[this.nowPlayingIndex];
    } else if (media instanceof Movie) {
      this.nowPlayingIndex = (this.nowPlayingIndex + 1) % this.movies.length;
      return this.movies[this.nowPlayingIndex];
    }
  },
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
    let flag = false;
    let ifrm = document.createElement("iframe");

    this.songs.forEach(s => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      //console.log(s)
      arrayOfSongsTag.appendChild(li);
      li.appendChild(a);

      a.addEventListener("click", e => {
        e.preventDefault();
        this.movies.forEach(m => {
          if (m.isPlaying == true) {
            this.getCurrentPlaying(m).stop();
            ifrm.parentNode.removeChild(ifrm);
          }
          this.getCurrentPlaying(s).stop();
        });
        this.setPlayingIndex(s);

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
      this.getCurrentPlaying(this.songs[0]).stop();
      this.setPlayingIndex(this.next(this.getCurrentPlaying(this.songs[0])));
      if (flag == false) {
        this.play(this.getCurrentPlaying(this.songs[0]));
        playButton.setAttribute("src", "./resources/img/pause.png");
        flag = true;
      } else {
        this.stop(this.getCurrentPlaying(this.songs[0]));
        playButton.setAttribute("src", "./resources/img/play.png");
        flag = false;
      }
    });
    previousButton.addEventListener("click", e => {
      if (this.getCurrentPlaying) this.getCurrentPlaying(this.songs[0]).stop();
      this.setPlayingIndex(
        this.previous(this.getCurrentPlaying(this.songs[0]))
      );
      if (flag == false) {
        this.play(this.getCurrentPlaying(this.songs[0]));
        playButton.setAttribute("src", "./resources/img/pause.png");
        flag = true;
      } else {
        this.stop(this.getCurrentPlaying(this.songs[0]));
        playButton.setAttribute("src", "./resources/img/play.png");
        flag = false;
      }
    });
    let movieFlag = false;

    this.movies.forEach(m => {
      let li = document.createElement("li");
      let a = document.createElement("a");

      arrayOfSongsTag.appendChild(li);
      li.appendChild(a);
      a.innerHTML = `${m.getTitle()}-${m.getYear()} --- ${m.getDuration()}`;

      a.addEventListener("click", e => {
        this.songs.forEach(s => {
          if (s.isPlaying == true) {
            this.getCurrentPlaying(s).stop();
          }
          this.getCurrentPlaying(m).stop();
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
          ifrm.parentNode.removeChild(ifrm);
          playButton.setAttribute("src", "./resources/img/play.png");
          flag = false;
        }
      });
    });
  }
};
