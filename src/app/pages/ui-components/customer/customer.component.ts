



// // src/app/customer/customer.component.ts
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { QuoteService, Quote } from 'src/app/quote-communication.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// interface Customer {
//   id: number;
//   name: string;
// }

// @Component({
//   selector: 'app-badge',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'],
 
//   imports: [CommonModule, FormsModule],
//   standalone: true
// })




// export class customerComponent implements OnInit, OnDestroy {
//   currentCustomerId: number = this.getCurrentCustomerId();
//   newQuote: Partial<Quote> = {
//     businessType: '',
//   };
//   customerQuotes: Quote[] = [];
//   rejectedQuotesCount: number = 0;
//   acceptedQuotesCount: number = 0;

//   newCustomer: Customer = {
//     id: null!,
//     name: ''
//   };
//   customers: Customer[] = []; 
//   nextCustomerId: number = this.getNextCustomerId();

//   private readonly CUSTOMERS_KEY = 'insuranceCustomers';
//   private readonly CURRENT_CUSTOMER_ID_KEY = 'currentCustomerId';

//   constructor(private quoteService: QuoteService) {}

//   ngOnInit() {
//     this.loadCustomersFromStorage(); 
//     this.loadCustomerQuotes();
//   }

//   ngOnDestroy(): void {
//     this.saveCurrentCustomerId(this.currentCustomerId);
//   }

//   private getCustomersFromStorage(): Customer[] {
//     const storedCustomers = localStorage.getItem(this.CUSTOMERS_KEY);
//     return storedCustomers ? JSON.parse(storedCustomers) : [];
//   }

//   private saveCustomersToStorage(customers: Customer[]): void {
//     localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(customers));
//   }

//   private getNextCustomerId(): number {
//     const customers = this.getCustomersFromStorage();
//     if (customers.length === 0) {
//       return 1;
//     }
//     const maxId = Math.max(...customers.map(cust => cust.id));
//     return maxId + 1;
//   }

//   private getCurrentCustomerId(): number {
//     const storedId = localStorage.getItem(this.CURRENT_CUSTOMER_ID_KEY);
//     const storedCustomers = this.getCustomersFromStorage();
//     const defaultCustomerId = storedCustomers.length > 0 ? storedCustomers[0].id : 1;
//     return storedId ? parseInt(storedId, 10) : defaultCustomerId;
//   }

//   private saveCurrentCustomerId(customerId: number): void {
//     localStorage.setItem(this.CURRENT_CUSTOMER_ID_KEY, customerId.toString());
//   }

//   loadCustomersFromStorage(): void {
//     this.customers = this.getCustomersFromStorage();
//     this.nextCustomerId = this.getNextCustomerId(); 
//   }

//   changeCustomer(customerId: number) {
//     this.currentCustomerId = customerId;
//     this.saveCurrentCustomerId(customerId);
//     this.loadCustomerQuotes();
//   }

//   addCustomer() {
//     if (this.newCustomer.name) {
//       this.newCustomer.id = this.nextCustomerId++;
//       this.customers.push({ ...this.newCustomer });
//       this.saveCustomersToStorage(this.customers);
//       this.newCustomer = { id: null!, name: '' };
//     }
//   }

//   calculateQuoteStats() {
//     this.rejectedQuotesCount = this.customerQuotes.filter(quote => quote.quoteStatus === 'REJECTED').length;
//     this.acceptedQuotesCount = this.customerQuotes.filter(quote => quote.quoteStatus === 'APPROVED').length;
//   }

//   requestQuote() {
//     this.quoteService.addQuote(this.currentCustomerId, this.newQuote);
//     this.newQuote = {};
//     this.loadCustomerQuotes();
//   }

//   loadCustomerQuotes() {
//     this.customerQuotes = this.quoteService.getCustomerQuotes(this.currentCustomerId);
//     this.calculateQuoteStats();
//   }

//   approveQuote(quoteId: number) {
//     this.quoteService.updateQuoteStatus(quoteId, 'APPROVED');
//     this.loadCustomerQuotes();
//   }

//   rejectQuote(quoteId: number) {
//     this.quoteService.updateQuoteStatus(quoteId, 'REJECTED');
//     this.loadCustomerQuotes();
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'],
//   imports: [CommonModule, FormsModule],
//   standalone: true
// })
// export class customerComponent implements OnInit {
//   private apiUrl = 'http://localhost:5000/api'; // Backend URL
 
