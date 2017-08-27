import {Component, OnInit} from '@angular/core';
import {Title} from './title';
import {Router} from '@angular/router';
import {API} from '../api_config/api_config';
import 'jquery';

import 'datatables.net';

@Component({

  selector: 'admin',  // <home></home>

  providers: [
    Title
  ],

  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  public data: any;

  public homedata: any;
  public mahalcode: any;
  public mahalname: any;
  public pincode: any;
  public email: any;
  public phone: any;
  public alternatenumber: any;
  public password: any;
  public cpassword: any;
  public address: any;
  public accesstoken: any;
  public arraylist: any;
  public tableWidget: any;
  public selectedName: any;
  public mahalstatus: any;
  public options: any;
  public newpassword: any;
  public cnewpassword: any;
  public currentpassword: any;

  constructor(public title: Title, private router: Router) {
  }

  public ngOnInit() {
    this.homedata = 'Home';
    if (localStorage.getItem('User') === 'admin') {
      this.router.navigate(['/admin']);
    } else if (localStorage.getItem('User') === 'commite') {
      this.router.navigate(['/commite']);
    } else {
      this.router.navigate(['/login']);
    }
    this.loaddata();
  }

  public ngAfterViewInit() {
    this.initDatatable();

    this.options = [{
      name: 'Active'
    },
      {
        name: 'Inactive'
      }];

    this.loaddata();
  }

  public initDatatable(): void {

    let exampleId: any = $('#example');
    this.tableWidget = exampleId.DataTable({
      destroy: true,
      select: true
    });

  }

  public reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    setTimeout(() => this.initDatatable(), 0);
  }

  public Logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

// home

public home() {
    this.homedata = 'Home';
    this.router.navigate(['/admin']);
    this.onNone();
    let maintable = document.getElementById('maintable');
    maintable.style.display = 'block';
    this.loaddata();
  }

 public reinitvalues() {
    this.mahalcode = null;
    this.mahalname = null;
    this.address = null;
    this.email = null;
    this.pincode = null;
    this.alternatenumber = null;
    this.phone = null;
    this.password = null;
    this.cpassword = null;
  }

  public onNone() {
    let maintable = document.getElementById('maintable');
    maintable.style.display = 'none';
    let addmahal = document.getElementById('addcustomer');
    addmahal.style.display = 'none';
    let changepassword = document.getElementById('changepassword');
    changepassword.style.display = 'none';
    let displass = document.getElementById('editcustomer');
    displass.style.display = 'none';
    this.reinitvalues();
  }

  public addmember() {
    this.homedata = 'Home / Add Mahal';
    this.onNone();
    let addmahal = document.getElementById('addcustomer');
    addmahal.style.display = 'block';
  }

  public changepwd() {
    this.homedata = 'Home / Change password';
    this.onNone();
    let changepassword = document.getElementById('changepassword');
    changepassword.style.display = 'block';
  }

  public submitForm() {
    if (!(this.mahalcode == null) &&
      !(this.mahalname == null) &&
      !(this.password == null) &&
      !(this.email == null) &&
      !(this.alternatenumber == null) &&
      !(this.address == null) &&
      !(this.phone == null)) {
      if (this.password === this.cpassword) {

        // get access token
        let url = API.API_ADDMAHAL;
        this.accesstoken = localStorage.getItem('access_token');
        let body2 = 'mahalname=' + this.mahalname + '&mahalstatus=' + this.mahalstatus + '&password=' + this.password + '&email=' + this.email + '&mahalcode=' + this.mahalcode + '&pincode=' + this.pincode + '&alternatenumber=' + this.alternatenumber + '&address=' + this.address + '&phone=' + this.phone;
        this.title.addData(url, this.accesstoken, body2).subscribe((data) => {
            this.home();
            this.router.navigate(['/admin']);
          },
          (error) => {
            if (error === 'Unauthorized') {
              console.log(error);

            }
            console.log(error);
          });

         }
       }
      }

// load mahal data
  public loaddata() {
    let url = API.API_GETMAHAL;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.arraylist = Array();
      this.arraylist = data;
      this.reInitDatatable();
    }, (error) => {
      console.log(error);
    });
  }

// edit button press
  public edit(id) {
    localStorage.setItem('tempid', id);
    this.onNone();
    this.homedata = 'Home / Edit Mahal';
    let displass = document.getElementById('editcustomer');
    displass.style.display = 'block';
    this.loadsingledata(id);
  }

// load single datta on edit button press
  public loadsingledata(id) {

    let url = API.API_GETMAHAL + id;
    this.accesstoken = localStorage.getItem('access_token');

    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.mahalcode = data.mahalcode;
      this.mahalname = data.mahalname;
      this.email = data.email;
      this.alternatenumber = data.alternatenumber;
      this.address = data.address;
      this.phone = data.phone;
      this.pincode = data.picode;
    }, (error) => {
            console.log(error);
    });
  }

// selector value chAnges
  public onChange(newValue) {
    console.log(newValue + this.mahalstatus);
    this.mahalstatus = newValue;

  }

  //  update the mahal form
  public updateForm(){
    if (!(this.mahalcode == null) &&
      !(this.mahalname == null) &&
      !(this.password == null) &&
      !(this.email == null) &&
      !(this.alternatenumber == null) &&
      !(this.address == null) &&
      !(this.phone == null)) {
      if (this.password === this.cpassword) {

        // get access token
        let id = localStorage.getItem('tempid');
        let url = API.API_UPDATEMAHAL + id;
        this.accesstoken = localStorage.getItem('access_token');
        let body2 = 'mahalname=' + this.mahalname + '&mahalstatus=' + this.mahalstatus + '&password=' + this.password + '&email=' + this.email + '&mahalcode=' + this.mahalcode + '&pincode=' + this.pincode + '&alternatenumber=' + this.alternatenumber + '&address=' + this.address + '&phone=' + this.phone;
        this.title.updateData(url, this.accesstoken, body2).subscribe((data) => {
          this.home();
          this.router.navigate(['/admin']);
        }, (error) => {
          console.log(error + 'suggested');
        });
      }
    }
    }

// remove mahal data based on id
  public remove(id) {
  let url = API.API_REMOVEMAHAL + id;
  this.accesstoken = localStorage.getItem('access_token');
  this.title.deleteData(url, this.accesstoken).subscribe((data) => {
    console.log(JSON.stringify(data));

    this.loaddata();
  }, (error) => {
    console.log(error);
  });
  }

// change the password
  public passwordForm() {

    let names = localStorage.getItem('User');
    if (this.cnewpassword === this.newpassword) {

      let url = API.API_UPDATEPASSWORD;
      let body2 = 'name=' + names + '&password=' + this.newpassword + '&oldpassword=' + this.currentpassword;
      this.accesstoken = localStorage.getItem('access_token');
      this.title.updateData(url, this.accesstoken, body2).subscribe((data) => {
        console.log(data);
        this.home();
        this.router.navigate(['/admin']);
      }, (error) => {
        console.log(error);
      });
    } else {
        console.log('password mismatch');
    }
  }

}
