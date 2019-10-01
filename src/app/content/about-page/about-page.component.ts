import { Component, OnInit } from '@angular/core';
import { AboutModel } from '../../models/about.model';
import { HttpService } from '../../services/httpPost.service';
import { Faculty } from '../../models/faculty.model';

declare var $: any;

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
}) 
export class AboutPageComponent implements OnInit {

  faculties: Faculty[] = [];
  
  aboutUs: AboutModel;

  loading: boolean = true;

  constructor(private httpPostService: HttpService) { }

  ngOnInit() {
    const aboutData = { api: "getAbout", data: {}}
    this.httpPostService.httpPost(aboutData).subscribe((val) => {
      this.aboutUs = val[0];
      const facultyData = { api: "getActivateFaculties", data: {}}
      this.httpPostService.httpPost(facultyData).subscribe((val: any) => {
        this.faculties = val;
        console.log(this.faculties);
        this.loading = false;
      },
      (error) => {
      });
    },
    (error) => {
    });

    document.body.classList.add('bg-about');
  }
  ngOnDestroy(){
    document.body.classList.remove('bg-about');
  }

  limitFacultyDescription(desc: string) {
    const descLen = desc.length;
    if(descLen > 120) {
      return desc.substr(0,118) + "..";
    }
    return desc;
  }
}
