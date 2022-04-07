import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  message: string = '';
  comments!: IComment[];
  constructor(
    private cdr: ChangeDetectorRef,
    private commService: CommentsService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
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
      return;
    }
  }

  public validateFields(field: string): boolean {
    return this.feedForm.get(field)?.invalid &&
      this.feedForm.get(field)?.touched
      ? true
      : false;
  }

  public getAllComments(): void {
    this.spinner.show();
    this.commService.getComments().subscribe((resp: IResponse) => {
      // emit change
      if (resp.status) {
        this.spinner.hide();
        this.comments = resp.data;
        this.comments.reverse();
        this.cdr.detectChanges();
      } else {
        this.spinner.hide();
      }
    });
  }

  public addComment(name: string, message: string): void {
    this.commService
      .newComment(name, message)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error.msg, '');
          this.spinner.hide();
          return throwError(() => err);
        })
      )
      .subscribe((resp: IResponse) => {
        this.spinner.show();
        if (resp.status) {
          this.feedForm.reset();
          this.message = '';
          this.toastr.success('Comment sent successfully', '', {
            timeOut: 3500,
          });
          this.getAllComments();
        }
      });
  }

  public sendMessageData(payload: IComment): void {
    const { name, message } = payload;
    this.addComment(name.toLowerCase(), message);
  }
}
