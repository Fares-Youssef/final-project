import { Component } from '@angular/core';
import { AddressService } from '../../Services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

  addresses: any;
  asDefault = {
    is_default: 0
  }

  constructor(private address: AddressService) { }

  ngOnInit() {
    this.getAddress()
  }

  getAddress() {
    this.address.address().subscribe(res => {
      this.addresses = res.data;
    })
  }

  delete(id: any) {
    this.address.deleteAddress(id).subscribe(res => {
      this.getAddress()
      Swal.fire({
        title: 'Success!',
        text: 'Delete Address Successfuly.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      });
    }, (err) => {
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        timer: 1000,
        showConfirmButton: false
      });
    })
  }

  default(id: any) {
    this.asDefault.is_default = 1;
    this.address.updateAddress(this.asDefault, id).subscribe(res => {
      this.getAddress()
      Swal.fire({
        title: 'Success!',
        text: 'Set  Address Successfuly.',
        icon: 'success',
        timer: 1000,
        showConfirmButton: false
      });
    })
  }

}
