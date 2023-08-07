import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { TodoDialogComponent } from '@boards/components/todo-dialog/todo-dialog.component';

import { ToDo, Column } from '@models/todo.model';
import { BoardsService } from 'src/app/service/boards.service';
import { Board } from '@models/board.model';
import { Card } from '@models/card.model';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
      .cdk-drop-list-dragging .cdk-drag {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      .cdk-drag-animating {
        transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
      }
    `,
  ],
})
export class BoardComponent implements OnInit{
  list: Board | null = null

  constructor(
    private dialog: Dialog,
    private boardsService: BoardsService,
    private route : ActivatedRoute
  ) {}
  ngOnInit(): void {
    
    for(const a of [1,2,3,4]){
      console.log(a);
      
    }
    this.route.paramMap.subscribe(param =>{
      const id = param.get("id");
      if(id){
        this.boardsService.getBoards(id).subscribe(i => {   
            this.list = i      
        })
      }
    })
  }
  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const position= this.boardsService.getPosition(event.container.data, event.currentIndex)
    
    console.log(position);
  }

  addColumn() {
    
    /* this.columns.push({
      title: 'New Column',
      todos: [],
    }); */
  }

  openDialog(cards: Card) {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        card: cards,
      },
    });
    dialogRef.closed.subscribe((output) => {
      console.log('output');
    });
  }
}
