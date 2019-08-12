import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { XApiService } from './service/x-api.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule,
         MatButtonModule,
         MatCardModule,
         MatProgressSpinnerModule,
         MatInputModule,
         MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    XApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
