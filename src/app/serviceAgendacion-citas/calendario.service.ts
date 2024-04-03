import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {
  private currentDateSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  currentDate$: Observable<Date> = this.currentDateSubject.asObservable();

  constructor() {}

  updateCurrentDate(newDate: Date) {
    this.currentDateSubject.next(newDate);
  }
}
