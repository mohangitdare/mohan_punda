import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgentDataService {
  private currentAgentIdSubject = new BehaviorSubject<string | null>(null);
  
  currentAgentId$ = this.currentAgentIdSubject.asObservable();

  setCurrentAgentId(agentId: string | null): void {
    this.currentAgentIdSubject.next(agentId);
  }

  getCurrentAgentId(): string | null {
    return this.currentAgentIdSubject.getValue();
  }
}