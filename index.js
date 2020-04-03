class Movie {
  constructor(title, director, movien) {
    this.title = title;
    this.director = director;
    this.movien = movien;
  }
}

class UI {
  static displayMovies() {

    const movies = storeMovies.getMovies();

    movies.forEach((movie) => UI.addMovieToList(movie));
  }

  static addMovieToList(movie) {
    const list = document.querySelector('.movie-list');

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.director}</td>
      <td>${movie.movien}</td>
      <td><a href="#" class="btn btn-danger delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteMovie(el) {
   if(el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
  }
  }

  static displayValidation(message, className) {
    const div = document.createElement('div');
    div.className = 'alert alert-' + className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('.movie-form');
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static ClearList() {
    document.querySelector('#title').value = '';
    document.querySelector('#director').value = '';
    document.querySelector('#movien').value = '';
  }

}

class storeMovies {
  static getMovies() {
    let movies;
    if(localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }

    return movies;
  }
  static addMovies(movie) {
    const movies = storeMovies.getMovies();

    movies.push(movie);

    localStorage.setItem('movies', JSON.stringify(movies));
  }
  static removeMovies(movien) {
    const movies = storeMovies.getMovies();

    movies.forEach((movie, index) => {
       if(movie.movien === movien) {
         movies.splice(index, 1);
       }
    });
    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayMovies);

document.querySelector('.movie-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const director = document.querySelector('#director').value;
  const movien = document.querySelector('#movien').value;

  const movie = new Movie(title, director, movien);

  if(title === '' || director === '' || movien === '') {
    UI.displayValidation('Fill out the form please', 'danger');
  } else {

  UI.addMovieToList(movie);

  storeMovies.addMovies(movie);

  UI.displayValidation('Movie added to the list', 'success');

  UI.ClearList();

}
});

document.querySelector('.movie-list').addEventListener('click', (e) => {
 UI.deleteMovie(e.target);
 UI.displayValidation('Movie removed from the list', 'danger');
 storeMovies.removeMovies(e.target.parentElement.previousElementSibling.textContent);
});
