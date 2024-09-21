import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../signup/services.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from './service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm:any= FormGroup; // Corrected type
  serviceService: any;

  constructor(
    private fb: FormBuilder, private toastr: ToastrService, private router: Router, private service: ServiceService ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 
  onSubmit() {
    if (this.userForm.valid) {
      this.service.login(this.userForm.value).subscribe((res: any) => {
          // Store user data in localStorage
          localStorage.setItem('userData', JSON.stringify(res));
          this.toastr.success('Login successful!');
          this.router.navigate(['/home']);
        },
        (err) => {
          this.toastr.error('Login failed!');
        }
      );
    }
  }


}
