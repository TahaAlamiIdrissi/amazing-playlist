let p = new Playlist();

$.getJSON("audio.json", function(json) {
  for (let key in json) {
    if(key === "song"){
        for(let e in json[key]){
            if(json[key].hasOwnProperty(e)){
                let item = json[key][e];
                p.add(new Song(item.artist,item.title,item.duration,item.isPlaying))
            }
        }
    }else if( key === "movie"){
        for(let e in json[key]){
            if(json[key].hasOwnProperty(e)){
                let item = json[key][e];
                p.add(new Movie(item.year,item.title,item.duration,item.isPlaying))
            }
        }
    }
  }
  p.renderInElement();
});
/* let songOne = new Song("Tales", "tom&jerry", 0.26, false);
let songTwo = new Song("warnerbros", "looneytunes", 0.34, false);
let songThree = new Song("avril-lavigne", "close", 0.58, false);


p.add(songOne);
p.add(songTwo);
p.add(songThree);
 */


