import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {
  
  dataResolve:any

  constructor(
    private route : ActivatedRoute,
  ) { }

  ngOnInit() {
    
    const data = this.route.snapshot.data.myarray;
    if(data){
      this.dataResolve = data;
    }else {
      this.dataResolve = "";
      console.log("dataResolve: ",this.dataResolve)
    }
  }
}