//   customers: any[] = []; // List of customers
//   customerQuotes: any[] = []; // Quotes for the selected customer
//   currentCustomerId: string = ''; // Selected customer
//   newCustomer: any = { name: '' }; // Data for adding a new customer
//   newQuote: any = {
//     businessType: '',
//     businessSize: '',
//     coverageRequirements: '',
//     location: '',
//     otherRiskFactors: '',
//     coverageAmount: 0,
//   }; // Data for adding a new quote
 
//   constructor(private http: HttpClient) {}
 
//   ngOnInit() {
//     // Load customers on initialization
//     this.loadCustomers();
//   }
 




//   showDropdown = false;

//   toggleDropdown() {
//     this.showDropdown = !this.showDropdown;
//   }
  
//   selectCustomer(customerId: string) {
//     this.currentCustomerId = customerId;
//     this.loadCustomerQuotes();
//     this.showDropdown = false;
//   }




//   // Load customers from the backend
//   loadCustomers() {
//     this.http.get<any>(`${this.apiUrl}/customers`).subscribe((response) => {
//       this.customers = response.customers;
//     });
//   }
 
//   // Add a new customer
//   addCustomer() {
//     if (!this.newCustomer.name) return; // Prevent submission if name is empty
//     this.http.post(`${this.apiUrl}/customers`, this.newCustomer).subscribe(
//       (response: any) => {
//         this.customers.push(response.customer); // Update the customers list
//         this.newCustomer.name = ''; // Clear the input field
//       },
//       (error) => {
//         console.error('Error adding customer:', error); // Log error for debugging
//         alert('Failed to add customer. Please try again.'); // Show user-friendly error message
//       }
//     );
//   }
 
//   // Load quotes for the selected customer
//   loadCustomerQuotes() {
//     if (this.currentCustomerId) {
//       this.http
//         .get<any>(`${this.apiUrl}/customers/${this.currentCustomerId}/quotes`)
//         .subscribe((response) => {
//           this.customerQuotes = response.quotes;
//         });
//     }
//   }
 
//   // Submit a new quote for the selected customer
//   requestQuote() {
//     if (!this.currentCustomerId) return; // Prevent submission if no customer is selected
//     const quoteData = { ...this.newQuote, customerId: this.currentCustomerId };
//     this.http.post(`${this.apiUrl}/quotes`, quoteData).subscribe(
//       (response: any) => {
//         this.customerQuotes.push(response.quote); // Update the quotes list
//         this.newQuote = {
//           businessType: '',
//           businessSize: '',
//           coverageRequirements: '',
//           location: '',
//           otherRiskFactors: '',
//           coverageAmount: 0,
//         }; // Clear the form
//       },
//       (error) => {
//         console.error('Error submitting quote:', error); // Log error for debugging
//         alert('Failed to submit quote. Please try again.'); // Show user-friendly error message
//       }
//     );
//   }


// }


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'],
//   imports: [CommonModule, FormsModule],
//   standalone: true
// })
// export class customerComponent implements OnInit {
//   private apiUrl = 'http://localhost:5000/api'; // Backend URL
//   loggedIn: boolean = false;
 
//   customers: any[] = []; // List of customers
//   customerQuotes: any[] = []; // Quotes for the selected customer
//   currentCustomerId: string = ''; // Selected customer
//   newCustomer: any = { name: '' }; // Data for adding a new customer
//   newQuote: any = {
//     businessType: '',
//     businessSize: '',
//     coverageRequirements: '',
//     location: '',
//     otherRiskFactors: '',
//     coverageAmount: 0,
//   }; // Data for adding a new quote
  
//   // Dropdown control properties
//   showDropdown: boolean = false;
 
//   constructor(private http: HttpClient) {}
 
//   ngOnInit() {
//     // Load customers on initialization
//     this.loadCustomers();
//   }
 
//   // Toggle customer dropdown visibility
//   toggleDropdown(): void {
//     this.showDropdown = !this.showDropdown;
//   }
  
//   // Select customer from dropdown
//   selectCustomer(customerId: string): void {
//     this.currentCustomerId = customerId;
//     this.loadCustomerQuotes();
//     this.showDropdown = false;
//   }
  
//   // Load customers from the backend
//   loadCustomers(): void {
//     this.http.get<any>(`${this.apiUrl}/customers`).subscribe((response) => {
//       this.customers = response.customers;
//     });
//   }
 
//   // Add a new customer
//   addCustomer(): void {
//     if (!this.newCustomer.name) return; // Prevent submission if name is empty
//     this.http.post(`${this.apiUrl}/customers`, this.newCustomer).subscribe(
//       (response: any) => {
//         this.customers.push(response.customer); // Update the customers list
//         this.newCustomer.name = ''; // Clear the input field
//         this.loadCustomers(); // Refresh customer list
//       },
//       (error) => {
//         console.error('Error adding customer:', error);
//         alert('Failed to add customer. Please try again.');
//       }
//     );
//   }
 
