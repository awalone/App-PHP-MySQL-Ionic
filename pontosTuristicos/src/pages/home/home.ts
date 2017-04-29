
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: any = [];
  constructor(public navCtrl: NavController, public http: Http) {

  }
  
  ionViewWillEnter(){
    this.load();
  }

  load(){
    this.http.get('http://localhost:8100/data/retrieve-data.php')
      .map(res => res.json())
      .subscribe(data => {
          this.items = data;
      })
  }

  addEntry(){
    this.navCtrl.push('AddMonumentos');
  }

  viewEntry(param){
    this.navCtrl.push('AddMonumentos', param);
  }

}
