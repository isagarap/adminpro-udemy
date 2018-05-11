import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate() {

    if (this.usuarioService.estaLogueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

}
