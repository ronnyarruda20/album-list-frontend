import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
    selector: 'ngx-logout',
    templateUrl: './logout.component.html',
})
export class NgxLogoutComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) {

    }
    ngOnInit() {

    }

    logout(){
        this.authenticationService.logout();
    }
}