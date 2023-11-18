import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Message, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages: string[] = ['Monthly', 'Quarterly', 'Yearly'];
  public genders: string[] = ['Male', 'Female'];
  public importantList: string[] = [
    'Toxic fat reduction',
    'Energy and Endurance',
    'Building lean Muscle',
    'Healthier Digestive system',
    'Suger craving body',
    'Fitness',
  ];
  public regesterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private tosterService: NgToastService
  ) {}
  ngOnInit(): void {
    this.regesterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
  }
  submit() {
    this.api.postRegestration(this.regesterForm.value).subscribe((res) => {
      this.tosterService.success({
        detail: 'Success',
        summary: 'Enquiry Add',
        duration: 3000,
      });
      this.regesterForm.reset();
    });
  }
}
