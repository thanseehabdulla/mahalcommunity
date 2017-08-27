import {Component, OnInit} from '@angular/core';
import {Title} from './title';
import {Router} from '@angular/router';
import {API} from '../api_config/api_config';

import 'jquery';
import 'datatables.net';


@Component({
  selector: 'dashboard',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})



export class DashboardComponent implements OnInit {
  public items: string[] = ['Eid Ul Fithr', 'Bakrid', 'charity', 'rathib', 'molud', 'miscellanous'];
  public memberitems: any;
  public varasangya: string;
  public cpassword: any;
  public housename: string;
  public lastmosquename: string;
  public currentmosquename: string;
  public dd: number;
  public mm: number;
  public yyyy: number;
  public model: { date: { year: any; month: any; day: any; }; };
  public appstatus: any;
  public memberstatus: any;
  public houseno: any;
  public mobile: any;
  public address: any;
  public landlinenumber: any;
  public email: any;
  public password: any;
  public name: any;
  public regno: any;
  public querycode: any;
  public month: any;
  public total: any;
  public lastpaid: any;
  public varasangyaamount: any;
  public paymenttype: any;
  public amount: any;
  public fathername: any;
  public options: [{ name: string }, { name: string }];
  public arraylist: any[];
  public accesstoken: string;
  public loggedname: any;
  public homedata: any;
  public tableWidget2: any;
  public tableWidget: any;
  public selectedItem: any;

  constructor(public title: Title, public router: Router) {

  }
  public reinitvalues(): any {
    // throw new Error("Method not implemented.");

  }

  public initDatatable(): void {

    let exampleId: any = $('#member');
    this.tableWidget = exampleId.DataTable({
      destroy: true,
      select: true
    });

    let exampleId1: any = $('#payment');
    this.tableWidget2 = exampleId1.DataTable({
      destroy: true,
      select: true
    });
  }

  public reInitDatatable(): void {
    if (this.tableWidget) {
      this.tableWidget.destroy();
      this.tableWidget = null;
    }
    if (this.tableWidget2) {
      this.tableWidget2.destroy();
      this.tableWidget2 = null;
    }

    setTimeout(() => this.initDatatable(), 0);
  }

  public ngOnInit() {
    if (localStorage.getItem('User') === 'admin') {

      this.router.navigate(['/admin']);
    } else if (localStorage.getItem('User') === 'commite') {
      this.selectedItem = 'dashboard'
      this.router.navigate(['/dashboard']);
      this.loggedname = localStorage.getItem('code');
      this.onNone();
      let memeberlist = document.getElementById('dashboard');
      memeberlist.style.display = 'block';
      this.options = [{
        name: 'Active'
      }, {
        name: 'Inactive'
      }];

    } else {
      this.router.navigate(['/login']);
    }

  }

  public ngAfterViewInit() {
    this.initDatatable();

  }

  public date() {
    let today = new Date();
    this.dd = today.getDate();
    this.mm = today.getMonth() + 1;
    this.yyyy = today.getFullYear();
    this.model = {date: {year: this.yyyy, month: this.mm, day: this.dd}};
  }

  public onChange(newValue) {
    console.log(newValue + this.memberstatus);
    this.memberstatus = newValue;
  }

// selector value chAnges
  public onChange2(newValue) {
    console.log(newValue + this.appstatus);
    this.appstatus = newValue;
  }

  public pushmembers() {
    this.onNone();
    let addmembers = document.getElementById('addcustomer');
    addmembers.style.display = 'block';
    this.homedata = 'Home / Add Members';
    this.reinitvalues();
  }

  public submitForm() {
    if (!(this.regno == null) &&
      !(this.name == null) &&
      !(this.password == null) &&
      !(this.email == null) &&
      !(this.landlinenumber == null) &&
      !(this.address == null) &&
      !(this.mobile == null)) {
      if (this.password === this.cpassword) {

        // get access token
        let url = API.API_ADDMEMBER;
        let body2 = 'name=' + this.name + '&password=' + this.password + '&email=' + this.email + '&regno=' + this.regno + '&fathername=' + this.fathername + '&landlinenumber=' + this.landlinenumber + '&address=' + this.address + '&mobile=' + this.mobile + '&housename=' + this.housename + '&lastmosquename=' + this.lastmosquename + '&currentmosquename=' + this.currentmosquename + '&created_at=' + this.model + '&updated_at=' + this.model + '&varasangya=' + this.varasangya + '&houseno=' + this.houseno;
        this.accesstoken = localStorage.getItem('access_token');
        this.title.addData(url, this.accesstoken, body2).subscribe((data) => {
            this.addmember();
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            if (error === 'Unauthorized') {
              console.log(error);
            }
            console.log(error);

          });
      } else {
//  console.log(error);
      }
    } else {
//  console.log(error);
    }

  }

