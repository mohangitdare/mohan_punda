// import { Component } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { MaterialModule } from 'src/app/material.module';
// import { FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-side-login',
//   imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './side-login.component.html',
// })
// export class AppSideLoginComponent {

//   constructor( private router: Router) {}

//   form = new FormGroup({
//     uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
//     password: new FormControl('', [Validators.required]),
//   });

//   get f() {
//     return this.form.controls;
//   }

//   submit() {
//     // console.log(this.form.value);
//     this.router.navigate(['/']);
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
// @Component({
//   selector: 'app-side-login',
//   templateUrl: './side-login.component.html',
//   styleUrls: ['./side-login.component.css'],
//   imports: [CommonModule, FormsModule],

//   standalone: true
// })
// export class AppSideLoginComponent implements OnInit {
//   private apiUrl = 'http://localhost:5000/api'; // Backend URL
//   loginForm: FormGroup;
//   loggedIn: boolean = false;
 
// constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
//   this.loginForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });
// }
 
 
//   isLogin = true;
 
// loginData = {
//   email: '',
//   password: ''
// };
 
// registerData = {
//   name: '',
//   email: '',
//   password: ''
// };
//   customer = { name: '', email: '', password: '' };
// // loginData = { email: '', password: '' };
 
// register() {
//   this.http.post(`${this.apiUrl}/register`, this.registerData)
//     .subscribe({
//       next: () => alert('Registered Successfully'),
//       error: err => alert('Error Registering: ' + err.error)
//     });
// }
 
// login() {
//   const { email, password } = this.loginForm.value;
 
//   this.http.post(`${this.apiUrl}/login`, this.loginData).subscribe({
//     next: (res: any) => {
//       alert(res.message);
//       this.loggedIn = true;
//       this.currentCustomerId = res.customerId; // <- SET customerId here!
//       this.router.navigate(['/dashboard']);
//       this.loadCustomerQuotes(); // Load only that user's quotes
//     },
//     error: (err) => {
//       if (err.status === 404) {
//         alert('You are not registered. Please register first.');
//       } else if (err.status === 401) {
//         alert('Incorrect password. Try again.');
//       } else {
//         alert('Login failed. Try again later.');
//       }
//     }
//   });
// }
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
 
 
 
//   ngOnInit() {
//     // Load customers on initialization
//     this.loadCustomers();
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

// side-login.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CustomerDataService } frosrc/app/services/shared.serviceice'; // Import the service

// @Component({
//   selector: 'app-side-login',
//   templateUrl: './side-login.component.html',
//   styleUrls: ['./side-login.component.css'],
//   imports: [CommonModule, FormsModule],
//   standalone: true,
// })
// export class AppSideLoginComponent implements OnInit {
//   private apiUrl = 'http://localhost:5000/api'; // Backend URL
//   loginForm: FormGroup;
//   loggedIn: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private customerDataService: CustomerDataService // Inject the service
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//     });
//   }

//   isLogin = true;

//   loginData = {
//     email: '',
//     password: '',
//   };

//   registerData = {
//     name: '',
//     email: '',
//     password: '',
//   };
//   customer = { name: '', email: '', password: '' };

//   register() {
//     this.http.post(`${this.apiUrl}/register`, this.registerData).subscribe({
//       next: () => alert('Registered Successfully'),
//       error: (err) => alert('Error Registering: ' + err.error),
//     });
//   }

//   login() {
//     const { email, password } = this.loginForm.value;

//     this.http.post(`${this.apiUrl}/login`, this.loginData).subscribe({
//       next: (res: any) => {
//         alert(res.message);
//         this.loggedIn = true;
//         this.customerDataService.setCurrentCustomerId(res.customerId); // Set the customer ID in the service
//         this.router.navigate(['/customer-dashboard']); // Navigate to your customer component (adjust route name)
//       },
//       error: (err) => {
//         if (err.status === 404) {
//           alert('You are not registered. Please register first.');
//         } else if (err.status === 401) {
//           alert('Incorrect password. Try again.');
//         } else {
//           alert('Login failed. Try again later.');
//         }
//       },
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDataService } from '../../../services/shared.service'; // Import the service

// import { AgentService } from '../admin/agent.service';

@Component({
  selector: 'app-side-login',
  templateUrl: './side-login.component.html',
  styleUrls: ['./side-login.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class AppSideLoginComponent  {
  private apiUrl = 'http://localhost:5000/api'; // Backend URL
  loginForm: FormGroup;
  loggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private customerDataService: CustomerDataService // Inject the service
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  isLogin = true;

  loginData = {
    email: '',
    password: '',
  };

  registerData = {
    name: '',
    email: '',
    password: '',
  };
  customer = { name: '', email: '', password: '' };

  register() {
    this.http.post(`${this.apiUrl}/register`, this.registerData).subscribe({
      next: () => alert('Registered Successfully'),
      error: (err) => alert('Error Registering: ' + err.error),
    });
  }

  login() {
    const { email, password } = this.loginForm.value;

    this.http.post(`${this.apiUrl}/login`, this.loginData).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loggedIn = true;
        this.customerDataService.setCurrentCustomerId(res.customerId); // Set the customer ID in the service
        this.router.navigate(['/ui-components/badge']); // Navigate to your customer component (adjust route name)
      },
      error: (err) => {
        if (err.status === 404) {
          alert('You are not registered. Please register first.');
        } else if (err.status === 401) {
          alert('Incorrect password. Try again.');
        } else {
          alert('Login failed. Try again later.');
        }
      },
    });


    
  }
}