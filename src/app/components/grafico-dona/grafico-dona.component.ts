import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  @Input('chartLabels')  doughnutChartLabels: string[] = [];
  @Input('chartData')  doughnutChartData: number[] = [];
  @Input('chartType')  doughnutChartType: string = '';

  constructor() { }

  ngOnInit() {
  }

}
