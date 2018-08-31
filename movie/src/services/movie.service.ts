import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {flatMap, map} from "rxjs/operators"
import * as moment from 'moment'

@Injectable()
export class MovieService {


  private searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=fe41c48c214b09a24706fe1ec9ef8dd6&language=ru-Ru&page=1&query=";

  constructor(private http: HttpClient) {
  }


  search(query: string) {
    return this.http.get(this.searchUrl + query)
      .pipe(flatMap((value: any, index: number) => value['results']))
      .pipe(map(value => {
        return {
          title: value['title'],
          descriptoin: value['overview'],
          year: moment(value['release_date']).year(),
          avatar: value['backdrop_path'],
          image: value['poster_path']
        };
      }))
  }


}
