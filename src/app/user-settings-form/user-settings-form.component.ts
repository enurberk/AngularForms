import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {
  singleModel = 'On';

  startDate: Date | undefined;
  startTime: Date | undefined;

  userRating = 0;
  maxRating = 10;

  originalUserSettings: UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subcscriptionType: null,
    notes: null
  };

  userSettings: UserSettings = { ...this.originalUserSettings };
  postError = false;
  postErrorMessage = '';
  subscriptionTypes: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTypes();
    this.startDate = new Date();
    this.startTime = new Date();
  }

  //onBlur eventi kullanıldı, spesifik alanların kontrolu için kullanılır
  onBlur(field: NgModel) {
    console.log('in onBlur: ', field.valid);
  }

  //Form gönderildiğinde formu kontrol etmek için kullanılır
  onSubmit(form: NgForm) {
    console.log('in onSubmit: ', form.value);
    // console.log('in onSubmit: ', form.valid);
    // if (form.valid) {
    //   this.dataService.postUserSettingsForm(this.userSettings).subscribe({
    //     next: (result) => console.log('success: ', result),
    //     error: (err) => this.onHttpError(err)
    //   });
    // }
    // else{
    //   this.postError = true;
    //   this.postErrorMessage = 'Please fix the errors.';
    // }

  }

  onHttpError(errResponse: any) {
    console.log('error: ', errResponse);
    this.postError = true;
    this.postErrorMessage = errResponse.error.errorMessage;
  }
}
