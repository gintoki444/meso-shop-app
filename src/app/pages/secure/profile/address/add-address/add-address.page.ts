import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

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