//   // Load quotes for the selected customer
//   loadCustomerQuotes(): void {
//     if (this.currentCustomerId) {
//       this.http
//         .get<any>(`${this.apiUrl}/customers/${this.currentCustomerId}/quotes`)
//         .subscribe((response) => {
//           this.customerQuotes = response.quotes;
//         });
//     }
//   }
 
//   // Submit a new quote for the selected customer
//   requestQuote(): void {
//     if (!this.currentCustomerId) return; // Prevent submission if no customer is selected
//     const quoteData = { ...this.newQuote, customerId: this.currentCustomerId };
//     this.http.post(`${this.apiUrl}/quotes`, quoteData).subscribe(
//       (response: any) => {
//         this.customerQuotes.push(response.quote); // Update the quotes list
//         this.newQuote = {
//           businessType: '',
//           businessSize: '',
//           coverageRequirements: '',
//           location: '',
//           otherRiskFactors: '',
//           coverageAmount: 0,
//         }; // Clear the form
//         this.loadCustomerQuotes(); // Refresh quotes list
//       },
//       (error) => {
//         console.error('Error submitting quote:', error);
//         alert('Failed to submit quote. Please try again.');
//       }
//     );
//   }
// }


// import { Component, OnInit, OnDestroy } from '@angular/core';  crtt
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CustomerDataService } from '../../../services/shared.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-customer',
//   templateUrl: './customer.component.html',
//   styleUrls: ['./customer.component.css'],
//   imports: [CommonModule, FormsModule],
//   standalone: true,
// })
// export class customerComponent implements OnInit, OnDestroy {
//   private apiUrl = 'http://localhost:5000/api'; // Backend URL
//   loggedIn: boolean = false;

  

//   customers: any[] = []; // List of customers (you might not need this here anymore)
//   customerQuotes: any[] = []; // Quotes for the logged-in customer
//   currentCustomerId: string | null = null; // Selected customer
//   newCustomer: any = { name: '' }; // Data for adding a new customer (you might not need this here)
//   newQuote: any = {
//     businessType: '',
//     businessSize: '',
//     coverageRequirements: '',
//     location: '',
//     otherRiskFactors: '',
//     coverageAmount: 0,
//   }; // Data for adding a new quote

//   private customerIdSubscription: Subscription | undefined;

//   constructor(private http: HttpClient, private customerDataService: CustomerDataService) {}

//   ngOnInit() {
//     this.customerIdSubscription = this.customerDataService.currentCustomerId$.subscribe(
//       (customerId) => {
//         this.currentCustomerId = customerId;
//         if (this.currentCustomerId) {
//           this.loggedIn = true; // Set loggedIn to true when customer ID is available
//           this.loadCustomerQuotes();
//         } else {
//           this.loggedIn = false;
//           this.customerQuotes = [];
//         }
//       }
//     );

//     // If you still need to load all customers for some reason:
//     // this.loadCustomers();
//   }

//   ngOnDestroy(): void {
//     if (this.customerIdSubscription) {
//       this.customerIdSubscription.unsubscribe();
//     }
//   }

//   // Toggle customer dropdown visibility (you might remove this if you only show the logged-in user's data)
//   toggleDropdown(): void {
//     // this.showDropdown = !this.showDropdown;
//   }

//   // Select customer from dropdown (you might remove this)
//   selectCustomer(customerId: string): void {
//     // this.currentCustomerId = customerId;
//     // this.loadCustomerQuotes();
//     // this.showDropdown = false;
//   }

//   // Load all customers (you might remove this)
//   loadCustomers(): void {
//     // this.http.get<any>(`${this.apiUrl}/customers`).subscribe((response) => {
//     //   this.customers = response.customers;
//     // });
//   }

//   // Add a new customer (you might remove this from the customer-facing component)
//   addCustomer(): void {
//     // ... your add customer logic
//   }

//   // Load quotes for the selected (logged-in) customer
//   loadCustomerQuotes(): void {
//     if (this.currentCustomerId) {
//       this.http
//         .get<any>(`${this.apiUrl}/customers/${this.currentCustomerId}/quotes`)
//         .subscribe((response) => {
//           this.customerQuotes = response.quotes;
//         });
//     } else {
//       this.customerQuotes = []; // Clear quotes if no customer ID
//     }
//   }

