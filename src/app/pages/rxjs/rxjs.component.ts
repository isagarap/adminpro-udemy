import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().retry(2)
                            .subscribe(
                              numero => console.log('subs', numero),
                              error => console.error('Error en el obs', error),
                              () => console.log('Termino el obs')
                            );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<number> {
      return  new Observable( observer => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor : contador
        };

        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('help !');
        // }

      }, 500);

    }).map( (resp: any) => {
      return resp.valor;
    })
    .filter( (valor, index) => {
      // console.log('Filter', valor, index);

      if ( (valor % 2) === 1) {
        // impar
        return true;
      } else {
        // par
        return false;
      }

    } );
  }

}
