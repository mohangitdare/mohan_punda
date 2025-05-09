import { Component, ViewChild, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AdminService } from 'src/app/pages/ui-components/admin/admin.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexXAxis,
    ApexYAxis,
    ApexGrid,
    ApexPlotOptions,
    ApexFill,
    ApexMarkers,
    ApexResponsive,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';

interface month {
    value: string;
    viewValue: string;
}


interface Customer {
    _id: string;
    name: string;
    // Add other properties of your customer object here
}

export interface salesOverviewChart {
    series: ApexAxisChartSeries[]; // Changed to array for multiple series
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
    grid: ApexGrid;
    marker: ApexMarkers;
}

interface CustomerQuoteData {
    customerId: string;
    customerName: string;
    total: number;
    accepted: number;
    rejected: number;
}

@Component({
    selector: 'app-barchart',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TablerIconsModule,
        NgApexchartsModule,
        MatButtonModule
    ],
    templateUrl: './barchart.component.html', // Updated template URL
})
export class AppBarComponent implements OnInit{
    @ViewChild('chart') chart: ChartComponent = Object.create(null);

    public customerQuoteChart!: Partial<salesOverviewChart> | any;
    customerQuoteData: CustomerQuoteData[] = [];
    isLoading: boolean = true;

    months: month[] = [
        { value: 'all', viewValue: 'All Time' },
    ];
    selectedMonth: string = 'all';

    constructor(private adminService: AdminService) { }

    ngOnInit(): void {
        this.loadCustomerQuoteData();
    }


    loadCustomerQuoteData(): void {
        this.isLoading = true;

        forkJoin({
            quotesResponse: this.adminService.getQuotes(),
            customersResponse: this.adminService.getCustomers() // Using getCustomers to get all customer names
        }).subscribe(
            ({ quotesResponse, customersResponse }) => {
                if (quotesResponse.success && customersResponse.success) {
                    const allQuotes = quotesResponse.quote || [];
                    const customers: Customer[] = customersResponse.customers || [];

                    this.customerQuoteData = customers.map((customer: Customer) => {
                        const customerQuotes = allQuotes.filter(
                            (quote) => quote.customerId === customer._id
                        );
                        return {
                            customerId: customer._id,
                            customerName: customer.name,
                            total: customerQuotes.length,
                            accepted: customerQuotes.filter((q) => q.quoteStatus === 'APPROVED').length,
                            rejected: customerQuotes.filter((q) => q.quoteStatus === 'REJECTED').length,
                        };
                    });

                    this.updateChartData();
                    this.isLoading = false;
                } else {
                    console.error('Error fetching quotes or customer details');
                    this.isLoading = false;
                    // Optionally display an error message to the user
                }
            },
            (error) => {
                console.error('An error occurred:', error);
                this.isLoading = false;
                // Optionally display an error message to the user
            }
        );
    }

    updateChartData(): void {
        this.customerQuoteChart = {
            series: [
                {
                    name: 'Total',
                    data: this.customerQuoteData.map(data => ({ x: data.customerName, y: data.total })),
                    color: '#3498db', // Blue
                },
                {
                    name: 'Accepted',
                    data: this.customerQuoteData.map(data => ({ x: data.customerName, y: data.accepted })),
                    color: '#2ecc71', // Green
                },
                {
                    name: 'Rejected',
                    data: this.customerQuoteData.map(data => ({ x: data.customerName, y: data.rejected })),
                    color: '#e74c3c', // Red
                },
            ],
            grid: {
                borderColor: 'rgba(0,0,0,0.1)',
                strokeDashArray: 3,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '65%',
                    borderRadius: 4,
                    // grouped: true, // Enable grouping of bars (not strictly needed with the series structure)
                },
            },
            chart: {
                type: 'bar',
                height: 390,
                stacked: false, // Keep it false for grouped bars
                toolbar: { show: false },
                foreColor: '#333',
                fontFamily: 'inherit',
            },
            dataLabels: { enabled: false },
            markers: { size: 0 },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'center'
            },
            xaxis: {
                type: 'category',
                labels: {
                    style: {
                        colors: '#333',
                        fontSize: '12px'
                    },
                    rotate: -45,
                    hideOverlappingLabels: true
                },
            },
            yaxis: {
                title: {
                    text: 'Number of Quotes',
                    style: {
                        color: '#333'
                    }
                },
                min: 0,
                max: Math.max(...this.customerQuoteData.map(d => Math.max(d.total, d.accepted, d.rejected))) + 2,
                tickAmount: 5,
                labels: {
                    style: {
                        colors: '#333'
                    },
                },
            },
            tooltip: {
                shared: false, // Set to false for individual bar tooltips
                intersect: true,
                y: {
                    formatter: function (val: number) {
                        return val.toString();
                    }
                }
            },
            responsive: [{
                breakpoint: 600,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '75%',
                        }
                    },
                    xaxis: {
                        labels: {
                            rotate: -45
                        }
                    }
                }
            }]
        };
        //this.loadCustomerQuoteData();
    }

    onMonthChange(event: any): void {
        this.selectedMonth = event.value;
        this.loadCustomerQuoteData();
    }
}