import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // isAuthenticated=true
  isAuthenticated = false;
  isWrongCredential = false;
  httpClient = inject(HttpClient);
  checkUser() {
    return this.httpClient.get('http://localhost:3000/user');
  }

  getEmail = localStorage.getItem('email');
  myForm: FormGroup = new FormGroup({
    email: new FormControl(this.getEmail, [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {} // Inject Router

  onChangeEmail(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['email'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangePassword(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['password'].setValue(event.target.value, {
      emitEvent: false,
    });
  }

  onSubmit() {
    // console.log('rendered', this.myForm.value.email);
    if (
      !this.myForm.controls['email'].valid ||
      !this.myForm.controls['password'].valid
    ) {
      console.log('Email is empty or invalid');
      // Optionally, mark the email field as touched to show the error message immediately
      this.myForm.controls['email'].markAsTouched();
      this.myForm.controls['password'].markAsTouched();
    } else {
      // console.log('Form submitted successfully:', this.myForm.value);
      // Proceed with form submission logic
      this.checkUser().subscribe((result: any) => {
        const user = result.find(
          (e: any) => e.email === this.myForm.value.email && e.password === this.myForm.value.password
        );
      
        if (user) {
          console.log('Authenticated user:', user);
          this.isAuthenticated = true;
          // Proceed with login or further actions
          // localStorage.setItem('email', this.myForm.value.email);
          // return this.router.navigate(['/login']);
        } else {
          console.log('Wrong credentials');
          alert('Wrong credentials');
          this.isAuthenticated = false;
        }
      });
      
    }
  }
}
