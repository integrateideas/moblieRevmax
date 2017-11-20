import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AppConfigurationProvider } from '../providers/configuration/app-configuration';
import { CustomHttpProvider } from '../providers/configuration/custom-http';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RevmaxProvider } from '../providers/revmax';
import { WooApiModule } from 'ng2woo';
import { IonicStorageModule } from '@ionic/storage';

// import { VideoPlayer } from '@ionic-native/video-player';
const WooCommerceConfig = {
  url:   'https://revmax.twinspark.co', 
  consumerKey:    'ck_5ecf43a297b5341dfb68c4ba5f7e83db56125b19',
  consumerSecret:  'cs_6387cb6a55c87e8cd6223fbca39a92324dbfd013',
  wpAPI: true,
  version: 'wc/v1',
  queryStringAuth : true
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    WooApiModule.forRoot(WooCommerceConfig),
    IonicStorageModule.forRoot()
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppConfigurationProvider,
    CustomHttpProvider,
    RevmaxProvider,
    WooApiModule,
    // VideoPlayer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
