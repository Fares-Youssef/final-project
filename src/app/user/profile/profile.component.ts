import { Component } from '@angular/core';
import { GlobalService } from '../../Services/global.service';
import { AuthService } from '../../Services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {


  uploadForm: FormGroup;
  selectedFile: File | null = null;
  userData: any = '';
  userId: any;
  model = {
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  };
  passwordModel = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  };
  constructor(private formBuilder: FormBuilder, private global: GlobalService, private auth: AuthService, private router: Router) {
    this.global.loaded = false
    auth.getPrfile().subscribe(res => {
      this.model.first_name = res.data.customer_first_name;
      this.model.last_name = res.data.customer_last_name;
      this.model.email = res.data.customer_email;
      this.model.phone = res.data.customer_phone;
      this.userId = res.data.customer_id
    }, (err) => {
      router.navigateByUrl('/')
    }, () => {
      this.global.loaded = true
    })

    this.uploadForm = this.formBuilder.group({
      image: [null, Validators.required] // Image control with validation
    });
  }
  handleSubmit(registerForm: any) {
    if (registerForm.valid) {
      this.global.loaded = false
      this.auth.updateProfile(this.model, this.userId).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('user_name', res.data.customer_first_name);
          Swal.fire({
            title: 'Success!',
            text: 'Update Prfile Successfully.',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Update Prfile failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }, () => {
          this.global.loaded = true
        }
      );
    }
  }
  handlePasswordChange(passwordForm: any) {
    if (passwordForm.valid && (this.passwordModel.confirm_password == this.passwordModel.new_password)) {
      this.global.loaded = false
      this.auth.changePassword(this.passwordModel).subscribe(
        (res) => {
          this.passwordModel.current_password = ''
          this.passwordModel.new_password = ''
          this.passwordModel.confirm_password = ''
          passwordForm.resetForm();
          Swal.fire({
            title: 'Success!',
            text: 'Change password Successfully.',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false
          });
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Change password failed. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }, () => {
          this.global.loaded = true
        }
      );
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.uploadForm.invalid || !this.selectedFile) {
      return;
    }
    this.global.loaded = false
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.auth.updateUserImage(formData).subscribe(res => {
      this.uploadForm.patchValue({
        image: null
      })
      Swal.fire({
        title: 'Success!',
        text: 'Change Image Successfully.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      });
      this.auth.src = res.data.image
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: 'Change Image failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }, () => {
      this.global.loaded = true
    })
  }
}
