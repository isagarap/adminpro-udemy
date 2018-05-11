import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(private _router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '875098759737-fav06por31q7fqola1ta9jqa9hei1tkm.apps.googleusercontent.com',
        cookiepolicy : 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSinIn(document.getElementById('btnGoogle'));

    });
  }

  attachSinIn( element ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      const token = googleUser.getAuthResponse().id_token;
      // const profile = googleUser.getBasicProfile();
      console.log(token);

      this.usuarioService.loginGoogle(token).subscribe( resp => window.location.href = '#/dashboard');

    });
  }

  ingresar(forma: NgForm) {

    if (!forma.valid) {
      return;
    }

    const usuario = new Usuario(
      null, forma.value.email, forma.value.password
    );

    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe( resp => this._router.navigate(['/dashboard']));


    // this._router.navigate(['/dashboard']);
  }

}
