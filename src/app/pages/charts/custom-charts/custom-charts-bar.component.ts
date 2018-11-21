import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-custom-chart-d3-bar',
  template: `
    <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>
  `,
})
export class CustomChartBarComponent implements OnDestroy {

  results = [
    { name: 'Kolkata', value: 8000 },
    { name: 'Hyderabad', value: 5000 },
    { name: 'Delhi', value: 2500 },
    { name: 'Odisha', value: 3100 },
    { name: 'Jharkhand', value: 4500 },
    { name: 'Goa', value: 2900 },
    { name: 'Himanchal', value: 900 },
  ];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'State';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      // const colors: any = config.variables;
      this.colorScheme = {
        domain: ['red', 'blue', 'green', 'yellow', '#55af34', '#002315', '#442318', 'blue', 'green'],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
