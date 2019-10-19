import { NgModule } from '@angular/core';

// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

// ROUTES
import { AppRoutes } from './app.routes.module';

// GUARDS
import { AdminAuthGuard, LoginAuthGuard, StudentAuthGuard, FacultuAuthGuard, ChangePassswordGuard } from './auth/auth.guard';

// SERVICES
import { AuthService } from './auth/auth.service';

// COMPONENTS
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ContentComponent } from './content/content.component';
import { HomePageComponent } from './content/home-page/home-page.component';
import { AboutPageComponent } from './content/about-page/about-page.component';
import { ContactUsPageComponent } from './content/contact-us-page/contact-us-page.component';
import { GalleryPageComponent } from './content/gallery-page/gallery-page.component';
import { BranchesPageComponent } from './content/branches-page/branches-page.component';
import { ExamsPageComponent } from './content/exams-page/exams-page.component';
import { NewsShelterPageComponent } from './content/news-shelter-page/news-shelter-page.component';
import { ArticlesPageComponent } from './content/articles-page/articles-page.component';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';

import { AdminComponent } from './admin/admin.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { AdminAboutComponent } from './admin/admin-about/admin-about.component';
import { AdminAimComponent } from './admin/admin-about/admin-aim/admin-aim.component';
import { AdminEditAimComponent } from './admin/admin-about/admin-edit-aim/admin-edit-aim.component';
import { AdminHistoryComponent } from './admin/admin-about/admin-history/admin-history.component';
import { AdminEditHistoryComponent } from './admin/admin-about/admin-edit-history/admin-edit-history.component';
import { AdminPhilosophyComponent } from './admin/admin-about/admin-philosophy/admin-philosophy.component';
import { AdminEditPhilosophyComponent } from './admin/admin-about/admin-edit-philosophy/admin-edit-philosophy.component';

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

import { AdminFacultyComponent } from './admin/admin-faculty/admin-faculty.component';
import { AdminAddFacultyComponent } from './admin/admin-faculty/admin-add-faculty/admin-add-faculty.component';
import { AdminShowFacultyComponent } from './admin/admin-faculty/admin-show-faculty/admin-show-faculty.component';
import { AdminEditFacultyComponent } from './admin/admin-faculty/admin-edit-faculty/admin-edit-faculty.component';

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
import { AdminShowVideosComponent } from './admin/admin-gallary/admin-show-videos/admin-show-videos.component';
import { AdminAddVideosComponent } from './admin/admin-gallary/admin-add-videos/admin-add-videos.component';

import { AdminAttendanceComponent } from './admin/admin-attendance/admin-attendance.component';

import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminAddStudentComponent } from './admin/admin-student/admin-add-student/admin-add-student.component';
import { AdminShowStudentComponent } from './admin/admin-student/admin-show-student/admin-show-student.component';
import { AdminEditStudentComponent } from './admin/admin-student/admin-edit-student/admin-edit-student.component';
import { AdminStudentReceiptsComponent } from './admin/admin-student/admin-student-receipts/admin-student-receipts.component';
import { AdminStudentGenerateReceiptComponent } from './admin/admin-student/admin-student-generate-receipt/admin-student-generate-receipt.component';
import { AdminStudentIdentityComponent } from './admin/admin-student/admin-student-identity/admin-student-identity.component';
import { AdminStudentCertificateComponent } from './admin/admin-student/admin-student-certificate/admin-student-certificate.component';
import { AdminStudentAddProgressComponent } from './admin/admin-student/admin-student-add-progress/admin-student-add-progress.component';
import { AdminStudentShowProgressComponent } from './admin/admin-student/admin-student-show-progress/admin-student-show-progress.component';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';

import { StudentComponent } from './student/student.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentAttendanceComponent } from './student/student-attendance/student-attendance.component';
import { StudentReceiptsComponent } from './student/student-receipts/student-receipts.component';
import { StudentShowReceiptComponent } from './student/student-receipts/student-show-receipt/student-show-receipt.component';
import { StudentIdentityComponent } from './student/student-identity/student-identity.component';
import { StudentProgressComponent } from './student/student-progress/student-progress.component';
import { StudentExamCertificateComponent } from './student/student-exam-certificate/student-exam-certificate.component';

import { FacultyComponent } from './faculty/faculty.component';

import { FormValidator } from './validators/form.validator';

import { HttpService } from './services/httpPost.service';

