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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  onboard = 'initial'; // initial, registered, final

  httpClient = inject(HttpClient);
  checkUser() {
    return this.httpClient.get('http://localhost:3000/user');
  }
  addUser(user: object) {
    console.log('rendered!');
    return this.httpClient.post('http://localhost:3000/user', user);
  }

  
  myForm: FormGroup = new FormGroup({
    email: new FormControl(localStorage.getItem('email'), [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    organizationName: new FormControl('', [Validators.required]),
    organizationId: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
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
  onChangeFullName(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['fullName'].setValue(event.target.value, {
      emitEvent: false,
    });
  }

  onChangeOrg(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['organizationName'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangeOrgId(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['organizationId'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangeOrgDestination(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['designation'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangeOrgDob(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['dob'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangeOrgCity(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['city'].setValue(event.target.value, {
      emitEvent: false,
    });
  }
  onChangeOrgPinCode(event: any) {
    console.log('first', event.target.value);
    // Assuming you want to update the email form control with the new value
    this.myForm.controls['pincode'].setValue(event.target.value, {
      emitEvent: false,
    });
  }

  onSubmit() {
    // console.log('rendered', this.myForm.value.email);
    if (
      !this.myForm.controls['email'].valid ||
      !this.myForm.controls['password'].valid ||
      !this.myForm.controls['fullName'].valid
    ) {
      console.log('Email is empty or invalid');
      // Optionally, mark the email field as touched to show the error message immediately
      this.myForm.controls['email'].markAsTouched();
      this.myForm.controls['password'].markAsTouched();
      this.myForm.controls['fullName'].markAsTouched();
    } else {
      console.log('Form submitted successfully:', this.myForm.value);
      // Proceed with form submission logic

      this.checkUser().subscribe((result: any) => {
        const existingUser = result.find(
          (e: any) => e.email === this.myForm.value.email
        );

        if (existingUser) {
          console.log('Email already exists:', existingUser.email);
          localStorage.setItem('email', this.myForm.value.email);

          // Perform actions if the email exists, e.g., navigating to login or showing an alert
          alert('Email already exist!');
           this.router.navigate(['/login']);
        } else {
      

          // Store user data in local storage
          localStorage.setItem('email', this.myForm.value.email);
          localStorage.setItem('fullName', this.myForm.value.fullName);
          localStorage.setItem('password', this.myForm.value.password);

          // Set onboard status to 'registered'
          this.onboard = 'registered';

          // Optionally, navigate to a different page
          // return this.router.navigate(['/register']);
        }
      });
    }
  }

  createAcoount() {
    if (
      // !this.myForm.controls['password'].valid ||
      !this.myForm.controls['organizationName'].valid ||
      !this.myForm.controls['organizationId'].valid ||
      !this.myForm.controls['designation'].valid ||
      !this.myForm.controls['dob'].valid ||
      !this.myForm.controls['city'].valid
      // !this.myForm.controls['pincode'].valid
    ) {
      // Optionally, mark the email field as touched to show the error message immediately
      this.myForm.controls['password'].markAsTouched();
      this.myForm.controls['organizationName'].markAsTouched();
      this.myForm.controls['organizationId'].markAsTouched();
      this.myForm.controls['designation'].markAsTouched();
      this.myForm.controls['dob'].markAsTouched();
      this.myForm.controls['city'].markAsTouched();
    } else {
      console.log('rendered!!');

      let myEmail = localStorage.getItem('email');
      let usr = {
        email: myEmail,
        password: this.myForm.value.password,
        fullName: this.myForm.value.fullName,
        organizationName: this.myForm.value.organizationName,
        organizationId: this.myForm.value.organizationId,
        designation: this.myForm.value.designation,
        dob: this.myForm.value.dob,
        city: this.myForm.value.city,
        // pincode: this.myForm.value.pincode,
      };
      console.log('myEmail', myEmail);
      this.addUser(usr).subscribe((result) => console.log(result));
      this.onboard = 'final';

    }
  }
}
