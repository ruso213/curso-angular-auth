import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { infoResults } from '@models/rickApi.models';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortySvcService {

  constructor(
    private http: HttpClient
  ) { }
    search(val: string){
      return this.http.get<infoResults>(`https://rickandmortyapi.com/api/character/?name=${val}`).pipe(
        map(item => item.results)
      )
    }
}
