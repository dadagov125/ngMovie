import {Component, OnInit} from '@angular/core';
import {Movie} from "../../models/Movie";
import {MovieService} from "../../services/movie.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  private moviesMap: Map<string, Movie> = new Map<string, Movie>();

  selectedMovie: Movie;

  myControl = new FormControl();

  options: Movie[] = [];

  constructor(private movieService: MovieService) {
  }

  get movies() {
    return Array.from(this.moviesMap.values())
  }

  ngOnInit() {

    this.myControl.valueChanges.subscribe(value => {

      this.options = [];
      this.movieService.search(value)
        .subscribe(movie => {
          this.options.push(movie)
        })
    })

  }

  getKey(item: Movie) {
    return `${item.title} - ${item.year}`
  }

  remove(e: MouseEvent, item: Movie) {
    e.preventDefault();
    this.moviesMap.delete(this.getKey(item))
  }

  add(item: Movie) {
    this.moviesMap.set(this.getKey(item), item)
  }

  open(item: Movie) {
    this.selectedMovie=item;
  }

}
