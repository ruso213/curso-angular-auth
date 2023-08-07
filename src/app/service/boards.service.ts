import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@interceptors/token.interceptor';
import { api } from '@models/api';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  bufferSpace = 65535
  constructor(
    private http : HttpClient,
  ) { }
  getPosition(card: Card[],currentIndex : number){
    
    if(card.length === 1){
      return this.bufferSpace
      /* 
      console.log('entro en una carta vacia');  */    
    }
    if(card.length > 1 &&currentIndex === 0){
      const topPosition = card[1].position
      return topPosition/2
      /* 
      console.log('es el primer item')
      console.log('topPosition ', topPosition); */
    }
    const lastIndex = card.length - 1
    if(card.length > 2 && currentIndex < lastIndex && currentIndex> 0){
      const prevPosition = card[currentIndex - 1].position
      const nextPosition = card[currentIndex + 1 ].position
      return (prevPosition + nextPosition)/2
      /* 
      console.log('en el medio');  */ 
    }
    if(card.length > 1 && currentIndex  === lastIndex){
      const bttnPosition = card[lastIndex - 1].position
      return bttnPosition + this.bufferSpace
      /* 
      console.log('es el ultimo item')
      console.log('bttnPosition ', bttnPosition); */
      
    }
    return null
  }

  getBoards(id : Board['id']){
    return this.http.get<Board>(`${api}/boards/${id}`,{
      context: checkToken()
    }).pipe(
      tap(i => {
        console.log(i);
      })
    )
  }
}
