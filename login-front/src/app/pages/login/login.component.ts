import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [HttpClient, UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  public token: any = '';

  constructor(private userService: UserService, private router: Router) {
    this.token = this.userService.getToken();
  }

  iniciarsesion(iniciarsesionForm: any) {
    if (iniciarsesionForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password,
      };
      this.userService.login_user(data).subscribe(
        (response) => {
          if (response.data === undefined) {
            // El token no está presente en la respuesta
          } else {
            this.usuario = response.data;

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('nombre', response.data.user.nombres);
            this.router.navigate(['/home']);
          }
        },

        (error) => {
          if (error) {
            // iziToast.show({
            //   title: 'Error:',
            //   titleColor: 'red',
            //   class: 'text-danger',
            //   position: 'topRight',
            //   message: 'Correo o contraseña incorrecta',
            //   //messageColor: '',
            //   //backgroundColor: '',
            // });
          } else {
            //
          }
        }
      );
    } else {
      // iziToast.show({
      //   title: 'Error:',
      //   titleColor: 'red',
      //   class: 'text-danger',
      //   position: 'topRight',
      //   message: 'Los datos del formulario no son validos',
      //   //messageColor: '',
      //   //backgroundColor: '',
      // });
    }
  }
}
