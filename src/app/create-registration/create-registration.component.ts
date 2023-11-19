import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Message, NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

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
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private tosterService: NgToastService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
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
    this.ActivatedRoute.params.subscribe((val) => {
      this.userIdToUpdate = val['id'];
      this.api.getRegestrationUserId(this.userIdToUpdate).subscribe((res) => {
        this.isUpdateActive = true;
        this.fillFormToUpdate(res);
      });
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
  update() {
    this.api
      .updateRegestration(this.regesterForm.value, this.userIdToUpdate)
      .subscribe((res) => {
        this.tosterService.success({
          detail: 'Success',
          summary: 'Enquiry Updated',
          duration: 3000,
        });
        this.regesterForm.reset();
        this.router.navigate(['list']);
      });
  }
  fillFormToUpdate(user: User) {
    this.regesterForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      enquiryDate: user.enquiryDate,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      requireTrainer: user.requireTrainer,
    });
  }
}
