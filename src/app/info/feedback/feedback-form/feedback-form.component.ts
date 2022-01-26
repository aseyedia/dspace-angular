import { RemoteData } from '../../../core/data/remote-data';
import { NoContent } from '../../../core/shared/NoContent.model';
import { FeedbackDataService } from '../../../core/feedback/feedback-data.service';
import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../core/services/route.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../core/auth/auth.service';
import { EPerson } from '../../../core/eperson/models/eperson.model';
import { getFirstCompletedRemoteData } from '../../../core/shared/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'ds-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
/**
 * Component displaying the contents of the Feedback Statement
 */
export class FeedbackFormComponent implements OnInit {

  /**
   * Form builder created used from the feedback from
   */
  feedbackForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    message: ['', Validators.required],
    page: [''],
  });

  constructor(
    public routeService: RouteService,
    private fb: FormBuilder,
    protected notificationsService: NotificationsService,
    protected translate: TranslateService,
    private feedbackDataService: FeedbackDataService,
    private authService: AuthService,
    private router: Router) {
  }

  /**
   * On init check if user is logged in and use its email if so
   */
  ngOnInit() {

    this.authService.getAuthenticatedUserFromStore().subscribe((user: EPerson) => {
      if (!!user) {
        this.feedbackForm.patchValue({ email: user.email });
      }
    });

    this.routeService.getPreviousUrl().subscribe((url: string) => {
      if (!url) {
        url = '/home';
      }
      this.feedbackForm.patchValue({ page: url });
    });

  }

  /**
   * Function to create the feedback from form values
   */
  createFeedback(): void {
    const url = this.feedbackForm.value.page;
    this.feedbackDataService.create(this.feedbackForm.value).pipe(getFirstCompletedRemoteData()).subscribe((response: RemoteData<NoContent>) => {
      if (response.isSuccess) {
        this.notificationsService.success(this.translate.instant('info.feedback.create.success'));
        this.feedbackForm.reset();
        this.router.navigateByUrl(url);
      }
    });
  }

}
