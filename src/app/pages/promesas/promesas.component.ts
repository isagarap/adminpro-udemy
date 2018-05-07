import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      () => {
        console.log('OK');
      }
    ).catch(error => {
      console.error('Error ' + error);
    });

  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
    let contador = 0;

    const intervalo = setInterval( () => {

        contador += 1;

        if (contador === 3) {
          resolve(true);
          // reject('simple error');
          clearInterval(intervalo);
        }

      }, 1000);

    });
  }

}
