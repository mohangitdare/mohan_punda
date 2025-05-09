// customer-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerDataService {
  private currentCustomerIdSubject = new BehaviorSubject<string | null>(null);
  currentCustomerId$ = this.currentCustomerIdSubject.asObservable();

  setCurrentCustomerId(customerId: string | null): void {
    this.currentCustomerIdSubject.next(customerId);
  }

  getCurrentCustomerId(): string | null {
    return this.currentCustomerIdSubject.getValue();
  }
}