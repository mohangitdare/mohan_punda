

// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AdminService, Quote, AgentAuthorization } from '../admin/admin.service';
// //import { AgentService } from '../agent/agent.service';
// import { AgentService } from '../admin/agent.service';

// @Component({
//   selector: 'app-chips',
//   imports: [FormsModule,CommonModule],
//   templateUrl: './chips.component.html',
//   styleUrl: './chips.component.scss'
// })
// export class AgentComponent {
//   constructor(private adminService: AdminService, private agentService: AgentService) {}
//   currentAgentId!: string | null;
//   @Input() specificCustomer!: any;
//   @Input()  quotes:any[]=[];
//   allQuotes: Quote[] = []; // Global list of all quotes


//   approveQuoteByAgent(quoteId: string): void {
//     console.log('approveQuoteByAgent called for quote ID:', quoteId);
//     console.log('Current Agent ID:', this.currentAgentId);
//     if (this.currentAgentId) {
//       this.adminService.agentUpdateQuoteStatus(quoteId, 'APPROVED', this.currentAgentId)
//         .subscribe({
//           next: (response) => {
//             console.log('Approve Quote Response:', response);
//             if (response.success) {
//               console.log('Quote approved successfully:', response.message);
//               alert('Quote approved successfully ');
               
//               const index = this.specificCustomer.quotes.findIndex((quote: Quote) => quote._id === quoteId);
//               if (index !== -1) {
//                 // Update the quoteStatus directly in the array
//                 this.specificCustomer.quotes[index].quoteStatus = 'APPROVED';
//               }

//               if (this.specificCustomer?._id) {
//                 this.loadSpecificCustomerDetails(this.specificCustomer._id);
//               } else {
//                 console.warn('specificCustomer._id is not available, cannot refresh details.');
//               }
//             } else {
//               console.error('Failed to approve quote:', response.message);
//               alert(response.message || 'Failed to approve quote.');
//             }
//           },
//           error: (error) => {
//             console.error('Error approving quote (HTTP error):', error);
//             alert('Error approving quote.');
//           }
//         });
//     } else {
//       alert('Agent ID not found.');
//     }
//     this.loadAllQuotes();
//   }
  
//   rejectQuoteByAgent(quoteId: string): void {
//     console.log('rejectQuoteByAgent called for quote ID:', quoteId);
//     console.log('Current Agent ID:', this.currentAgentId);
//     if (this.currentAgentId) {
//       this.adminService.agentUpdateQuoteStatus(quoteId, 'REJECTED', this.currentAgentId)
//         .subscribe({
//           next: (response) => {
//             console.log('Reject Quote Response:', response);
//             if (response.success) {
//               console.log('Quote rejected successfully:', response.message);
//               alert('Quote rejected successfully');
//               const index = this.specificCustomer.quotes.findIndex((quote: Quote)=> quote._id === quoteId);
//             if (index !== -1) {
//               // Update the quoteStatus directly in the array
//               this.specificCustomer.quotes[index].quoteStatus = 'REJECTED';
//             } 
//               if (this.specificCustomer?._id) {
//                 this.loadSpecificCustomerDetails(this.specificCustomer._id);
//               } else {
//                 console.warn('specificCustomer._id is not available, cannot refresh details.');
//               }
//             } else {
//               console.error('Failed to reject quote:', response.message);
//               alert(response.message || 'Failed to reject quote.');
//             }
//           },
//           error: (error) => {
//             console.error('Error rejecting quote (HTTP error):', error);
//             alert('Error rejecting quote.');
//           }
//         });
//     } else {
//       alert('Agent ID not found.');
//     }
//     this.loadAllQuotes();
//   }

//    // Fetch all quotes
//    loadAllQuotes(): void {
//     this.adminService.getQuotes().subscribe((response: { success: boolean; quote: Quote[] }) => {
//       this.allQuotes = response.quote;
//     });
//   }

//   loadSpecificCustomerDetails(customerId: string): void {
//     if (customerId) {
//         this.adminService.getCustomerDetails(customerId).subscribe((response: any) => {
//             if (response.success && response.customer) {
//                 this.specificCustomer = response.customer;
//             } else {
//                 this.specificCustomer = null;
//                 console.error('Failed to load specific customer details:', response.message);
//             }
//         });
//     }
// }


// }
   

// // agent.component.ts
// import { Component, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AdminService, Quote } from '../admin/admin.service';
// import { AgentService } from '../admin/agent.service';

