import { AfterContentChecked, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
// import { SwiperComponent } from 'swiper/angular';
// import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
// SwiperCore.use([Pagination]);

import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WelcomePage implements AfterContentChecked {
  // Checkbox
  checkedItems:Boolean = false;
  errorCheck: Boolean = false;


  language: string = '';
  last_slide: boolean = false;

  // @ViewChild('swiper') swiper: SwiperComponent;

  // // Swiper config
  // config: SwiperOptions = {
  //   slidesPerView: 1,
  //   spaceBetween: 50,
  //   pagination: { clickable: false },
  //   allowTouchMove: false // set true to allow swiping
  // }

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef
  ) {

   }

  ngAfterContentChecked(): void {

    // if (this.swiper) {
    //   this.swiper.updateSwiper({});
    // }
  }


  // Checkbox Validate policy
  isChecked(){
    if(this.checkedItems === false){
      this.checkedItems = true;
      this.errorCheck = false;
    }else{
      this.checkedItems = false;
    }
  }

  // Trigger swiper slide change
  // swiperSlideChanged(e) {
  //   // console.log(e);
  // }

  // Go to next slide
  // nextSlide() {
  //   if(this.checkedItems === true ){
  //     this.swiper.swiperRef.slideNext(500);
  //     // this.router.navigateByUrl('/signin');
  //   }else{
  //     this.errorCheck = true;
  //   }
  // }

  // // Last slide trigger
  // onLastSlide() {
  //   this.last_slide = true;
  // }

  // // Go to main content
  async getStarted() {

    // Navigate to /home
    if(this.checkedItems === true ){
      this.router.navigateByUrl('/signin');
    }else{
      this.errorCheck = true;
    }
  }

}
