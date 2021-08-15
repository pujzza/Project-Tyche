import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Clients } from 'src/app/entities/ClientsModel';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  isclientcreated = false;

client: Clients = new Clients();
  constructor(public service: CommonService) { }

  ngOnInit(): void {
  }
  AddClient(){
    this.client.oauth = this.service.Oauth;
    this.service.CreateClient(this.client).subscribe(res =>{
      if(res.returncode == 200){
        this.isclientcreated = true;
        this.service.OpenSnackBar('Client Created!','SUCCESS');
        this.client = new Clients();
      } else {
        this.isclientcreated = false;
        this.service.OpenSnackBar('Client Not Created!','FAILED');
      }
    },
    (error) => {
      this.service.OpenSnackBar('Something went wrong','SORRY');
    });
    console.log(this.client);
  }
}
