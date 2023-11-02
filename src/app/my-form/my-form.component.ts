import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Form } from '../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent {
  @ViewChild('userForm') userForm: any;

  user: Form = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  };

  constructor(private toast: ToastrService) {}

  onSubmit(event: NgForm) {
    console.log(event.value)
    if (event.value.password !== event.value.confirm_password) {
      alert(
        '⚠ Password Mismatch: The password and confirm password do not match. Please make sure to enter the same password in both fields.'
      );
    } else {
      if (this.checkPasswordStrength(event.value.password)) {
        this.user = event.value;
        event.resetForm();
        alert('Registered succssfully ✔');
      }else{
        alert("⚠ Password should contain a combination of at least one uppercase letter, one lowercase letter, one digit, and one special character.")
      }
    }
  }

  checkPasswordStrength(password: string): boolean {
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/
    return re.test(password);
  }
}
