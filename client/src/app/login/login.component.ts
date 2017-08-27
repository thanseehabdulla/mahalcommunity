import {Component, OnInit} from '@angular/core';
import {Title} from './title';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'login',  // <home></home>
  providers: [
    Title
  ],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public localState = {value: ''};
  public email: any;
  public password: any;
  public registration: any;
  public AccessToken: any;
  public RefreshToken: any;
  private data: any;

  constructor(public title: Title, private router: Router) {
  }

  public ngOnInit() {
    if (localStorage.getItem('User') === 'admin') {
      this.router.navigate(['/admin']);
    } else if (localStorage.getItem('User') === 'commite') {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // on login button press
  public Login() {

    console.log('reached login');
    // if admin

    if (this.email === 'admin') {
      // pre register admin
      this.title.registerData(this.email, this.password).subscribe((data) => this.data = data);

      this.title.attemptLogin(this.email, this.password).subscribe((data) => {
        this.AccessToken = data.access_token;
        this.RefreshToken = data.refresh_token;
        console.log('access_token' + this.AccessToken + '\n refresh_token' + this.RefreshToken);
        localStorage.setItem('access_token', this.AccessToken);
        localStorage.setItem('refresh_token', this.RefreshToken);
        localStorage.setItem('User', 'admin');
        localStorage.setItem('code', this.email);
        localStorage.setItem('objectid', data.userObjectId);
        this.router.navigate(['/admin']);
      }, (error) => {
        console.log(error);

      });

    } else {

      this.title.attemptLogin(this.email, this.password).subscribe((data) => {
        this.AccessToken = data.access_token;
        this.RefreshToken = data.refresh_token;
        console.log('access_token' + this.AccessToken + '\n refresh_token' + this.RefreshToken);
        // localStorage.setItem('objectId',data.userObjectId)
        localStorage.setItem('access_token', this.AccessToken);
        localStorage.setItem('refresh_token', this.RefreshToken);
        localStorage.setItem('User', 'commite');
        localStorage.setItem('code', this.email);
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log(error + 'customer error');
      });
    }

  }

}
