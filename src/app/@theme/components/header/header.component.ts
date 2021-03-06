import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { AuthenticationService } from 'app/security/service/authentication.service';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { LayoutService } from '../../../@core/utils';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'dark';

  userMenu = [{ title: 'Log out' }];

  constructor(
    private menuService: NbMenuService,
    private layoutService: LayoutService,
    private nbMenuService: NbMenuService,
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private breakpointService: NbMediaBreakpointsService,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.user = this.authenticationService.currentUserValue;

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.nbMenuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'context-menu'), map(({ item: { title } }) => title))
      .subscribe(title => {
        this.selectMenu(title);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  selectMenu(selected) {
    if (selected === 'Log out') {
      this.logout();
    }
  }

  logout() {
    this.authenticationService.logout();
  }

}