  // edit button press
  public edit(id) {
    console.log('reached edit');
    localStorage.setItem('tempid', id);
    this.onNone();
    let displass = document.getElementById('editcustomer');
    displass.style.display = 'block';
    this.homedata = 'Home / Edit Members';
    this.loadsingledata(id);
  }

// load single datta on edit button press
  public loadsingledata(id) {
    console.log('load single member data');
    let url = API.API_GETMEMBERS + id;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));

      this.regno = data.regno;
      this.name = data.name;
      this.email = data.email;
      this.landlinenumber = data.landlinenumber;
      this.address = data.address;
      this.mobile = data.mobile;
      this.varasangya = data.varasangya;
      this.housename = data.housename;
      this.houseno = data.houseno;
      this.fathername = data.fathername;
      this.appstatus = data.appstatus;
      this.memberstatus = data.memberstatus;
      this.lastmosquename = data.lastmosquename;
      this.currentmosquename = data.currentmosquename;

    }, (error) => {
      console.log(error);
    });
  }

  // load single datta on edit button press
  public loadsinglememberdata(value) {
    console.log('load single member data');
    let url = API.API_GETMEMBERSREG + value;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));

      this.name = data.name;
      this.address = data.address;
      this.varasangyaamount = data.varasangya;
      this.lastpaid = data.lastpaid;

    }, (error) => {

      console.log(error);

    });
  }



  public onNone() {
    let memeberlist = document.getElementById('dashboard');
    memeberlist.style.display = 'none';
    let memberlist = document.getElementById('showmemberlist');
    memberlist.style.display = 'none';
    let paymentlist = document.getElementById('showpaymentlist');
    paymentlist.style.display = 'none';
    let addmembers = document.getElementById('addcustomer');
    addmembers.style.display = 'none';
    let displass = document.getElementById('editcustomer');
    displass.style.display = 'none';
    let addpayment = document.getElementById('addpayment');
    addpayment.style.display = 'none';
    let addpaymentother = document.getElementById('addpaymentother');
    addpaymentother.style.display = 'none';
  }

  public delete(id) {
    console.log('deletedata');

    let url = API.API_REMOVEMAHAL + id;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.deleteData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));

      this.loadmemberdata();
    }, (error) => {

      console.log(error);

    });
  }

  // load mahal data
  public loadmemberdata() {
    console.log('loading data');
    let url = API.API_GETMEMBERS;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.arraylist = Array();
      this.memberitems = Array<String>();
      for (let i = 0; i < data.length; i++) {
        this.memberitems.push(data[i].regno);
      }

      this.arraylist = data;
      this.reInitDatatable();
    }, (error) => {
      if (error === 'Unauthorized') {
        alert(error);
        console.log(error);
      }
    });
  }

  public Logout() {
    localStorage.removeItem('User');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  public updateForm() {
    if (!(this.regno == null) &&
      !(this.name == null) &&
      !(this.password == null) &&
      !(this.email == null) &&
      !(this.landlinenumber == null) &&
      !(this.address == null) &&
      !(this.mobile == null)) {
      if (this.password === this.cpassword) {
        let id = localStorage.getItem('tempid');
        // get access token
        let url = API.API_UPDATEMEMBERS + id;
        let body2 = 'name=' + this.name + '&password=' + this.password + '&email=' + this.email + '&regno=' + this.regno + '&fathername=' + this.fathername + '&landlinenumber=' + this.landlinenumber + '&address=' + this.address + '&mobile=' + this.mobile + '&housename=' + this.housename + '&lastmosquename=' + this.lastmosquename + '&currentmosquename=' + this.currentmosquename + '&updated_at=' + this.model + '&varasangya=' + this.varasangya + '&houseno=' + this.houseno;
        this.accesstoken = localStorage.getItem('access_token');
        this.title.updateData(url, this.accesstoken, body2).subscribe((data) => {
            this.addmember();
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.log(error);
          });

      } else {
//  console.log(error);
      }
    } else {
//  console.log(error);
    }

  }

  addmember() {
    this.onNone();
    this.loadmemberdata();
    let memeberlist = document.getElementById('showmemberlist');
    memeberlist.style.display = 'block';

  }

  public block(id) {
    let url = API.API_UPDATEMEMBERSSTATUS + id;
    let body2 = 'unblock=true&block=false&memberstatus=Inactive&updated_at=' + this.model;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.updateData(url, this.accesstoken, body2).subscribe((data) => {
        this.addmember();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);

      });

  }

  public unblock(id) {
    let url = API.API_UPDATEMEMBERSSTATUS + id;
    let body2 = 'block=true&unblock=false&memberstatus=Active&updated_at=' + this.model;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.updateData(url, this.accesstoken, body2).subscribe((data) => {
        this.addmember();
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.log(error);

      });
  }

  public dashboard() {
    this.onNone();
    let memeberlist = document.getElementById('dashboard');
    memeberlist.style.display = 'block';
  }

  public paymentlist() {

    this.onNone();
    this.loadmemberdata();
    let paymentlist = document.getElementById('showpaymentlist');
    paymentlist.style.display = 'block';

  }

  public pushpayment() {
    this.onNone();
    let addpayment = document.getElementById('addpayment');
    addpayment.style.display = 'block';
  }

  public pushpaymentother() {
    this.onNone();
    let addpaymentother = document.getElementById('addpaymentother');
    addpaymentother.style.display = 'block';

  }

  public varasangyapay() {

  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public refreshValue(value: any): void {
    console.log('refresh value is: ', value);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public selectedmember(value: any): void {
    console.log('Selected value is: ', value);
    this.loadsinglememberdata(value.text);
  }

  public refreshValuemember(value: any): void {
    console.log('refresh value is: ', value);
  }

  public listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
  }
}
