import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonsModule } from './common/commons.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectComponent } from './components/project/project.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeedComponent } from './components/feed/feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    SkillsComponent,
    ProjectComponent,
    FooterComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonsModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
