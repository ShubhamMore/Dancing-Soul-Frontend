import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminAimComponent } from './admin/admin-about/admin-aim/admin-aim.component';
import { AdminEditAimComponent } from './admin/admin-about/admin-edit-aim/admin-edit-aim.component';
import { AdminPhilosophyComponent } from './admin/admin-about/admin-philosophy/admin-philosophy.component';
import { AdminEditPhilosophyComponent } from './admin/admin-about/admin-edit-philosophy/admin-edit-philosophy.component';
import { AdminHistoryComponent } from './admin/admin-about/admin-history/admin-history.component';
import { AdminEditHistoryComponent } from './admin/admin-about/admin-edit-history/admin-edit-history.component';

import { AdminArticleComponent } from './admin/admin-article/admin-article.component';
import { AdminAddArticleComponent } from './admin/admin-article/admin-add-article/admin-add-article.component';
import { AdminShowArticleComponent } from './admin/admin-article/admin-show-article/admin-show-article.component';
import { AdminEditArticleComponent } from './admin/admin-article/admin-edit-article/admin-edit-article.component';

import { AdminBranchComponent } from './admin/admin-branch/admin-branch.component';
import { AdminAddBranchComponent } from './admin/admin-branch/admin-add-branch/admin-add-branch.component';
import { AdminShowBranchComponent } from './admin/admin-branch/admin-show-branch/admin-show-branch.component';
import { AdminEditBranchComponent } from './admin/admin-branch/admin-edit-branch/admin-edit-branch.component';

import { AdminEnquiryComponent } from './admin/admin-enquiry/admin-enquiry.component';
import { AdminShowEnquiryComponent } from './admin/admin-enquiry/admin-show-enquiry/admin-show-enquiry.component';
import { AdminReplyEnquiryComponent } from './admin/admin-enquiry/admin-reply-enquiry/admin-reply-enquiry.component';

import { AdminExamComponent } from './admin/admin-exam/admin-exam.component';
import { AdminAddExamComponent } from './admin/admin-exam/admin-add-exam/admin-add-exam.component';
import { AdminShowExamComponent } from './admin/admin-exam/admin-show-exam/admin-show-exam.component';
import { AdminEditExamComponent } from './admin/admin-exam/admin-edit-exam/admin-edit-exam.component';

import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminAddNewsComponent } from './admin/admin-news/admin-add-news/admin-add-news.component';
import { AdminShowNewsComponent } from './admin/admin-news/admin-show-news/admin-show-news.component';
import { AdminEditNewsComponent } from './admin/admin-news/admin-edit-news/admin-edit-news.component';

import { AdminGallaryComponent } from './admin/admin-gallary/admin-gallary.component';
import { AdminAddPhotosComponent } from './admin/admin-gallary/admin-add-photos/admin-add-photos.component';
import { AdminShowPhotosComponent } from './admin/admin-gallary/admin-show-photos/admin-show-photos.component';
import { AdminAddVideosComponent } from './admin/admin-gallary/admin-add-videos/admin-add-videos.component';
import { AdminShowVideosComponent } from './admin/admin-gallary/admin-show-videos/admin-show-videos.component';

import { AdminAttendanceComponent } from './admin/admin-attendance/admin-attendance.component';
import { AdminShowAttendanceComponent } from './admin/admin-attendance/admin-show-attendance/admin-show-attendance.component';

import { AdminContactComponent } from './admin/admin-contact/admin-contact.component';

import { AdminFacultyComponent } from './admin/admin-faculty/admin-faculty.component';
import { AdminAddFacultyComponent } from './admin/admin-faculty/admin-add-faculty/admin-add-faculty.component';
import { AdminShowFacultyComponent } from './admin/admin-faculty/admin-show-faculty/admin-show-faculty.component';
import { AdminEditFacultyComponent } from './admin/admin-faculty/admin-edit-faculty/admin-edit-faculty.component';

