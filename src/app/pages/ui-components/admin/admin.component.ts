


import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService, Quote, AgentAuthorization } from '../admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../admin/agent.service';

import { AgentDataService } from '../../../services/AgentDataService.service';
//import { AgentComponent } from '../chips/chips.component';



interface QuoteWithCustomer {
  _id: string;
  customerId: string;
  businessType: string;
  coverageAmount: number;
  quoteStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUBMITTED';
  customerName: string; // New field for customer name
  // ... other quote properties
}

@Component({
  selector: 'app-tables',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})

export class AppTableComponent implements OnInit {
  allQuotes: Quote[] = []; // Global list of all quotes
  selectedQuote: any;
  dialogQuote: any;
  isEditDialogOpen = false;
  quotes: any[] = [];

  quotess: QuoteWithCustomer[] = [];
  currentAgentId!: string | null;
 
  specificCustomer: any; // Customer details
  quotesForCustomer: Quote[] = []; // Quotes specific to the selected customer
  agents: { _id: string; id: string; name: string; customerassigned: string[] }[] = [];
  selectedAgent: string = '';
  customerToAuthorize: string = '';
  agentAuthorizations: AgentAuthorization[] = [];
 
  @ViewChild('editForm') editForm!: NgForm;
 
  constructor(private adminService: AdminService, private agentService: AgentService,private agentDataService: AgentDataService) {}
 
  ngOnInit(): void {
    this.getAgentAndAsignToAgent();
    this.loadAllQuotes();
    this.getCurrentAgent();
    this.loadQuotesWithCustomerNames();
  }

  loadQuotesWithCustomerNames(): void {
    this.adminService.getQuotesWithCustomerNames().subscribe(
      (data: QuoteWithCustomer[]) => {
        this.quotess = data;
        console.log('Quotes with customer names:', this.quotess);
      },
      (error) => {
        console.error('Error loading quotes with customer names:', error);
      }
    );
  }
 
//   getCurrentAgent(): void {
//     // Your logic to get the current agent ID (e.g., from a service)
//     // Example:
//     // this.authService.getCurrentLoggedInAgentId().subscribe(agentId => {
//     //     this.currentAgentId = agentId;
//     // });
//     this.currentAgentId = this.selectedAgent; // Replace with your actual logic
// }
getCurrentAgent(): string | null {
  return this.selectedAgent;
}
onAgentSelectionChanged(agentId: string): void {
  this.agentDataService.setCurrentAgentId(agentId); // Update the service
  console.log('Selected Agent ID in Admin:', agentId);
}
  // Fetch the list of agents
  // getAgentAndAsignToAgent(): void {
  //   this.agentService.getAgent().subscribe((response: any) => {
  //     if (response.success) {
  //       this.agents = response.agents;
  //     } else {
  //       console.error('Failed to fetch agents');
  //     }
  //   });
  // }

  getAgentAndAsignToAgent(): void {
    this.agentService.getAgent().subscribe((response: any) => {
      if (response.success) {
        this.agents = response.agents;
        console.log('Fetched Agents:', this.agents); // Add this line
      } else {
        console.error('Failed to fetch agents');
      }
    });
  }
 
  // Fetch all quotes
  loadAllQuotes(): void {
    this.adminService.getQuotes().subscribe((response) => {
      this.allQuotes = response.quote;
    });
  }
 
  // Update the status of a quote
  updateQuoteStatus(_id: string, status: 'APPROVED' | 'REJECTED'): void {
    this.adminService.updateQuoteStatus(_id, status).subscribe({
        next: (response) => {
            if (response.success) {
              this.loadQuotesWithCustomerNames();
                // Optionally refresh specific customer details if needed
                if (this.specificCustomer && this.specificCustomer._id === this.allQuotes.find(q => q._id === _id)?.customerId) {
                    this.loadSpecificCustomerDetails(this.specificCustomer._id);
                }
            }
        },
        error: (error) => {
            console.error('Error updating quote status:', error);
            alert('Error updating quote.');
        },
    });
}
 
 
  // Delete a quote
  deleteQuote(_id: string): void {
    this.adminService.deleteQuote(_id).subscribe(() => {
      this.loadQuotesWithCustomerNames();
    });
  }
 
  openEditDialog(quote: QuoteWithCustomer): void {
    console.log('Before opening edit dialog:', quote); // Log the quote data before opening
    this.selectedQuote = { ...quote }; // Populate selectedQuote for the form
    this.isEditDialogOpen = true;
    console.log('After opening edit dialog, selectedQuote:', this.selectedQuote); // Log after setting selectedQuote and opening
  }
  onSaveChanges(): void {
    this.adminService.updateQuote(this.dialogQuote).subscribe(
      (response) => {
        console.log("Quote saved", response);
        this.isEditDialogOpen = false;
      },
      (error) => {
        console.error("Error saving", error);
      }
    )
 
  }
  updateQuoteInList(updatedQuote: QuoteWithCustomer): void {
    //  Assuming you have a list of quotes in your component, e.g., this.quotes: Quote[]
    const index = this.quotes.findIndex(q => q._id === updatedQuote._id); // Find by ID
    console.log(index);
    console.log(this.quotes[index]);
    if (index > -1) {
      this.quotes[index] = updatedQuote; // Replace the entire quote object
    }
  }
 
  // Close the Edit dialog
  closeEditDialog(): void {
    this.isEditDialogOpen = false;
    this.dialogQuote = {};
    this.selectedQuote = null;
  }
 
  // Submit the updated quote
  submitUpdate(): void {
    if (this.editForm.valid) {
      this.adminService.updateQuote(this.dialogQuote as Quote).subscribe(() => {
        this.loadQuotesWithCustomerNames();
        this.closeEditDialog();
      });
    }
  }
 
  saveEditedQuote(): void {
    if (this.selectedQuote) {
      console.log('Saving edited quote:', this.selectedQuote);
      this.adminService.updateQuote(this.selectedQuote).subscribe((val) => {
        console.log(val);
        this.loadQuotesWithCustomerNames();
      })
    }}
 
 
    
  // Authorize a customer for an agent
  authorizeCustomerForAgent(): void {
    if (!this.selectedAgent || !this.customerToAuthorize) {
      alert('Please select an agent and enter a customer ID.');
      return;
    }
    this.currentAgentId = this.selectedAgent;
    
    this.adminService.authorizeCustomer(this.selectedAgent, this.customerToAuthorize).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert('Customer assigned to agent successfully.');
          this.specificCustomer = response.customer; // Store the specific customer details
          this.adminService.setSpecificCustomer(response.customer);
          console.log('Specific customer details:', this.specificCustomer); // Debugging log
        } else {
          console.error('Customer not found or other issue:', response.message);
        }
      },
      error: (error) => {
        console.error('Error assigning customer to agent:', error);
      },
    });
  }
 
 
  approveQuoteByAgent(quoteId: string): void {
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
    this.loadAllQuotes();
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
    this.loadAllQuotes();
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
 
 
 