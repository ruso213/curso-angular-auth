import { DataSource } from '@angular/cdk/collections';
import { userResponse } from '@models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser extends DataSource<any[]> {

  data = new BehaviorSubject<userResponse[]>([]);
  originalData: userResponse[]= [];

  connect(): Observable<any[]> {
    return this.data;
  }

  init(data: userResponse[]) {
    this.originalData = data;
    this.data.next(data);
  }

  disconnect() { }

}