import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminAddStudentComponent } from './admin/admin-student/admin-add-student/admin-add-student.component';
import { AdminShowStudentComponent } from './admin/admin-student/admin-show-student/admin-show-student.component';
import { AdminEditStudentComponent } from './admin/admin-student/admin-edit-student/admin-edit-student.component';
import { AdminStudentIdentityComponent } from './admin/admin-student/admin-student-identity/admin-student-identity.component';
import { AdminStudentCertificateComponent } from './admin/admin-student/admin-student-certificate/admin-student-certificate.component';
import { AdminStudentShowProgressComponent } from './admin/admin-student/admin-student-show-progress/admin-student-show-progress.component';
import { AdminStudentAddProgressComponent } from './admin/admin-student/admin-student-add-progress/admin-student-add-progress.component';
import { AdminStudentReceiptsComponent } from './admin/admin-student/admin-student-receipts/admin-student-receipts.component';
// tslint:disable-next-line: max-line-length
import { AdminStudentGenerateReceiptComponent } from './admin/admin-student/admin-student-generate-receipt/admin-student-generate-receipt.component';

import { AdminCareerComponent } from './admin/admin-career/admin-career.component';
import { AdminCareerContentComponent } from './admin/admin-career/admin-career-content/admin-career-content.component';
import { AdminShowCareerComponent } from './admin/admin-career/admin-show-career/admin-show-career.component';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

import {
  AdminAuthGuard,
  LoginAuthGuard,
  StudentAuthGuard,
  FacultuAuthGuard,
  ChangePassswordGuard
} from './auth/auth.guard';

import { StudentComponent } from './student/student.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentAttendanceComponent } from './student/student-attendance/student-attendance.component';
import { StudentReceiptsComponent } from './student/student-receipts/student-receipts.component';
import { StudentShowReceiptComponent } from './student/student-receipts/student-show-receipt/student-show-receipt.component';
import { StudentIdentityComponent } from './student/student-identity/student-identity.component';
import { StudentExamCertificateComponent } from './student/student-exam-certificate/student-exam-certificate.component';
import { StudentProgressComponent } from './student/student-progress/student-progress.component';

import { FacultyComponent } from './faculty/faculty.component';

