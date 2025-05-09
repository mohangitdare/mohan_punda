import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Quote } from 'src/app/pages/ui-components/admin/admin.service';

import {
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexOptions,
    ApexDataLabels,
    ApexLegend,
    ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexOptions;
    responsive: ApexResponsive[];
    labels: any;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    fill: ApexFill;
    colors: string[];
};

@Component({
    selector: 'app-piechart',
    standalone: true,
    imports: [MaterialModule, NgApexchartsModule],
    templateUrl: './piechart.component.html',
})
export class AppPiechartComponent implements OnInit, OnChanges {
    @Input() quotes: Quote[] = [];
    @Input() forceUpdate: boolean = false;
    public yearlyBreakupChart: Partial<ChartOptions> | any;
    totalQuotes: number = 0;
    acceptedQuotes: number = 0;
    rejectedQuotes: number = 0;
    pendingQuotes: number = 0;
    lastYearChange: number = 0;

    constructor() { }

    ngOnInit(): void {
        this.updateQuoteDataAndChart();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['quotes'] || changes['forceUpdate']) {
            this.updateQuoteDataAndChart();
        }
    }

    updateQuoteDataAndChart(): void {
        this.totalQuotes = this.quotes.length;
        this.acceptedQuotes = this.quotes.filter(quote => quote.quoteStatus === 'APPROVED').length;
        this.rejectedQuotes = this.quotes.filter(quote => quote.quoteStatus === 'REJECTED').length;
        this.pendingQuotes = this.quotes.filter(quote => quote.quoteStatus === 'PENDING').length;
        this.updateLastYearChange();
        this.updateChart();
    }

    updateLastYearChange(): void {
        // Implement your logic here if needed
    }

    updateChart(): void {
        this.yearlyBreakupChart = {
            series: [this.totalQuotes, this.acceptedQuotes, this.rejectedQuotes, this.pendingQuotes],
            chart: {
                type: 'donut',
                height: 280,
            },
            colors: ['#5D87FF', '#28B781', '#E46A76', '#FFB22E'],
            labels: ['Total', 'Accepted', 'Rejected', 'Pending'],
            dataLabels: {
                enabled: true,
                formatter: (val: number, opts: any) => {
                    return opts.w.config.series[opts.seriesIndex];
                },
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                offsetY: 10,
            },
            fill: {
                type: 'solid',
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        };
    }
}