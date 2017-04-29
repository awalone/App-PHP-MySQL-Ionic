import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AddMonumentos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-monumentos',
  templateUrl: 'add-monumentos.html',
})
export class AddMonumentos {

//Definindo formulário e suas propriedades
  public form: FormGroup;
  public monumentoName: any;  
  public monumentoCity: any;
  public monumentoCountry: any;
  public monumentoDescription: any;
  public codeID: any      = null;

  public isEdited: boolean = false;   
  public hideForm: boolean = false;
  public pageTitle: string;

  private baseURI: string  = "http://localhost:8100/data/";

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuiler: FormBuilder, public toastCtrl: ToastController) {
    this.form = formBuiler.group({
      "name": ["", Validators.required],
      "city": ["", Validators.required],
      "country": ["", Validators.required],
      "description": ["", Validators.required]
    });
  }

  ionViewWillEnter(){
    
  }

  selectEntry(item){
    this.monumentoName = item.name;
    this.monumentoCity = item.city; 
    this.monumentoCountry = item.country ;
    this.monumentoDescription = item.description ;
    this.codeID = item.id;
  }
  
  createEntry(name, city, country, description){

    let body: string = "key=create&name=" + name + "&city="+ city +"&country="+country+"&description=" + description,
        type: string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url: any = this.baseURI + "manage-data.php";

    this.http.post(url, body, options)
      .subscribe((data) =>
      {
        if(data.status === 200){

            this.hideForm   = true;
            this.sendNotification(`O ponto turistico ${name} foi adicionado`);

        }
        else{

          this.sendNotification('Não foi possível adicionar!');

        }
      });
  }

   updateEntry(name, city, country, description) {
      let body       : string = "key=update&name=" + name + "&city="+ city +"&country="+country+"&description=" + description + "&codeID=" + this.codeID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>{

        if(data.status === 200)
        {
          this.hideForm  =  true;
          this.sendNotification(`As informações ponto turistico ${name} foram atualizadas`);
        } 
        else {
          this.sendNotification('Não foi possível atualizar!');
        }
      });
   }

  deleteEntry(){
      
    let name: string = this.form.controls["name"].value,
        body: string    = "key=delete&codeID=" + this.codeID,
        type: string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any    = new Headers({ 'Content-Type': type}),
        options: any    = new RequestOptions({ headers: headers }),
        url: any    = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
        if(data.status === 200)
        {
          this.hideForm     = true;
          this.sendNotification(`As informações ponto turistico ${name} foram excluidas`);
        } 
        else {
          this.sendNotification('Não foi possível excluir!');
        }
      });
   }

   saveEntry()
   {
      let name: string = this.form.controls["name"].value,
          city: string = this.form.controls["city"].value,
          country: string = this.form.controls["country"].value,
          description: string= this.form.controls["description"].value;

      if(this.isEdited)
      {
         this.updateEntry(name, city, country, description);
      }
      else
      {
         this.createEntry(name, city, country, description);
      }
   }

   resetFields() : void
   {
      this.monumentoName = "";
      this.monumentoCity = "";
      this.monumentoCountry = "";
      this.monumentoDescription = "";
   }





  sendNotification(message): void{

      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });

      notification.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMonumentos');
  }

}
