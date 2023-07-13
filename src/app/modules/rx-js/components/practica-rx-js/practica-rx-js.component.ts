import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Character } from '@models/rickApi.models';
import { Observable, Subject, catchError, debounceTime, fromEvent, of, single, switchMap, takeUntil, tap } from 'rxjs';
import { RickAndMortySvcService } from 'src/app/service/rick-and-morty-svc.service';
interface person{
  
  name: string,
  age: string

}
@Component({
  selector: 'app-practica-rx-js',
  templateUrl: './practica-rx-js.component.html'
})

export class PracticaRxJsComponent implements OnInit,OnDestroy {

  constructor(
    private rickMortySvc: RickAndMortySvcService
  ){}
    searchTerm$ = new Subject<string>()
    character$ !: Observable<Character[]>

    unsubcribe$ = new Subject<void>()
    item = 0
    getData(): Observable<person[]>{
      return of([
      {
        name : 'jose',
        age: '17'
      },
      {
        name : 'jose',
        age: '17'
      },
    ]
      )
    }
    ngOnInit(): void {     
      this.character$ = this.searchTerm$.pipe(
        tap(i =>
          {
            console.log('tap i', this.character$)
            
          }),
        debounceTime(400),
        switchMap((item) => this.rickMortySvc.search(item)),
        tap(item => {
          console.log( 'item',item)
        }),  
      )
      this.getData().pipe(
        takeUntil(this.unsubcribe$), //cuando takeUntil resive un valor de un observable desubscribe el observable 
        tap( i =>{                   //automaticamente 
          console.log('a');
          
        })
      )
     /* 
      this.singleStart()
      this.fromEventStart() */      
    }
    ngOnDestroy(): void {
      this.unsubcribe$.next()
      this.unsubcribe$.complete()
    }
   
    search(evt : Event){
      
      const datos = evt.currentTarget as HTMLInputElement
      this.searchTerm$.next(datos.value)
      console.log('e');
    }




    singleStart(){
      console.log('comenzo single');

      const values = of (1,2,3,4,5,6,7,8)
      values.pipe(
        single(val => val === 34), //single(): cuando resive un valor que tu le das en especifico 
        tap({                      //desuscribe al observer
        next: (e)=>{
          console.log('next ', e);
          
        },
        error : (e)=>{
          console.log("error()",e);
          
        },
        complete: ()=>{
          console.log('complete');
          
        }
      }
        )).subscribe()
    }
  //explicacion 1.0

// @ViewChild('explicacionElemnt', {static, true}) nombreVar!: ElementRef; 
//                                                         //aqui lo que hacemos es crear una instacia de un 
//                                                         //elemento del html el cual se tenga el mismo id que
//                                                         //se indica en el decorador @ViewChild('explicacionElemnt')
//                                                         //luego esta variable se pone en el observador fromEvent  
  //                                                         //fromEvent(this.nombreVar, 'click')
fromEventStart(){
    const evt = fromEvent(document, 'click') //el evento fromEvent lo que hace es detectar el momento en el que 
    evt.pipe(                                //interacutamos con un elemento especifico, podemos darle que accion
      tap((value) => {                       //queremos que detecte en este caso puse un que sea el documento en
        console.log(value);                  //general y que detecte el momento en el que se haga click pero 
//                                           //podemos darle a detectar cualquier otra accion.
      })                                     //en caso en el cual queramos detectar un elemento en especifico 
    ).subscribe()                            //debemos hacer lo que se indica en la explicacion 1.0
  }
}
