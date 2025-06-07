import { Component, ViewEncapsulation, AfterViewInit, ElementRef, ViewChild,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemePalette } from '@angular/material/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatSidenavModule, MatIconModule, MatListModule, MatToolbarModule, MatSlideToggleModule, FormsModule],
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit, AfterViewInit  {
  title = 'my-site';
  opened!: boolean; 
  showMonster = false;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  isMobile:boolean = false;
  currentYear = new Date().getFullYear();
  secretCount = 0;
  showSecret: boolean = false;

  @ViewChild('musicPlayer') musicPlayer!: ElementRef;


  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, public breakpointObserver: BreakpointObserver){
    this.matIconRegistry.addSvgIcon(
      "icon_github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-github.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon_soundcloud",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-soundcloud.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon_linkedin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-linkedin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon_teams",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-teams.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "icon_app_store",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icon-app-store.svg")
    );
  }

    // hoverSound = new Howl({
    //   src: ['./assets/hover.wav']
    // });

    // clickSound = new Howl({
    //   src: ['./assets/click.wav']
    // });
    
    // secretSound = new Howl({
    //   src: ['./assets/trumpet.wav'],
    //   volume: 0.3
    // });

  scrollToSection(id:string){

    const el: HTMLElement|null = document.getElementById(id);

    if (el) {
      setTimeout(() =>
        el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    }
  }

  secretCode(){
    this.secretCount += 1;
    if(this.secretCount == 5){
      this.showSecret = true;
      // this.secretSound.play();
    }
  }

  ngOnInit(): void {
    if (this.breakpointObserver.isMatched('(max-width: 850px)')) {
      this.isMobile = true;
      console.log('MOBILE!!!!!');
    }

  }

  ngAfterViewInit() {
      console.log(this.musicPlayer.nativeElement);     

  }

  changed(){
    console.log('changedddd................');
    this.checked ?  this.musicPlayer.nativeElement.play() : this.musicPlayer.nativeElement.pause();
  }


}