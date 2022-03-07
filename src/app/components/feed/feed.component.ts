import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  isInvalid!: boolean;
  feedForm: FormGroup;
  message!: string;

  constructor() {
    this.feedForm = new FormGroup({
      name: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.message = '';
  }

  public onSendFeed(): void {
    this.feedForm.markAllAsTouched();
    if (this.feedForm.valid) {
      console.log(this.feedForm.value);
    }
  }

  public validateFields(field: string): boolean {
    return this.feedForm.get(field)?.invalid &&
      this.feedForm.get(field)?.touched
      ? true
      : false;
  }

  public invalidForm(): boolean {
    const name = this.feedForm.get('name');
    const message = this.feedForm.get('message');
    if (name?.invalid || message?.invalid) {
      this.isInvalid = true;
      return true;
    }
    return false;
  }
}
