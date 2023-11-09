import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  iconLocation = '../../../../assets/icon/i-location-2.svg';
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