// @Component({
//   selector: 'app-chips',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   templateUrl: './chips.component.html',
//   styleUrls: ['./chips.component.scss'],
// })
// export class AgentComponent implements OnInit {
//   @Input() specificCustomer!: any;

//   agents: Agent[] = [];
//   selectedAgentId: string | null = null;
//   currentAgentId!: string | null;
//   customersAssignedToAgent: any[] = [];
//   allQuotes: Quote[] = [];

//   constructor(private adminService: AdminService, private agentService: AgentService) {}

//   ngOnInit(): void {
//     this.loadAllQuotes();
//     this.loadAgents();
//   }

//   // Fetch list of agents
//   loadAgents(): void {
//     this.agentService.getAgents().subscribe({
//       next: (response: Agent[]) => {
//         this.agents = response;
//       },
//       error: (err) => {
//         console.error('Error loading agents:', err);
//         alert('Error loading agents');
//       },
//     });
//   }

//   // Load customers assigned to the selected agent
//   loadAssignedCustomers(): void {
//     if (this.selectedAgentId) {
//       this.agentService.getAgentCustomers(this.selectedAgentId).subscribe({
//         next: (response) => {
//           this.customersAssignedToAgent = response;
//         },
//         error: (err) => {
//           console.error('Error loading customers for the selected agent:', err);
//           alert('Error loading customers for the selected agent');
//         },
//       });
//     }
//   }

//   // Approve a quote by the agent
//   approveQuoteByAgent(quoteId: string): void {
//     if (!this.currentAgentId) {
//       alert('Agent ID not found.');
//       return;
//     }

//     this.adminService.agentUpdateQuoteStatus(quoteId, 'APPROVED', this.currentAgentId).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Quote approved successfully');
//           const index = this.specificCustomer.quotes.findIndex((quote: Quote) => quote._id === quoteId);
//           if (index !== -1) {
//             this.specificCustomer.quotes[index].quoteStatus = 'APPROVED';
//           }
//           this.reloadCustomerDetails();
//         } else {
//           alert(response.message || 'Failed to approve quote.');
//         }
//       },
//       error: (error) => {
//         console.error('Error approving quote:', error);
//         alert('Error approving quote.');
//       },
//     });

//     this.loadAllQuotes();
//   }

//   // Reject a quote by the agent
//   rejectQuoteByAgent(quoteId: string): void {
//     if (!this.currentAgentId) {
//       alert('Agent ID not found.');
//       return;
//     }

//     this.adminService.agentUpdateQuoteStatus(quoteId, 'REJECTED', this.currentAgentId).subscribe({
//       next: (response) => {
//         if (response.success) {
//           alert('Quote rejected successfully');
//           const index = this.specificCustomer.quotes.findIndex((quote: Quote) => quote._id === quoteId);
//           if (index !== -1) {
//             this.specificCustomer.quotes[index].quoteStatus = 'REJECTED';
//           }
//           this.reloadCustomerDetails();
//         } else {
//           alert(response.message || 'Failed to reject quote.');
//         }
//       },
//       error: (error) => {
//         console.error('Error rejecting quote:', error);
//         alert('Error rejecting quote.');
//       },
//     });

//     this.loadAllQuotes();
//   }

//   // Reload all quotes
//   loadAllQuotes(): void {
//     this.adminService.getQuotes().subscribe({
//       next: (response) => {
//         this.allQuotes = response.quote;
//       },
//       error: (error) => {
//         console.error('Error loading quotes:', error);
//       },
//     });
//   }

//   // Reload specific customer details
//   reloadCustomerDetails(): void {
//     if (this.specificCustomer?._id) {
//       this.adminService.getCustomerDetails(this.specificCustomer._id).subscribe({
//         next: (response) => {
//           if (response.success && response.customer) {
//             this.specificCustomer = response.customer;
//           } else {
//             this.specificCustomer = null;
//             console.error('Failed to reload customer:', response.message);
//           }
//         },
//         error: (error) => {
//           console.error('Error reloading customer:', error);
//         },
//       });
//     }
//   }

//   // When agent is selected from dropdown
//   onAgentSelect(): void {
//     this.currentAgentId = this.selectedAgentId;
//     this.loadAssignedCustomers();
//   }
// }

// // Moved interface outside the class
// interface Agent {
//   id: string;
//   name: string;
// }  crttt





