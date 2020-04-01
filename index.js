class Movie {
  constructor(title, director, movien) {
    this.title = title;
    this.director = director;
    this.movien = movien;
  }
}

class UI {
  static displayMovies() {
    const storedMovies = [
      {
        title: "Jurassic Park",
        director: "James Cameron",
        movien: "702"
      },
      {
        title: "Transformers 2",
        director: "James Cameron",
        movien: "635"
      }
    ];

    const movies = storedMovies;

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
}

document.addEventListener('DOMContentLoaded', UI.displayMovies);

document.querySelector('.movie-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#title').value;
  const director = document.querySelector('#director').value;
  const movien = document.querySelector('#movien').value;

  const movie = new Movie(title, director, movien);

  UI.addMovieToList(movie);
});
