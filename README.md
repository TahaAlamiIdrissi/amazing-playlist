# Name

Amazing Playlist

## Description

We will have like the title says an amazing playlist wich let us read some medias (Song and movies)
Adding to that we will have a quizz so that the visitor can play and listen to his favourite track
and for more advanced operation we could imagine that after the visitor register in our Website he could
access some forbidden features

![alt text](./resources/img/playlist.PNG)

```bash
pip install foobar
```

## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Features

The most important difference between class- and prototype-based inheritance is that a class defines a type which can be instantiated at runtime, whereas a prototype is itself an object instance.

in our project we used prototype-base inheritance so we could master to basics and that will allow us to easly get the class-based inheritance

We defined the folliwing objects for the Playlist

- Media
- Song
- Movie

Song and movie inherit from Media using (prototype) like for example for movie

```javascript
function Movie(year, title, duration, isPlaying) {
  this.year = year;
  // Calling the Constructor of Media
  Media.call(this, title, duration, isPlaying);
}
// creating the Movie prototype from the Media proto
Movie.prototype = Object.create(Media.prototype);

// replacing the constructor of Movie (wich for the moment is Media) with Movie
Movie.prototype.constructor = Movie;
```

and then for movie we defined its own methods using 
```javascript
Movie.prototype.methodName = function() {
  //code goes here
};
```

so if we call methodName and we did not define it on the Movie prototype , we will automatically search for it on the Media prototype
that's the idea of the project same thing goes for Song , Quizz , Register ..


## License

[MIT](https://choosealicense.com/licenses/mit/)