// import { Component, Input, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AdminService, Quote } from '../admin/admin.service';
// import { AgentService } from '../admin/agent.service';

// interface Agent {
//   id: string;
//   name: string;
// }

// @Component({
//   selector: 'app-chips',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './chips.component.html',
//   styleUrls: ['./chips.component.scss'],
// })
// export class AgentComponent implements OnInit {
//   agents: Agent[] = [];
//   selectedAgentId: string = '';

//   agent: { _id: string; id: string; name: string; customerassigned: string[] }[] = [];
//   customersAssignedToAgent: any[] = [];
//   allQuotes: Quote[] = [];
//   @Input() specificCustomer!: any;
//   currentAgentId: string | null = null;

//   constructor(private adminService: AdminService, private agentService: AgentService) {}

//   ngOnInit(): void {
//     this.loadAllQuotes();
//     this.loadAgents();
//   }

//   loadAgents(): void {
//     this.agentService.getAgents().subscribe({
//       next: (response) => {
//         this.agents = response;
//       },
//       error: (err) => {
//         console.error('Error loading agents:', err);
//         alert('Error loading agents');
//       },
//     });
//   }

//   loadAssignedCustomers(): void {
//     if (this.selectedAgentId) {
//       this.agentService.getAgentCustomers(this.selectedAgentId).subscribe({
//         next: (response) => {
//           this.customersAssignedToAgent = response;
//           this.currentAgentId = this.selectedAgentId;
//         },
//         error: (err) => {
//           console.error('Error loading customers for the selected agent:', err);
//           alert('Error loading customers for the selected agent');
//         },
//       });
//     }
//   }

//   onAgentSelect(): void {
//     this.loadAssignedCustomers();
//   }

//   loadSpecificCustomerDetails(customerId: string): void {
//     this.agentService.getCustomerSpecificDetails(customerId).subscribe({
//       next: (response) => {
//         this.specificCustomer = response;
//       },
//       error: (error) => {
//         console.error('Error loading specific customer details:', error);
//         alert('Failed to load customer details');
//       },
//     });
//   }

//   approveQuoteByAgent(quoteId: string): void {
//     if (this.currentAgentId) {
//       this.adminService.agentUpdateQuoteStatus(quoteId, 'APPROVED', this.currentAgentId).subscribe({
//         next: (response) => {
//           if (response.success) {
//             alert('Quote approved successfully');
//             this.loadAssignedCustomers();
//           } else {
//             alert(response.message || 'Failed to approve quote.');
//           }
//         },
//         error: () => alert('Error approving quote.'),
//       });
//     }
//   }

//   rejectQuoteByAgent(quoteId: string): void {
//     if (this.currentAgentId) {
//       this.adminService.agentUpdateQuoteStatus(quoteId, 'REJECTED', this.currentAgentId).subscribe({
//         next: (response) => {
//           if (response.success) {
//             alert('Quote rejected successfully');
//             this.loadAssignedCustomers();
//           } else {
//             alert(response.message || 'Failed to reject quote.');
//           }
//         },
//         error: () => alert('Error rejecting quote.'),
//       });
//     }
//   }

//   loadAllQuotes(): void {
//     this.adminService.getQuotes().subscribe({
//       next: (response) => {
//         this.allQuotes = response.quote;
//       },
//     });
//   }
// }   crttt




import { Component, OnInit } from '@angular/core';
import { AdminService, Quote } from '../admin/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgentDataService } from '../../../services/AgentDataService.service'; // Import the shared service
import { Subscription } from 'rxjs';




interface Testimonial {
  quote: string;
  author: string;
}

interface Industry {
  name: string;
  route: string;
}