import { HomePageComponent } from './content/home-page/home-page.component';
import { AboutPageComponent } from './content/about-page/about-page.component';
import { ContactUsPageComponent } from './content/contact-us-page/contact-us-page.component';
import { CareerPageComponent } from './content/career-page/career-page.component';
import { BranchesPageComponent } from './content/branches-page/branches-page.component';
import { GalleryPageComponent } from './content/gallery-page/gallery-page.component';
import { NewsShelterPageComponent } from './content/news-shelter-page/news-shelter-page.component';
import { ArticlesPageComponent } from './content/articles-page/articles-page.component';
import { ExamsPageComponent } from './content/exams-page/exams-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomePageComponent, canActivate: [LoginAuthGuard] },
  { path: 'about', component: AboutPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'contactUs', component: ContactUsPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'career', component: CareerPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'branches', component: BranchesPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'gallery', component: GalleryPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'articles', component: ArticlesPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'newsShelter', component: NewsShelterPageComponent, canActivate: [LoginAuthGuard] },
  { path: 'exams', component: ExamsPageComponent, canActivate: [LoginAuthGuard] },

  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },

  { path: 'forgot_password', component: ForgotPasswordComponent, canActivate: [LoginAuthGuard] },
  { path: 'reset_password', component: ResetPasswordComponent, canActivate: [LoginAuthGuard] },

  {
    path: 'change_password',
    component: ChangePasswordComponent,
    canActivate: [ChangePassswordGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard] },

      { path: 'about', redirectTo: 'about/aim', pathMatch: 'full' },
      { path: 'about/aim', component: AdminAimComponent, canActivate: [AdminAuthGuard] },
      { path: 'about/content', component: AdminAboutComponent, canActivate: [AdminAuthGuard] },
      { path: 'about/aim/edit', component: AdminEditAimComponent, canActivate: [AdminAuthGuard] },
      { path: 'about/history', component: AdminHistoryComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'about/history/edit',
        component: AdminEditHistoryComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'about/philosophy',
        component: AdminPhilosophyComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'about/philosophy/edit',
        component: AdminEditPhilosophyComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'faculty', component: AdminFacultyComponent, canActivate: [AdminAuthGuard] },
      { path: 'faculty/new', component: AdminAddFacultyComponent, canActivate: [AdminAuthGuard] },
      { path: 'faculty/:id', component: AdminShowFacultyComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'faculty/:id/edit',
        component: AdminEditFacultyComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'branch', component: AdminBranchComponent, canActivate: [AdminAuthGuard] },
      { path: 'branch/new', component: AdminAddBranchComponent, canActivate: [AdminAuthGuard] },
      { path: 'branch/:id', component: AdminShowBranchComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'branch/:id/edit',
        component: AdminEditBranchComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'exams', component: AdminExamComponent, canActivate: [AdminAuthGuard] },
      { path: 'exams/new', component: AdminAddExamComponent, canActivate: [AdminAuthGuard] },
      { path: 'exams/:id', component: AdminShowExamComponent, canActivate: [AdminAuthGuard] },
      { path: 'exams/:id/edit', component: AdminEditExamComponent, canActivate: [AdminAuthGuard] },

      { path: 'news', component: AdminNewsComponent, canActivate: [AdminAuthGuard] },
      { path: 'news/new', component: AdminAddNewsComponent, canActivate: [AdminAuthGuard] },
      { path: 'news/:id', component: AdminShowNewsComponent, canActivate: [AdminAuthGuard] },
      { path: 'news/:id/edit', component: AdminEditNewsComponent, canActivate: [AdminAuthGuard] },

      { path: 'gallery', redirectTo: 'gallery/photos', pathMatch: 'full' },
      {
        path: 'gallery/photos',
        component: AdminShowPhotosComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'gallery/photos/new',
        component: AdminAddPhotosComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'gallery/videos',
        component: AdminShowVideosComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'gallery/videos/new',
        component: AdminAddVideosComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'article', component: AdminArticleComponent, canActivate: [AdminAuthGuard] },
      { path: 'article/new', component: AdminAddArticleComponent, canActivate: [AdminAuthGuard] },
      { path: 'article/:id', component: AdminShowArticleComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'article/:id/edit',
        component: AdminEditArticleComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'student', component: AdminStudentComponent, canActivate: [AdminAuthGuard] },
      { path: 'student/new', component: AdminAddStudentComponent, canActivate: [AdminAuthGuard] },
      { path: 'student/:id', component: AdminShowStudentComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'student/:id/edit',
        component: AdminEditStudentComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/identity',
        component: AdminStudentIdentityComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/certificates',
        component: AdminStudentCertificateComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/progress',
        component: AdminStudentShowProgressComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/progress/new',
        component: AdminStudentAddProgressComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/generate',
        component: AdminStudentGenerateReceiptComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'student/:id/receipts',
        component: AdminStudentReceiptsComponent,
        canActivate: [AdminAuthGuard]
      },

      {
        path: 'career',
        component: AdminCareerComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'career/content',
        component: AdminCareerContentComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'career/:id',
        component: AdminShowCareerComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'contact', component: AdminContactComponent, canActivate: [AdminAuthGuard] },

      { path: 'attendance', component: AdminAttendanceComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'attendance/:id',
        component: AdminShowAttendanceComponent,
        canActivate: [AdminAuthGuard]
      },

      { path: 'enquiry', component: AdminEnquiryComponent, canActivate: [AdminAuthGuard] },
      { path: 'enquiry/:id', component: AdminShowEnquiryComponent, canActivate: [AdminAuthGuard] },
      {
        path: 'enquiry/:id/reply',
        component: AdminReplyEnquiryComponent,
        canActivate: [AdminAuthGuard]
      }
    ]
  },

  {
    path: 'student',
    component: StudentComponent,
    canActivate: [StudentAuthGuard],
    canActivateChild: [StudentAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: StudentDashboardComponent, canActivate: [StudentAuthGuard] },
      {
        path: 'attendance',
        component: StudentAttendanceComponent,
        canActivate: [StudentAuthGuard]
      },
      { path: 'identity', component: StudentIdentityComponent, canActivate: [StudentAuthGuard] },
      { path: 'receipts', component: StudentReceiptsComponent, canActivate: [StudentAuthGuard] },
      {
        path: 'certificates',
        component: StudentExamCertificateComponent,
        canActivate: [StudentAuthGuard]
      },
      { path: 'progress', component: StudentProgressComponent, canActivate: [StudentAuthGuard] },
      {
        path: 'receipt/:id',
        component: StudentShowReceiptComponent,
        canActivate: [StudentAuthGuard]
      }
    ]
  },

  { path: 'faculty', component: FacultyComponent, canActivate: [FacultuAuthGuard] },

  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'server-not-found', component: ServerErrorComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutes {}
