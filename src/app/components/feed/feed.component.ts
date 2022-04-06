import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from 'src/app/common/interfaces/comment.interface';
import { IResponse } from 'src/app/common/interfaces/response.interface';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  isInvalid!: boolean;
  feedForm: FormGroup;
  message!: string;
  comments!: IComment[];
  constructor(
    private cdr: ChangeDetectorRef,
    private commService: CommentsService
  ) {
    this.feedForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('')]),
      message: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllComments();
  }

  public onSendFeed(): void {
    this.feedForm.markAllAsTouched();
    if (this.feedForm.valid) {
      this.sendMessageData(this.feedForm.value);
    }
  }

  public validateFields(field: string): boolean {
    return this.feedForm.get(field)?.invalid &&
      this.feedForm.get(field)?.touched
      ? true
      : false;
  }

  public getAllComments(): void {
    this.commService.getComments().subscribe((resp: IResponse) => {
      // emit change
      if (resp.status) {
        this.comments = resp.data;
        this.comments.reverse();
      }
      this.cdr.detectChanges();
    });
  }

  public addComment(name: string, message: string): void {
    this.commService.newComment(name, message).subscribe((resp: IResponse) => {
      if (resp.status) {
        this.feedForm.reset();
        this.getAllComments();
      }
    });
  }

  public sendMessageData(payload: IComment): void {
    const { name, message } = payload;
    this.addComment(name, message);
  }
}