import { AboutService } from './services/about.service';
import { ArticleService } from './services/article.service';
import { AttendanceService } from './services/attendance.service';
import { BranchService } from './services/branch.service';
import { CertificateService } from './services/certificate.service';
import { DashboardService } from './services/dashboard.service';
import { EnquiryService } from './services/enquiry.service';
import { ExamService } from './services/exam.service';
import { FacultyService } from './services/faculty.service';
import { GalleryService } from './services/gallery.service';
import { IdentityService } from './services/identity.service';
import { NewsService } from './services/news.service';
import { ReceiptService } from './services/receipt.service';
import { StudentService } from './services/student.service';


@NgModule({
  declarations: [
    // APP COMPONENT
    AppComponent,
    // HEADER AND FOOTER COMPONENT
    HeaderComponent,
    FooterComponent,
    // CONTENT COMPONENT
    ContentComponent,
    // MAIN PAGE COMPONENT
    HomePageComponent,
    AboutPageComponent,
    ContactUsPageComponent,
    BranchesPageComponent,
    GalleryPageComponent,
    ArticlesPageComponent,
    NewsShelterPageComponent,
    ExamsPageComponent,
    // AUTH COMPONENTS
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    // ADMIN COMPONENT
    AdminComponent,
    // ADMIN DASHBOARD COMPONENT
    AdminDashboardComponent,
    // ADMIN ABOUT COMPONENT
    AdminAboutComponent,
    AdminAimComponent,
    AdminEditAimComponent,
    AdminHistoryComponent,
    AdminEditHistoryComponent,
    AdminPhilosophyComponent,
    AdminEditPhilosophyComponent,
    // ADMIN ARTICLE COMPONENT
    AdminArticleComponent,
    AdminAddArticleComponent,
    AdminEditArticleComponent,
    AdminShowArticleComponent,
    // ADMIN BRANCH COMPONENT
    AdminBranchComponent,
    AdminAddBranchComponent,
    AdminEditBranchComponent,
    AdminShowBranchComponent,
    // ADMIN ENQUIRY COMPONENT
    AdminEnquiryComponent,
    AdminShowEnquiryComponent,
    AdminReplyEnquiryComponent,
    // ADMIN EXAM COMPONENT
    AdminExamComponent,
    AdminAddExamComponent,
    AdminEditExamComponent,
    AdminShowExamComponent,
    // ADMIN NEWS COMPONENT
    AdminNewsComponent,
    AdminAddNewsComponent,
    AdminEditNewsComponent,
    AdminShowNewsComponent,
    // ADMIN GALLERY COMPONENT
    AdminGallaryComponent,
    AdminAddPhotosComponent,
    AdminShowPhotosComponent,
    AdminAddVideosComponent, 
    AdminShowVideosComponent,
    // ADMIN ATTENDANCE COMPONENT
    AdminAttendanceComponent,
    // ADMIN FACULTY COMPONENT
    AdminFacultyComponent,
    AdminAddFacultyComponent,
    AdminShowFacultyComponent,
    AdminEditFacultyComponent,
    // ADMIN STUDENT COMPONENT
    AdminStudentComponent,
    AdminAddStudentComponent,
    AdminShowStudentComponent,
    AdminEditStudentComponent,
    AdminStudentReceiptsComponent,
    AdminStudentGenerateReceiptComponent,
    AdminStudentIdentityComponent,
    AdminStudentCertificateComponent,
    AdminStudentAddProgressComponent,
    AdminStudentShowProgressComponent,
    // ERROR COMPONENT
    PageNotFoundComponent,
    ServerErrorComponent,
    // FACULTY COMPONENT
    FacultyComponent,
    // STUDENT COMPONENT
    StudentComponent,
    StudentDashboardComponent,
    StudentReceiptsComponent,
    StudentAttendanceComponent,
    StudentShowReceiptComponent,
    StudentIdentityComponent,
    StudentExamCertificateComponent,
    StudentProgressComponent
  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutes,
    HttpClientModule,
    Angular2ImageGalleryModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk'
    })
  ],

  providers: [
    // HTTP SERVICE
    HttpService,
    // OTHER SERVICES
    AboutService,
    ArticleService,
    AttendanceService,
    BranchService,
    CertificateService,
    DashboardService,
    EnquiryService,
    ExamService,
    FacultyService,
    GalleryService,
    IdentityService,
    NewsService,
    ReceiptService,
    StudentService,
    // AUTH GUARDS
    LoginAuthGuard,
    AdminAuthGuard,
    FacultuAuthGuard,
    StudentAuthGuard,
    ChangePassswordGuard,
    // AUTH SERVICE
    AuthService,
    // FORM VALIDATOR
    FormValidator
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
