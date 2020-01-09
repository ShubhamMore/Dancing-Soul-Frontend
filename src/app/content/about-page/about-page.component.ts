import { Component, OnInit, OnDestroy } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { AboutService } from '../../services/about.service';
import { FacultyService } from '../../services/faculty.service';
import { FacultyModel } from '../../models/faculty.model';

declare var $: any;

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy {
  faculties: FacultyModel[];

  aboutUs: AboutModel;

  loading: boolean;

  constructor(private aboutService: AboutService, private facultyService: FacultyService) {}

  ngOnInit() {
    this.loading = true;
    this.faculties = [];
    this.aboutService.getAbout().subscribe(
      (responce: AboutModel) => {
        this.aboutUs = responce;
        this.facultyService.getActivateFaculties().subscribe(
          (res: FacultyModel[]) => {
            this.faculties = res;
            this.loading = false;
          },
          (error: any) => {}
        );
      },
      (error: any) => {}
    );

    document.body.classList.add('bg-about');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg-about');
  }

  limitFacultyDescription(desc: string) {
    const descLen = desc.length;
    if (descLen > 120) {
      return desc.substr(0, 118) + '..';
    }
    return desc;
  }
}