//   // Submit a new quote for the selected (logged-in) customer
//   requestQuote(): void {
//     if (!this.currentCustomerId) return; // Prevent submission if no customer is selected
//     const quoteData = { ...this.newQuote, customerId: this.currentCustomerId };
//     this.http.post(`${this.apiUrl}/quotes`, quoteData).subscribe(
//       (response: any) => {
//         this.customerQuotes.push(response.quote); // Update the quotes list
//         this.newQuote = { /* ... clear form */ };
//         this.loadCustomerQuotes(); // Refresh quotes list
//       },
//       (error) => {
//         console.error('Error submitting quote:', error);
//         alert('Failed to submit quote. Please try again.');
//       }
//     );
//   }
// }  crttttttttttt





import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerDataService } from '../../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class customerComponent implements OnInit, OnDestroy {
  private apiUrl = 'http://localhost:5000/api'; // Backend URL
  loggedIn: boolean = false;

  customers: any[] = []; // List of customers (you might not need this here anymore)
  customerQuotes: any[] = []; // Quotes for the logged-in customer
  currentCustomerId: string | null = null; // Selected customer
  newCustomer: any = { name: '' }; // Data for adding a new customer (you might not need this here)
  newQuote: any = {
    businessType: '',
    businessSize: '',
    coverageRequirements: '',
    location: '',
    otherRiskFactors: '',
    coverageAmount: 0,
  }; // Data for adding a new quote

  // Add these new properties for statistics
  totalQuotes: number = 0;
  approvedQuotes: number = 0;
  rejectedQuotes: number = 0;
  customerName: string = '';

  private customerIdSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private customerDataService: CustomerDataService) {}

  ngOnInit() {
    this.customerIdSubscription = this.customerDataService.currentCustomerId$.subscribe(
      (customerId) => {
        this.currentCustomerId = customerId;
        if (this.currentCustomerId) {
          this.loggedIn = true; // Set loggedIn to true when customer ID is available
          this.loadCustomerDetails();
          this.loadCustomerQuotes();
        } else {
          this.loggedIn = false;
          this.customerQuotes = [];
          this.resetStats();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.customerIdSubscription) {
      this.customerIdSubscription.unsubscribe();
    }
  }

  // New method to load customer details
  private loadCustomerDetails(): void {
    if (!this.currentCustomerId) return;

    this.http.get<any>(`${this.apiUrl}/customers/${this.currentCustomerId}`)
      .subscribe((response) => {
        if (response.success && response.customer) {
          this.customerName = response.customer.name;
        }
      });
  }

  // Modified loadCustomerQuotes to include stats calculation
  loadCustomerQuotes(): void {
    if (this.currentCustomerId) {
      this.http
        .get<any>(`${this.apiUrl}/customers/${this.currentCustomerId}/quotes`)
        .subscribe((response) => {
          this.customerQuotes = response.quotes;
          this.calculateStats();
        });
    } else {
      this.customerQuotes = [];
      this.resetStats();
    }
  }

  // New method to calculate statistics
  private calculateStats(): void {
    this.totalQuotes = this.customerQuotes.length;
    this.approvedQuotes = this.customerQuotes.filter(
      q => q.quoteStatus?.toUpperCase() === 'APPROVED'
    ).length;
    this.rejectedQuotes = this.customerQuotes.filter(
      q => q.quoteStatus?.toUpperCase() === 'REJECTED'
    ).length;
  }

  // New method to reset statistics
  private resetStats(): void {
    this.totalQuotes = 0;
    this.approvedQuotes = 0;
    this.rejectedQuotes = 0;
  }

  // Existing methods remain unchanged below this point
  toggleDropdown(): void {
    // this.showDropdown = !this.showDropdown;
  }

  selectCustomer(customerId: string): void {
    // this.currentCustomerId = customerId;
    // this.loadCustomerQuotes();
    // this.showDropdown = false;
  }

  loadCustomers(): void {
    // this.http.get<any>(`${this.apiUrl}/customers`).subscribe((response) => {
    //   this.customers = response.customers;
    // });
  }

  addCustomer(): void {
    // ... your add customer logic
  }

  requestQuote(): void {
    if (!this.currentCustomerId) return; // Prevent submission if no customer is selected
    const quoteData = { ...this.newQuote, customerId: this.currentCustomerId };
    this.http.post(`${this.apiUrl}/quotes`, quoteData).subscribe(
      (response: any) => {
        this.customerQuotes.push(response.quote); // Update the quotes list
        this.newQuote = {
          businessType: '',
          businessSize: '',
          coverageRequirements: '',
          location: '',
          otherRiskFactors: '',
          coverageAmount: 0,
        }; // Clear the form
        this.loadCustomerQuotes(); // Refresh quotes list
      },
      (error) => {
        console.error('Error submitting quote:', error);
        alert('Failed to submit quote. Please try again.');
      }
    );
  }
}