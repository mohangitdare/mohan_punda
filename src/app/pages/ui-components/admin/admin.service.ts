import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quote {
  _id: string;
  customerId: string;
  businessType: string;
  coverageAmount: number;
  quoteStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUBMITTED';
}

 export interface QuoteWithCustomer {
  _id: string;
  customerId: string;
  businessType: string;
  coverageAmount: number;
  quoteStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUBMITTED';
  customerName: string;
  // ... other quote properties
}

export interface AgentAuthorization {
  agentId: string;
  authorizedCustomerIds: string[];
}

export interface CustomersResponse { // Export the interface
  success: boolean;
  customers: any[]; // Adjust 'any' to your actual Customer interface if available here
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api'; // Backend API URL
  private customerId = '';
  private specificCustomer:any;
  constructor(private http: HttpClient) {}

  // Quotes API
  getQuotes(): Observable<{ success: boolean; quote: Quote[] }> {
    return this.http.get<{ success: boolean; quote: Quote[] }>(`${this.apiUrl}/quotes`);
  }

  updateQuote(quote: Quote): Observable<{ success: boolean; quote: Quote }> {
    return this.http.put<{ success: boolean; quote: Quote }>(`${this.apiUrl}/quotes`, quote);
  }

  deleteQuote(_id: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.apiUrl}/quotes/${_id}`);
  }
  agentUpdateQuoteStatus(quoteId: string, status: 'APPROVED' | 'REJECTED', agentId: string): Observable<{ success: boolean; message?: string }> {
    console.log(agentId, status, quoteId);
    return this.http.post<{ success: boolean; message?: string }>(`${this.apiUrl}/agent/updateQuoteStatus`, { agentId, quoteId , status});
}

// agentUpdateQuoteStatuss(quoteId: string, status: 'APPROVED' | 'REJECTED'): Observable<{ success: boolean; message?: string }> {
//   console.log( status, quoteId);
//   return this.http.post<{ success: boolean; message?: string }>(`${this.apiUrl}/agent/updateQuoteStatus`, {  quoteId , status});
// }

  // Agent Authorizations API
  getAuthorizations(): Observable<{ success: boolean; authorizations: AgentAuthorization[] }> {
    return this.http.get<{ success: boolean; authorizations: AgentAuthorization[] }>(`${this.apiUrl}/authorizations`);
  }

  authorizeCustomer(id: string, _id: string): Observable<{ success: boolean }> {
    console.log((`${this.apiUrl}/authorizations`+ { id, _id }));
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/authorizations`, { id, _id });
  }

  setCustomerId(id: string){
    this.customerId = id;
  }

  getCustomerId(){
    return this.customerId;
  }


  setSpecificCustomer(specificCustomer:any){
    this.specificCustomer = specificCustomer
    console.log(this.specificCustomer);
    
  }

  getSpecificCustomer(){
    return this.specificCustomer;
  }

  // unauthorizeCustomer(agentId: string, customerId: string): Observable<{ success: boolean }> {
  //   return this.http.request<{ success: boolean }>('DELETE', `${this.apiUrl}/authorizations`, {
  //     body: { agentId, customerId },
  //   });
  // }

  updateQuoteStatus(_id: string, quoteStatus: 'APPROVED' | 'REJECTED'): Observable<{ success: boolean; allQuotes: Quote[] }> {
    return this.http.put<{ success: boolean; allQuotes: Quote[] }>(`${this.apiUrl}/quotes`, { _id, quoteStatus });
  }

  
  // getQuotesForCustomer(customerId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/quotes/${customerId}`);
  // }
  getCustomerDetails(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/customer/${customerId}`);
  }
  
  getQuotesForCustomer(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/quotes/${customerId}`);
  }

  getCustomers(): Observable<CustomersResponse> {
    return this.http.get<CustomersResponse>(`${this.apiUrl}/customers`);
  }


  getQuotesWithCustomerNames(): Observable<QuoteWithCustomer[]> {
    return this.http.get<QuoteWithCustomer[]>(`${this.apiUrl}/quotes-with-customer-name`);
  }
}