import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbListModule, NbCardModule, NbButtonModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {MatGridListModule} from '@angular/material/grid-list';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ProductService } from './product.service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
    ]),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbListModule,
    NbCardModule,
    NbButtonModule,
    MatGridListModule,
    Ng2SmartTableModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
