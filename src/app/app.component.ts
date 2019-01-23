import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DateRange } from '@acpaas-ui/js-date-utils';

import { SearchFilterChoice } from '@acpaas-ui/ngx-components/forms';

import { CookieconsentService } from '@acpaas-ui/ngx-components/layout';

import { LeafletMap, baseMapWorldGray, baseMapAntwerp } from '@acpaas-ui/ngx-components/map';

import { DatePipe } from '@angular/common';
import { TableColumn } from '@acpaas-ui/ngx-components/table';

import { Filter, FilterService } from '@acpaas-ui/ngx-components/utils';

import { Label, interpolate } from '@acpaas-ui/ngx-components/utils';

// Modal
import { AUIDemoModalComponent } from './demo-modal.component';
import { ModalService } from '@acpaas-ui/ngx-components/layout';

import { TableActionComponent } from '../app/components/table-action.component';

import { ContextService } from '@acpaas-ui/ngx-components/context';
// import { Meta, Title } from '@angular/platform-browser';

import { LocalstorageService } from '@acpaas-ui/ngx-components/localstorage';

import { WINDOW } from '@acpaas-ui/ngx-components/utils';

import { GAService } from '@acpaas-ui/ngx-components/analytics'; // google analytics = GA


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    DatePipe,
    ContextService,
    LocalstorageService,
  ],
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder, private cookieconsentService: CookieconsentService,
              private datePipe: DatePipe, public filterService: FilterService,
              private modalService: ModalService,
              @Inject(WINDOW) public window,
              private contextService: ContextService,
              private localstorageService: LocalstorageService,
              // private gaService: GAService
              // private meta: Meta, private titleService: Title
    ) {
    this.cookieconsentService.init({});
    this.user = this.localstorageService.select('user');
    this.timesUsed = 0;
    this.localstorageService.setItem('number', this.timesUsed);
  }

  public dateRange: DateRange = [5, 6];
  public dateForm: FormGroup;

  public user: any;
  public item: any;
  public timesUsed: any;

  public loading = false;

  public searchFilter = new Filter();
  public checkFilter = new Filter();
  public selectFilter = new Filter();
  public searchResults = [];
  public checkResults = [];
  public selectResults = [];
  public heroList2 = [
    { id: 'id1', name: 'Batman' },
    { id: 'id2', name: 'Wonder Woman' },
    { id: 'id3', name: 'Wolverine' },
    { id: 'id4', name: 'Iron Man' },
    { id: 'id5', name: 'Deadpool' },
  ];

  public columns: TableColumn[] = [
    {
      label: '#',
      value: 'id',
    },
    {
      label: 'First Name',
      value: 'firstName',
    },
    {
      label: 'Last Name',
      value: 'lastName',
    },
    {
      label: 'Registered',
      value: 'registeredAt',
      format: (value) => this.datePipe.transform(value, 'dd/MM/yyyy'),
    },
    {
      label: 'Actions',
      component: TableActionComponent,
    },
  ];

  public rows = [
    {
      'id': 0,
      'firstName': 'Wyatt',
      'lastName': 'Cooper',
      'registeredAt': 'Sat Feb 07 1981 01:04:46 GMT+0000 (UTC)',
    },
    {
      'id': 1,
      'firstName': 'Mullen',
      'lastName': 'Ballard',
      'registeredAt': 'Fri Aug 31 2001 06:47:22 GMT+0000 (UTC)',
    },
    {
      'id': 2,
      'firstName': 'Sonia',
      'lastName': 'Bass',
      'registeredAt': 'Sat Jul 12 1975 16:00:43 GMT+0000 (UTC)',
    },
    {
      'id': 3,
      'firstName': 'Kristen',
      'lastName': 'Moore',
      'registeredAt': 'Mon Nov 09 2015 16:11:21 GMT+0000 (UTC)',
    },
    {
      'id': 4,
      'firstName': 'Moss',
      'lastName': 'Bowen',
      'registeredAt': 'Thu Aug 04 1977 05:52:52 GMT+0000 (UTC)',
    },
    {
      'id': 5,
      'firstName': 'Elaine',
      'lastName': 'Michael',
      'registeredAt': 'Wed Mar 30 1977 01:48:30 GMT+0000 (UTC)',
    },
    {
      'id': 6,
      'firstName': 'Jerri',
      'lastName': 'Hicks',
      'registeredAt': 'Wed Jul 10 2013 22:53:48 GMT+0000 (UTC)',
    },
    {
      'id': 7,
      'firstName': 'Sharron',
      'lastName': 'Castro',
      'registeredAt': 'Mon Sep 27 1976 07:55:10 GMT+0000 (UTC)',
    },
    {
      'id': 8,
      'firstName': 'Harriett',
      'lastName': 'Horton',
      'registeredAt': 'Wed Aug 18 2010 14:06:33 GMT+0000 (UTC)',
    },
    {
      'id': 9,
      'firstName': 'Griffin',
      'lastName': 'Navarro',
      'registeredAt': 'Tue Oct 24 2017 23:45:35 GMT+0000 (UTC)',
    },
  ];

  title = 'my-first-project';
  public mySlider = {start: 400, end: 500};
  public time1 = '10:30';

  public clickedDate: Date = new Date();
  public range: DateRange = [1, 6];

  public pageTitle: string;
  public pageDescription: string;

  public pane = 'closed';
  public opened = false;
  public backdrop = true;

  public uploadProgress = 20;
  public maxValue = 100;

  public result = '';

  public results = [];
  public heroList = [
    { name: 'Batman' },
    { name: 'Wonder Woman' },
    { name: 'Wolverine' },
    { name: 'Iron Man' },
    { name: 'Deadpool' },
  ];

  public index = 0;

  public heroes2 = [
    { name: 'Spiderman' },
    { name: 'Wolverine' },
    { name: 'Iron man' },
  ];

  public activeHero = this.heroes2[this.index];

  public selectedItem1 = '';

  public leafletMap: LeafletMap = new LeafletMap({
    zoom: 13, // default zoom level
    center: [51.215, 4.425], // default center point
    onAddPolygon: (layer) => { },
    onAddLine: (layer) => { },
    onEditFeature: (feature) => { },
  });

  public stuff: SearchFilterChoice[] = [{
    label: 'First item',
    value: 'one',
  }, {
    label: 'Second item',
    value: 'two',
  }, {
    label: 'Third item',
    value: 'three',
  }, {
    label: 'Fourth item',
    value: 'four',
  }];

  public currentPage = 1;
  public itemsPerPage = 2;
  private heroes = [
    { name: 'Batman' },
    { name: 'Superman' },
    { name: 'Iron man' },
    { name: 'Wolverine' },
    { name: 'Wonder woman' },
    { name: 'Deadpool' },
  ];
  public visibleHeroes: any[];
  public itemsPerPageOptions = [1, 2, 4];
  public totalValues = this.heroes.length;

  public codeExampleJSON = `
    [
        {
            "title": "apples",
            "count": [12000, 20000],
            "description": {"text": "...", "sensitive": false}
        },
        {
            "title": "oranges",
            "count": [17500, null],
            "description": {"text": "...", "sensitive": false}
        }
    ]`;

  public interpolateMessage = 'This %{text} requires your attention.';

  public interpolateString = {
    text: 'message',
  };

  public pluralizeMessage: Label = {
    singular: 'This %{text} requires your attention.',
    plural: 'These %{text}s require your attention.',
  };

  public pluralizeMail: Label = {
    singular: 'This mail requires your attention.',
    plural: 'These mails require your attention.',
  };

  public remainingMessages = {
    remaining: 3,
  };

  public toggle = true;

    public ngOnInit() {
      this.dateForm = this.fb.group({
        inputDate: ['10/10/2019'],
      });
      this.leafletMap.onInit.subscribe(() => {
      this.leafletMap.addTileLayer(baseMapWorldGray);
      this.leafletMap.addTileLayer(baseMapAntwerp);
      this.selectHeroes();
     });

      // Checkbox filter
      this.checkFilter.id = 'checkFilter';
      this.checkFilter.name = 'Checkbox filter';
      this.checkFilter.options = this.heroList2;
      this.checkFilter.value = [];
      this.checkFilter.parse = (data, value) => {
        if (!value || value.length === 0) {
          return;
        }
        const result = [];
        data.filter((o) => {
          value.forEach(i => {
            if ((o.id.toLowerCase()).indexOf(i.id.toLowerCase()) !== -1) {
              result.push(i);
            }
          });
        });
        return result;
      };

      // Input filter
      this.searchFilter.id = 'searchFilter';
      this.searchFilter.name = 'Search here...';
      this.searchFilter.value = '';
      this.searchFilter.parse = (data, value) => {
        if (!value || value.length === 0) {
          return;
        }
        return data.filter((o) => {
          return (o.name.toLowerCase()).indexOf(value.toLowerCase()) !== -1;
        });
      };

      // Select filter
      this.selectFilter.id = 'selectFilter';
      this.selectFilter.name = 'Select your hero';
      this.selectFilter.options = this.heroList2;
      this.selectFilter.value = [];
      this.selectFilter.parse = (data, value) => {
        if (!value || value.length === 0) {
          return;
        }

        return data.filter((o) => {
          return (o.id.toLowerCase()).indexOf(value.id.toLowerCase()) !== -1;
        });
      };

    }

    public onUpdatePage(page) {
      this.currentPage = page;
      this.selectHeroes();
    }

    public onUpdateItems(count) {
      this.itemsPerPage = count;
      this.selectHeroes();
    }

    private selectHeroes() {
      this.visibleHeroes = this.heroes.slice((this.currentPage * this.itemsPerPage)
        - this.itemsPerPage, (this.currentPage * this.itemsPerPage));
    }

    public setTitle() {
      this.contextService.updateContext({
        title: 'New context example title',
      });
      // this.pageTitle = this.titleService.getTitle();
    }

    public setSelectedItem1(hero: {name}): void {
      this.selectedItem1 = hero.name;
    }

    public onSelect(item) {
      this.index = this.heroes.findIndex(hero => hero.name === item.name);
      this.activeHero = item;
    }

  public onOpen() {
    this.pane = 'open';
  }

  public onClose() {
    this.pane = 'closed';
  }

  public selectDate(event) {
    if (event.complete) {
      this.clickedDate = event.date;
    }
  }

  public changeSearchFilter(value) {
    this.searchFilter.value = value;
    this.searchResults = this.filterService.filterData(this.heroList2, [this.searchFilter]);
  }

  public changeCheckFilter(value) {
    this.checkFilter.value = value;
    this.checkResults = this.filterService.filterData(this.heroList2, [this.checkFilter]);
  }

  public changeSelectFilter(value) {
    this.selectFilter.value = value;
    this.selectResults = this.filterService.filterData(this.heroList2, [this.selectFilter]);
  }

  public interpolateValue() {
    const interpolatedValue = interpolate('This is number %{number} of an interpolated %{text}.', { text: 'message', number: 1 });
    return interpolatedValue;
  }

  public get amount() { return this.toggle ? { description: 'singular', value: 1 } : { description: 'plural', value: 0 }; }

  public toggleAmount() { this.toggle = !this.toggle; }

  public getContent(event) {
    this.result = event;
  }

  public openModal() {
    this.modalService.openModal(
      AUIDemoModalComponent,
      {
        title: 'Modal',
        text: 'Are you sure you want to see a demo of this modal?',
      }, {
        confirm: () => this.doSomething(),
      }
    );
  }

  private doSomething() {
    return new Promise((resolve, reject) => {
      return resolve();
    });
  }

  public loggedIn(): void {
    this.localstorageService.setItem('user', 'You are logged in');
  }

  public loggedOut(): void {
    this.localstorageService.setItem('user', 'You are logged out');
  }

  public init(): void {
    this.localstorageService.removeItem('user');
    this.timesUsed = this.timesUsed + 1;
    this.localstorageService.setItem('number', this.timesUsed);
  }

  public clear(): void {
    this.localstorageService.clear('user', 'number');
  }

  public getItem(): any {
    this.item = this.localstorageService.getItem('user');
    this.timesUsed = this.localstorageService.getItem('number');
  }

}
