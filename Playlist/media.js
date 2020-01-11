/* This is the Media Class */

/* 
* All the other classes will inherit from this class but without using the 
* the inheritance introduces in ECMA6 wich uses the proper "class" term 
* Using the prototype prototype 
*/
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






