import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from './services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: any = FormGroup;
 

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private services: ServicesService) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  

  onSubmit() {
    if (this.userForm.invalid) {
      this.toastr.warning('Please fill all fields!');
    } else {
      this.services.saveData(this.userForm.value).subscribe(
        () => {
          this.toastr.success('User registered successfully!');
          this.router.navigate(['/login']);
        },
        (err) => {
          this.toastr.error('Registration failed!');
        }
      );
    }
  }

}
