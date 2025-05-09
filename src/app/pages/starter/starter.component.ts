// import { Component, ViewEncapsulation } from '@angular/core';
// import { MaterialModule } from '../../material.module';
// import {  AppBarComponent} from 'src/app/components/barchart/barchart.component';
// import { AppYearlyBreakupComponent } from 'src/app/components/yearly-breakup/yearly-breakup.component';
// import { AppPiechartComponent } from 'src/app/components/piechart/piechart.component';
// import { AppRecentTransactionsComponent } from 'src/app/components/recent-transactions/recent-transactions.component';
// import { AppProductPerformanceComponent } from 'src/app/components/product-performance/product-performance.component';
// import { AppBlogCardsComponent } from 'src/app/components/blog-card/blog-card.component';
// import { AppTableComponent } from "../ui-components/admin/admin.component";


// @Component({
//   selector: 'app-starter',
//   imports: [
//     MaterialModule,
//     AppBarComponent,
//     AppYearlyBreakupComponent,
//     AppPiechartComponent,
//     AppRecentTransactionsComponent,
//     AppProductPerformanceComponent,
//     AppBlogCardsComponent,
//     AppTableComponent
// ],
//   templateUrl: './starter.component.html',
//   encapsulation: ViewEncapsulation.None,
// })
// export class StarterComponent { }




import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppBarComponent } from 'src/app/components/barchart/barchart.component';
import { AppPiechartComponent  } from 'src/app/components/piechart/piechart.component';
import { AppTableComponent } from 'src/app/pages/ui-components/admin/admin.component';
import { AdminService, Quote } from 'src/app/pages/ui-components/admin/admin.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-starter',
  standalone: true, // Mark as standalone
  imports: [
    MaterialModule,
    AppBarComponent,
    AppPiechartComponent ,
    AppTableComponent,
  ],
  templateUrl: './starter.component.html',
  // Add styleUrls if you have a CSS file
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit, OnDestroy {
  allQuotes: Quote[] = [];
  private ngUnsubscribe = new Subject<void>();
  Update = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  loadQuotes(): void {
    this.adminService.getQuotes()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response.success && response.quote) {
          this.allQuotes = response.quote;
          this.Update = !this.Update; // Trigger update for monthly earnings
        } else {
          console.error('Failed to load quotes in StarterComponent');
        }
      });
  }

  // Call this method from wherever a quote is added, updated, or deleted
  onQuoteUpdated(): void {
    this.loadQuotes();
  }
}