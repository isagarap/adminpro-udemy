import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css' ]
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string) {

    return ( grupo: FormGroup ) => {

      const pass1 = grupo.controls[campo1].value;
      const pass2 = grupo.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: false
    });

  }

  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'error');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']));

  }

}
