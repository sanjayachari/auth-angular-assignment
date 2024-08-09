import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'], // Corrected property name
})
export class HomeComponent {
  httpClient = inject(HttpClient);
  checkUser() {
    return this.httpClient.get('http://localhost:3000/user');
  }

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router) {} // Inject Router

  onChange(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['email'].setValue(event.target.value, {
      emitEvent: false,
    });
  }

  onSubmit() {
    // console.log('rendered', this.myForm.value.email);
    if (!this.myForm.controls['email'].valid) {
      console.log('Email is empty or invalid');
      // Optionally, mark the email field as touched to show the error message immediately
      this.myForm.controls['email'].markAsTouched();
    } else {
      // console.log('Form submitted successfully:', this.myForm.value);
      // Proceed with form submission logic

      this.checkUser().subscribe((result: any) => {
        // console.log(result)
        result.filter((e: any) => {
          // console.log(e);
          if (e.email === this.myForm.value.email) {
            localStorage.setItem('email', this.myForm.value.email);
            return this.router.navigate(['/login']);
          } else {
            localStorage.setItem('email', this.myForm.value.email);
            return this.router.navigate(['/register']);
          }
        });
      });
    }
  }
}
