import {Component, OnInit} from '@angular/core';
import {Title} from './title';
import {Router} from '@angular/router';
import {API} from '../api_config/api_config';
import {IMyDpOptions} from 'mydatepicker';
import 'jquery';
import 'datatables.net';
import {until} from 'selenium-webdriver';
import elementIsSelected = until.elementIsSelected;

@Component({
  selector: 'dashboard',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public lastpaidmiscellanous2: any;
  public lastpaidcharity2: any;
  public lastpaidrathib2: any;
  public lastpaidmolud2: any;
  public lastpaideid2: any;
  public landline: any;
  public reg: any;
  public pendingitems: any;
  public countapp: number;
  public revenue: any;
  public countbalance: any;
  public count: any;
  public lastpaidbakrid: { date: { year: any; month: any; day: any; }; };
  public lastpaidmolud: { date: { year: any; month: any; day: any; }; };
  public lastpaidrathib: { date: { year: any; month: any; day: any; }; };
  public lastpaidcharity: { date: { year: any; month: any; day: any; }; };
  public lastpaidmiscellanous: { date: { year: any; month: any; day: any; }; };
  public lastpaideid: { date: { year: any; month: any; day: any; }; };
  public membercode: any;
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
  public total: any;
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
  public tableWidget3: any;
  public selectedItem: any;
  public lastpaid: any;
  public month: any;
  public todays: any;
  public time: any;
  public months: any;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };
  private id: any;
  private lastpaid2: any;
  private lastpaidbakrid2:any;

  constructor(public title: Title, public router: Router) {
    setInterval(() => this.times(), 500);
    setInterval(() => this.onDateChanged('change'), 500);
  }

  public times() {
    this.time = new Date().toLocaleTimeString();
    this.total = this.amount;

  }

  public onDateChanged(change) {
    try{
    let dt1 = new Date(this.lastpaid.date.year, this.lastpaid.date.month, this.lastpaid.date.day);
    let dt2 = new Date(this.month.date.year, this.month.date.month, this.month.date.day);
    this.months = (dt2.getFullYear() - dt1.getFullYear()) * 12;
    this.months -= dt1.getMonth() + 1;
    this.months += dt2.getMonth() + 1;
    this.total = parseInt(this.varasangyaamount) * parseInt(this.months);
  }catch (e){

    }
  }

  public paymenttypes() {
    try {
      if (this.paymenttype === 'Eid Ul Fithr')
        this.lastpaid = this.lastpaideid.date.day + '-' + this.lastpaideid.date.month + '-' + this.lastpaideid.date.year;
      else if (this.paymenttype === 'Bakrid')
        this.lastpaid = this.lastpaidbakrid.date.day + '-' + this.lastpaidbakrid.date.month + '-' + this.lastpaidbakrid.date.year;
      else if (this.paymenttype === 'charity')
        this.lastpaid = this.lastpaidcharity.date.day + '-' + this.lastpaidcharity.date.month + '-' + this.lastpaidcharity.date.year;
      else if (this.paymenttype === 'rathib')
        this.lastpaid = this.lastpaidrathib.date.day + '-' + this.lastpaidrathib.date.month + '-' + this.lastpaidrathib.date.year;
      else if (this.paymenttype === 'molud')
        this.lastpaid = this.lastpaidmolud.date.day + '-' + this.lastpaidmolud.date.month + '-' + this.lastpaidmolud.date.year;
      else if (this.paymenttype === 'miscellanous')
        this.lastpaid = this.lastpaidmiscellanous.date.day + '-' + this.lastpaidmiscellanous.date.month + '-' + this.lastpaidmiscellanous.date.year;
      else
        this.lastpaid = this.month.date.day + '-' + this.month.date.month + '-' + this.month.date.year;
    }catch (e){
      this.lastpaid = this.month.date.day + '-' + this.month.date.month + '-' + this.month.date.year;
    }
  }

  public datess() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    this.lastpaid = {date: {year: yyyy, month: mm, day: dd}};
    this.month = {date: {year: yyyy, month: mm, day: dd}};
    this.todays = mm + '-' + dd + '-' + yyyy;
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

    let exampleId3: any = $('#pendingtable');
    this.tableWidget3 = exampleId3.DataTable({
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
      this.selectedItem = 'dashboard';
      this.router.navigate(['/dashboard']);
      this.datess();
      this.loadmemberdata();
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

  public date() {
    let today = new Date();
    this.dd = today.getDate();
    this.mm = today.getMonth() + 1;
    this.yyyy = today.getFullYear();
    this.model = {date: {year: this.yyyy, month: this.mm, day: this.dd}};
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

  public printme(id){
   this.onNone();
    this.loadsingledata(id);
   let printdetail = document.getElementById('printdetail');
   printdetail.style.display = 'block';

  }

  public print(){
    let w = window.open();
    w.document.write(document.getElementById('printdetail').innerHTML);
    w.print();
    w.close();
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
      this.reg = data.regno;
      this.appstatus = data.appstatus;
      this.memberstatus = data.memberstatus;
      this.mobile = data.mobile;
      this.landline = data.landlinenumber;
      this.email = data.email;
      this.housename = data.housename;
      this.fathername = data.fathername;
      this.lastmosquename = data.lastmosquename;
      this.currentmosquename = data.currentmosquename;
      this.address = data.address;
      this.houseno = data.houseno;
      this.varasangyaamount = data.varasangya;
      console.log(data.lastpaid + 'here we are');
      try {
        this.lastpaid2 = data.lastpaid;
        this.lastpaidcharity2 = data.lastpaidcharity;
        this.lastpaideid2 = data.lastpaideid;
        this.lastpaidbakrid2 = data.lastpaidbakrid;
        this.lastpaidmolud2 = data.lastpaidmolud;
        this.lastpaidrathib2 = data.lastpaidrathib;
        this.lastpaidmiscellanous2 = data.lastpaidmiscellanous;
      }catch (e){
        console.log(e);
      }
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
      this.id = data._id;
      this.name = data.name;
      this.reg = data.regno;
      this.appstatus = data.appstatus;
      this.memberstatus = data.memberstatus;
      this.mobile = data.mobile;
      this.landline = data.landlinenumber;
      this.email = data.email;
      this.housename = data.housename;
      this.fathername = data.fathername;
      this.lastmosquename = data.lastmosquename;
      this.currentmosquename = data.currentmosquename;
      this.address = data.address;
      this.houseno = data.houseno;
      this.varasangyaamount = data.varasangya;
      console.log(data.lastpaid + 'here we are');
      try {
        this.lastpaid2 = data.lastpaid;
        this.lastpaidcharity2 = data.lastpaidcharity;
        this.lastpaideid2 = data.lastpaideid;
        this.lastpaidbakrid2 = data.lastpaidbakrid;
        this.lastpaidmolud2 = data.lastpaidmolud;
        this.lastpaidrathib2 = data.lastpaidrathib;
        this.lastpaidmiscellanous2 = data.lastpaidmiscellanous;
      }catch (e){
        console.log(e);
      }
      try {
        this.lastpaid = {
          date: {
            year: data.lastpaid.split('-')[2],
            month: data.lastpaid.split('-')[1],
            day: data.lastpaid.split('-')[0]
          }
        };
        this.lastpaideid = {
          date: {
            year: data.lastpaideid.split('-')[2],
            month: data.lastpaideid.split('-')[1],
            day: data.lastpaideid.split('-')[0]
          }
        };
        this.lastpaidbakrid = {
          date: {
            year: data.lastpaidbakrid.split('-')[2],
            month: data.lastpaidbakrid.split('-')[1],
            day: data.lastpaidbakrid.split('-')[0]
          }
        };
        this.lastpaidmolud = {
          date: {
            year: data.lastpaidmolud.split('-')[2],
            month: data.lastpaidmolud.split('-')[1],
            day: data.lastpaidmolud.split('-')[0]
          }
        };
        this.lastpaidrathib = {
          date: {
            year: data.lastpaidrathib.split('-')[2],
            month: data.lastpaidrathib.split('-')[1],
            day: data.lastpaidrathib.split('-')[0]
          }
        };
        this.lastpaidcharity = {
          date: {
            year: data.lastpaidcharity.split('-')[2],
            month: data.lastpaidcharity.split('-')[1],
            day: data.lastpaidcharity.split('-')[0]
          }
        };
        this.lastpaidmiscellanous = {
          date: {
            year: data.lastpaidmiscellanous.split('-')[2],
            month: data.lastpaidmiscellanous.split('-')[1],
            day: data.lastpaidmiscellanous.split('-')[0]
          }
        };
      } catch (e) {
        console.log(e);
        this.datess();
      }
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
    let printdetail = document.getElementById('printdetail');
    printdetail.style.display = 'none';
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
    this.date();
    console.log('loading data');
    let url = API.API_GETMEMBERS;
    this.accesstoken = localStorage.getItem('access_token');
    this.title.getData(url, this.accesstoken).subscribe((data) => {
      console.log(JSON.stringify(data));
      this.arraylist = Array();
      this.memberitems = Array<String>();
      this.countbalance = 0;
      this.revenue = 0;
      this.countapp = 0;
      this.pendingitems = Array();
      for (let i = 0; i < data.length; i++) {
        this.memberitems.push(data[i].regno);
        try {
          if (data[i].lastpaid.split('-')[1] < this.model.date.month){
            this.countbalance++;
            this.pendingitems.push(data[i]);
          }
        }catch (e){
console.log(e);
        }
        try{
        if (data[i].lastpaid.split('-')[1] === this.model.date.month) {
          this.revenue += data[i].varasangyaamount;
        }
        }catch (e){
          console.log(e);
        }
        try{
          if (data[i].lastlogin.split('-')[1] === this.model.date.month) {
            this.countapp++;
          }
        }catch (e){
          console.log(e);
        }

      }
      this.count = data.length;
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
    this.datess();
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
    let url = API.API_ADDVARASANGYA;
    this.accesstoken = localStorage.getItem('access_token');
    let date = this.lastpaid.date.day + '-' + this.lastpaid.date.month + '-' + this.lastpaid.date.year;
    let date2 = this.month.date.day + '-' + this.month.date.month + '-' + this.month.date.year;
    let body2 = 'membercode=' + this.membercode + '&name=' + this.name + '&lastpaid=' + date + '&newestpaid=' + date2 + '&numberofmonth=' + this.months + '&grandtotal=' + this.total + '&address=' + this.address + '&varasangyaamount=' + this.varasangyaamount;
    this.title.addData(url, this.accesstoken, body2).subscribe((data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      });
    this.date();
    let url2 = API.API_UPDATEMEMBERSSTATUSVARASANGYA + this.id;
    let body = 'lastpaid=' + date2 + '&updated_at=' + this.model;
    this.title.updateData(url2, this.accesstoken, body).subscribe((data) => {
        this.paymentlist();
        console.log(data);
      },
      (error) => {
        console.log(error);

      });

  }

  public otherpay() {

    let url = API.API_ADDOTHERSANGYA;
    this.accesstoken = localStorage.getItem('access_token');
    // console.log(this.lastpaid)
    // let date = this.lastpaid.date.day + '-' + this.lastpaid.date.month + '-' + this.lastpaid.date.year;
    let date2 = this.month.date.day + '-' + this.month.date.month + '-' + this.month.date.year;
    let body2 = 'membercode=' + this.membercode + '&name=' + this.name + '&lastpaid=' + this.lastpaid + '&newestpaid=' + date2 + '&paymentype=' + this.paymenttype + '&grandtotal=' + this.total + '&address=' + this.address + '&amount=' + this.amount;
    this.title.addData(url, this.accesstoken, body2).subscribe((data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      });
    this.date();
    let url2 = API.API_UPDATEMEMBERSSTATUSOTHERSANGYA + this.id;
    let body = 'lastpaid=' + date2 + '&updated_at=' + this.model + '&paymenttype=' + this.paymenttype;
    this.title.updateData(url2, this.accesstoken, body).subscribe((data) => {
        this.paymentlist();
        console.log(data);
      },
      (error) => {
        console.log(error);

      });

  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
    this.paymenttype = value.text;
    this.paymenttypes();
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
    this.membercode = value.text;
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
