// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentService {
//   private readonly apiUrl = 'http://localhost:5000/api'; // Backend API URL

//   constructor(private http: HttpClient) {}

//   // Assign customers to an agent
//   assignCustomersToAgent(agentId: string, customerIds: string[]): Observable<any> {
//     return this.http.post(`${this.apiUrl}/agents/${agentId}/customers`, { customerIds });
//   }

//   // Get customers assigned to an agent
//   getAgentCustomers(agentId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/agents/${agentId}/customers`);
//   }
//   getAgent() {
//     return this.http.get(`${this.apiUrl}/agents`);
//   }
//   getCustomerSpecificDetails(_id: string) {
//     console.log(`${this.apiUrl}/customers/${_id}`);
//     return this.http.get(`${this.apiUrl}/customers/${_id}`);
//   }
// }

// // agent.service.ts




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
interface Agent {
  id: string;
  name: string;
}


@Injectable({
  providedIn: 'root'
})


export class AgentService {
  private readonly apiUrl = 'http://localhost:5000/api'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Get all agents
  getAgent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/agents`);
  }

  getAgents(): Observable<Agent[]>{
    return this.http.get<Agent[]>(`${this.apiUrl}/agents`)
  }

  // Get customers assigned to a specific agent
  getAgentCustomers(agentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/agents/${agentId}/customers`);
  }

  // Get specific customer details by customer ID
  getCustomerSpecificDetails(_id: string): Observable<any> {
   // console.log(`${this.apiUrl}/customers/${_id}`);
    return this.http.get(`${this.apiUrl}/customers/${_id}`);
  }

  // Assign customers to an agent
  assignCustomersToAgent(agentId: string, customerIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/agents/${agentId}/customers`, { customerIds });
  }
}