@Component({
  selector: 'app-chips',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class AgentComponent  {
  
  specificCustomer: any; 
  customerId: string = '';
  currentAgentId: any;
  private agentIdSubscription: Subscription | undefined;

  constructor(private adminService: AdminService,private agentDataService: AgentDataService) { };

  ngOnInit(): void {
    this.customerId = this.adminService.getCustomerId(); // Assuming you have a method to get the customer ID
    this.loadSpecificCustomerDetails(this.customerId);
    this.getCurrentAgent();
        this.agentIdSubscription = this.agentDataService.currentAgentId$.subscribe(agentId => {
    this.currentAgentId = agentId;
    console.log('Current Agent ID in AgentComponent:', this.currentAgentId);
    // Now the AgentComponent has access to the selected agent's ID
    // You can use this.currentAgentId to perform actions, etc.
  });
    this.specificCustomer = this.adminService.getSpecificCustomer();
     console.log(this.specificCustomer);
  }

  getCurrentAgent(): void {
    // Your logic to get the current agent ID (e.g., from a service)
    // Example:
    // this.authService.getCurrentLoggedInAgentId().subscribe(agentId => {
    //  this.currentAgentId = agentId;
    // });
    this.currentAgentId = this.specificCustomer; // Replace with your actual logic
}



// ngOnInit(): void { c
//   this.customerId = this.adminService.getCustomerId();
//   this.agentIdSubscription = this.agentDataService.currentAgentId$.subscribe(agentId => {
//     this.currentAgentId = agentId;
//     console.log('Current Agent ID in AgentComponent:', this.currentAgentId);
//     // Now the AgentComponent has access to the selected agent's ID
//     // You can use this.currentAgentId to perform actions, etc.
//   });
// }





onAgentSelectionChanged(agentId: string): void {
  this.agentDataService.setCurrentAgentId(agentId);
  console.log('Selected Agent ID in Admin:', agentId);
}
  approveQuoteByAgent(quoteId: string): void {
    console.log("hello");
    
    console.log(this.specificCustomer);
    
    console.log(quoteId);
    
      console.log('approveQuoteByAgent called for quote ID:', quoteId);
      console.log('Current Agent ID:', this.currentAgentId);
      if (this.currentAgentId) {
        this.adminService.agentUpdateQuoteStatus(quoteId, 'APPROVED', this.currentAgentId)
          .subscribe({
            next: (response) => {
              console.log('Approve Quote Response:', response);
              if (response.success) {
                console.log('Quote approved successfully:', response.message);
                alert('Quote approved successfully ');
                 
                const index = this.specificCustomer.quotes.findIndex((quote: Quote) => quote._id === quoteId);
                if (index !== -1) {
                  // Update the quoteStatus directly in the array
                  this.specificCustomer.quotes[index].quoteStatus = 'APPROVED';
                }
   
                if (this.specificCustomer?._id) {
                  this.loadSpecificCustomerDetails(this.specificCustomer._id);
                } else {
                  console.warn('specificCustomer._id is not available, cannot refresh details.');
                }
              } else {
                console.error('Failed to approve quote:', response.message);
                alert(response.message || 'Failed to approve quote.');
              }
            },
            error: (error) => {
              console.error('Error approving quote (HTTP error):', error);
              alert('Error approving quote.');
            }
          });
      } else {
        alert('Agent ID not found.');
      }
      // this.loadAllQuotes();
    }
    rejectQuoteByAgent(quoteId: string): void {
      console.log('rejectQuoteByAgent called for quote ID:', quoteId);
      console.log('Current Agent ID:', this.currentAgentId);
      if (this.currentAgentId) {
        this.adminService.agentUpdateQuoteStatus(quoteId, 'REJECTED', this.currentAgentId)
          .subscribe({
            next: (response) => {
              console.log('Reject Quote Response:', response);
              if (response.success) {
                console.log('Quote rejected successfully:', response.message);
                alert('Quote rejected successfully');
                const index = this.specificCustomer.quotes.findIndex((quote: Quote)=> quote._id === quoteId);
              if (index !== -1) {
                // Update the quoteStatus directly in the array
                this.specificCustomer.quotes[index].quoteStatus = 'REJECTED';
              }
                if (this.specificCustomer?._id) {
                  this.loadSpecificCustomerDetails(this.specificCustomer._id);
                } else {
                  console.warn('specificCustomer._id is not available, cannot refresh details.');
                }
              } else {
                console.error('Failed to reject quote:', response.message);
                alert(response.message || 'Failed to reject quote.');
              }
            },
            error: (error) => {
              console.error('Error rejecting quote (HTTP error):', error);
              alert('Error rejecting quote.');
            }
          });
      } else {
        alert('Agent ID not found.');
      }
      // this.loadAllQuotes();
    }

  loadSpecificCustomerDetails(customerId: string): void {
    if (customerId) {
        this.adminService.getCustomerDetails(customerId).subscribe((response: any) => {
            if (response.success && response.customer) {
                this.specificCustomer = response.customer;
            } else {
                this.specificCustomer = null;
                console.error('Failed to load specific customer details:', response.message);
            }
        });
    }
}

}