import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// https://medium.com/@jeroenouw/upgrade-to-angular-7-beta-within-10-minutes-c14fc380edd

import { AvatarModule } from '@acpaas-ui/ngx-components/avatar';

// https://stackoverflow.com/questions/48280400/cant-resolve-rxjs
// https://github.com/tiaguinho/material-community-components/issues/42 --> npm i rxjs-compat
import { FlyoutButtonModule } from '@acpaas-ui/ngx-components/flyout';
import { FlyoutModule } from '@acpaas-ui/ngx-components/flyout';

import { CodeSnippetModule } from '@acpaas-ui/ngx-components/code-snippet';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RangeSliderModule } from '@acpaas-ui/ngx-components/forms';

// https://stackoverflow.com/questions/49918503/angular-6-warning-for-using-formcontrolname-and-ngmodel
import { DatepickerModule } from '@acpaas-ui/ngx-components/forms';

import { SearchFilterModule } from '@acpaas-ui/ngx-components/forms';
import { TimepickerModule } from '@acpaas-ui/ngx-components/forms';
import { MaskModule } from '@acpaas-ui/ngx-components/forms';
import { UploadModule } from '@acpaas-ui/ngx-components/forms';
import { WysiwygModule } from '@acpaas-ui/ngx-components/forms'; // denk aan ckeditor!

// (fout in https://digipolisantwerp.github.io/acpaas-ui_angular/modules/calendar)
import { CalendarModule } from '@acpaas-ui/ngx-components/calendar';

import { AutoCompleteModule } from '@acpaas-ui/ngx-components/forms';

import { CookieconsentModule } from '@acpaas-ui/ngx-components/layout';

import { FooterModule } from '@acpaas-ui/ngx-components/layout';

import { HeaderModule } from '@acpaas-ui/ngx-components/layout';

import { LogoModule } from '@acpaas-ui/ngx-components/logo';

import { HeroModule } from '@acpaas-ui/ngx-components/layout';

import { PaneModule } from '@acpaas-ui/ngx-components/layout';

import { LocalstorageModule } from '@acpaas-ui/ngx-components/localstorage';

import { LeafletModule } from '@acpaas-ui/ngx-components/map';

import { PaginationModule } from '@acpaas-ui/ngx-components/pagination';

import { ProgressBarModule } from '@acpaas-ui/ngx-components/progress-bar';

import { SelectableListModule } from '@acpaas-ui/ngx-components/selectable-list';

import { TableModule } from '@acpaas-ui/ngx-components/table';

import { FilterModule, LabelsModule, WindowModule, WINDOW_PROVIDERS } from '@acpaas-ui/ngx-components/utils';

import { ModalModule } from '@acpaas-ui/ngx-components/layout';

import { AUIDemoModalComponent } from './demo-modal.component';

import { TableActionComponent } from '../app/components/table-action.component';

import { AnalyticsModule } from '@acpaas-ui/ngx-components/analytics';

import { ContextModule } from '@acpaas-ui/ngx-components/context';


@NgModule({
  declarations: [
    AppComponent,
    AUIDemoModalComponent,
    TableActionComponent,
  ],
  imports: [
    AnalyticsModule,
    WindowModule,
    ReactiveFormsModule,
    ModalModule,
    BrowserModule,
    AppRoutingModule,
    AvatarModule,
    AutoCompleteModule,
    HeroModule,
    PaneModule,
    LeafletModule,
    PaginationModule,
    ProgressBarModule,
    SelectableListModule,
    TableModule,
    FilterModule,
    LabelsModule,
    LocalstorageModule.forRoot({
      storageType: 'sessionStorage',
      identifier: 'my-app-v1',
    }),
    CalendarModule.forChild([
      'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'
    ], [
        'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
      ]),
    CodeSnippetModule,
    ContextModule.forRoot({
      useTitleSuffix: false,
      extendTitle: false,
      titleDelimiter: ' | ',
      defaults: {
        titleSuffix: '',
      },
      routerContext: true, // indien true krijg je error!!
    }),
    FlyoutModule,
    FlyoutButtonModule,
    RangeSliderModule,
    FormsModule,
    FooterModule,
    HeaderModule,
    DatepickerModule.forChild([
      'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag',
    ], [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
    ], {
      ERRORS_INVALID_DATE: 'Ongeldige datum.',
      ERRORS_INVALID_RANGE: 'Deze datum kan niet gekozen worden.',
    }),
    SearchFilterModule,
    TimepickerModule,
    MaskModule,
    UploadModule,
    WysiwygModule,
    LogoModule,
    CookieconsentModule.forRoot({
      autoInit: false,
      content: {
        message: 'I am the cookie consent demo. Will you allow my cookies?',
        dismiss: 'Allow cookies',
        link: 'Learn more',
        href: 'http://cookiepedia.co.uk/all-about-cookies'
      },
      cookie: {
        name: 'cookieconsent_demo',
        path: '/',
        domain: '',
        expiryDays: 1
      },
      elements: {
        messagelink: `<p id="cookieconsent:desc">{{message}}
					<a aria-label="learn more about cookies" tabindex="0" href="{{href}}" target="_blank">{{link}}</a>
				</p>`,
        dismiss: '<button aria-label="test" tabindex="0" class="a-button a-button--secondary cc-btn cc-dismiss">{{dismiss}}</button>'
      }
    }),
  ],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent],
  entryComponents: [
    AUIDemoModalComponent,
    TableActionComponent,
  ],
})
export class AppModule {

}
