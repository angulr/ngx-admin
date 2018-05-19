/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN, NbAuthSocialLink } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';


@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  template: `
    <ngx-auth-block>
      <h2 class="title">Sign Up</h2>
      <form (ngSubmit)="register()" #form="ngForm">

        <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
             class="alert alert-danger" role="alert">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </div>
        <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
             class="alert alert-success" role="alert">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </div>

        <div class="form-group">
          <label for="input-name" class="sr-only">Full name</label>
          <input name="name" [(ngModel)]="user.name" id="input-name" #name="ngModel"
                 class="form-control" placeholder="Full name"
                 [class.form-control-danger]="name.invalid && name.touched"
                 [required]="getConfigValue('forms.validation.name.required')"
                 [minlength]="getConfigValue('forms.validation.name.minLength')"
                 [maxlength]="getConfigValue('forms.validation.name.maxLength')"
                 autofocus>
          <small class="form-text error" *ngIf="name.invalid && name.touched && name.errors?.required">
            Full name is required!
          </small>
          <small
            class="form-text error"
            *ngIf="name.invalid && name.touched && (name.errors?.minlength || name.errors?.maxlength)">
            Full name should contains
            from {{getConfigValue('forms.validation.pwd.minLength')}}
            to {{getConfigValue('forms.validation.pwd.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-email" class="sr-only">Email address</label>
          <input name="email" [(ngModel)]="user.email" id="input-email" #email="ngModel"
                 class="form-control" placeholder="Email address" pattern=".+@.+\..+"
                 [class.form-control-danger]="email.invalid && email.touched"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>

        <div class="form-group">
          <label for="input-pwd" class="sr-only">pwd</label>
          <input name="pwd" [(ngModel)]="user.pwd" type="password" id="input-pwd"
                 class="form-control" placeholder="password" #pwd="ngModel"
                 [class.form-control-danger]="pwd.invalid && pwd.touched"
                 [required]="getConfigValue('forms.validation.pwd.required')"
                 [minlength]="getConfigValue('forms.validation.pwd.minLength')"
                 [maxlength]="getConfigValue('forms.validation.pwd.maxLength')">
          <small class="form-text error" *ngIf="pwd.invalid && pwd.touched && pwd.errors?.required">
            password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="pwd.invalid && pwd.touched && (pwd.errors?.minlength || pwd.errors?.maxlength)">
            password should contains
            from {{ getConfigValue('forms.validation.pwd.minLength') }}
            to {{ getConfigValue('forms.validation.pwd.maxLength') }}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-pwd" class="sr-only">Repeat pwd</label>
          <input
            name="rePass" [(ngModel)]="user.confirmPassword" type="password" id="input-re-pwd"
            class="form-control" placeholder="Confirm password" #rePass="ngModel"
            [class.form-control-danger]="(rePass.invalid || pwd.value != rePass.value) && rePass.touched"
            [required]="getConfigValue('forms.validation.pwd.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && pwd.value != rePass.value && !rePass.errors?.required">
            password does not match the confirm password.
          </small>
        </div>

        <div class="form-group accept-group col-sm-12" *ngIf="getConfigValue('forms.register.terms')">
          <nb-checkbox name="terms" [(ngModel)]="user.terms" [required]="getConfigValue('forms.register.terms')">
            Agree to <a href="#" target="_blank"><strong>Terms & Conditions</strong></a>
          </nb-checkbox>
        </div>

        <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                [class.btn-pulse]="submitted">
          Register
        </button>
      </form>

      <div class="links">

        <ng-container *ngIf="socialLinks && socialLinks.length > 0">
          <small class="form-text">Or connect with:</small>

          <div class="socials">
            <ng-container *ngFor="let socialLink of socialLinks">
              <a *ngIf="socialLink.link"
                 [routerLink]="socialLink.link"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
              <a *ngIf="socialLink.url"
                 [attr.href]="socialLink.url"
                 [attr.target]="socialLink.target"
                 [attr.class]="socialLink.icon"
                 [class.with-icon]="socialLink.icon">{{ socialLink.title }}</a>
            </ng-container>
          </div>
        </ng-container>

        <small class="form-text">
          Already have an account? <a routerLink="../auth/login"><strong>Sign in</strong></a>
        </small>
      </div>
    </ngx-auth-block>
  `,
})
export class NbRegisterComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  socialLinks: NbAuthSocialLink[] = [];

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.register.redirectDelay');
    this.showMessages = this.getConfigValue('forms.register.showMessages');
    this.provider = this.getConfigValue('forms.register.provider');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.register(this.provider, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigate(['pages', 'dashboard']);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
