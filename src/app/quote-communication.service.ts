


import { Injectable } from '@angular/core';

export interface Quote {
  quoteId: number;
  customerId: number;
  businessType: string;
  businessSize: string;
  coverageRequirements: string;
  location: string;
  otherRiskFactors: string;
  coverageAmount: number;
  quoteStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUBMITTED';
  agentId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private readonly QUOTES_KEY = 'insuranceQuotes';
  private nextQuoteId = this.getNextId();

  constructor() {
    this.initializeQuotes();
  }

  private initializeQuotes(): void {
    if (!localStorage.getItem(this.QUOTES_KEY)) {
      localStorage.setItem(this.QUOTES_KEY, JSON.stringify([]));
    }
  }

  private getQuotesFromStorage(): Quote[] {
    const storedQuotes = localStorage.getItem(this.QUOTES_KEY);
    return storedQuotes ? JSON.parse(storedQuotes) : [];
  }

  private saveQuotesToStorage(quotes: Quote[]): void {
    localStorage.setItem(this.QUOTES_KEY, JSON.stringify(quotes));
  }

  private getNextId(): number {
    const quotes = this.getQuotesFromStorage();
    if (quotes.length === 0) {
      return 1;
    }
    const maxId = Math.max(...quotes.map(quote => quote.quoteId));
    return maxId + 1;
  }

  addQuote(customerId: number, quote: Partial<Quote>): void {
    const newQuote: Quote = {
      quoteId: this.nextQuoteId++,
      customerId: customerId,
      businessType: quote.businessType || '',
      businessSize: quote.businessSize || '',
      coverageRequirements: quote.coverageRequirements || '',
      location: quote.location || '',
      otherRiskFactors: quote.otherRiskFactors || '',
      coverageAmount: quote.coverageAmount || 0,
      quoteStatus: 'PENDING'
    };
    const quotes = this.getQuotesFromStorage();
    quotes.push(newQuote);
    this.saveQuotesToStorage(quotes);
    this.saveNextId();
  }


  private saveNextId(): void {
    const quotes = this.getQuotesFromStorage();
    if (quotes.length > 0) {
      const maxId = Math.max(...quotes.map(quote => quote.quoteId));
      this.nextQuoteId = maxId + 1;
    } else {
      this.nextQuoteId = 1;
    }
  }

  getCustomerQuotes(customerId: number): Quote[] {
    const quotes = this.getQuotesFromStorage();
    return quotes.filter(q => q.customerId === customerId);
  }

  getAllQuotes(): Quote[] {
    return this.getQuotesFromStorage();
  }

  updateQuoteStatus(quoteId: number, status: 'APPROVED' | 'REJECTED'): void {
    const quotes = this.getQuotesFromStorage();
    const index = quotes.findIndex(q => q.quoteId === quoteId);
    if (index !== -1) {
      quotes[index] = { ...quotes[index], quoteStatus: status };
      this.saveQuotesToStorage(quotes);
    }
  }

  deleteQuote(quoteId: number): void {
    let quotes = this.getQuotesFromStorage();
    quotes = quotes.filter(q => q.quoteId !== quoteId);
    this.saveQuotesToStorage(quotes);
    this.saveNextId();
  }

  updateQuote(updatedQuote: Quote): void {
    const quotes = this.getQuotesFromStorage();
    const index = quotes.findIndex(q => q.quoteId === updatedQuote.quoteId);
    if (index !== -1) {
      quotes[index] = updatedQuote;
      this.saveQuotesToStorage(quotes);
    }
  }
  getQuoteById(quoteId: number): Quote | undefined {
    const quotes = this.getQuotesFromStorage();
    return quotes.find(quote => quote.quoteId === quoteId);
  }
}