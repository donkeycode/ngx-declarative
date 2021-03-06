import {
  Component, AfterContentInit, ContentChild, ContentChildren, QueryList,
  ChangeDetectorRef, Input, OnChanges
} from '@angular/core';
import { ColumnComponent } from '../column.component';
import { ActionComponent } from '../action.component';
import { GET_LIST } from '../data-providers';
import { Configurator } from '../../configurator';

export abstract class RestListConnectable implements OnChanges, AfterContentInit {

  @Input() set pagePosition(position: number){
    if (position) {
      this.paginationPosition = position;
      return;
    }
    this.paginationPosition = Configurator.getPaginationPosition();
  };

  public columns: ColumnComponent[];

  public columnsSubscription;

  public actions: ActionComponent[];

  public actionsSubscription;

  public paginationPosition = Configurator.getPaginationPosition();

  public rows: any[] = [ ];

  public sorting: any = { field: '', order: 'ASC' };

  public filtering: any = {};

  public pagination: any = { page: 1, perPage: 10 };

  public totalPages: number = 1;

  @Input() public objects: string; // @TODO find a way to set it in mixins

  /* tslint:disable no-input-rename */
  @Input('api-url') public apiUrl: string;

  @Input() public source;

  constructor(public changeDetector: ChangeDetectorRef) {
  }

  public ngOnChanges(changes) {
    if (changes.objects) {
      // If changing input source, refresh data
      this.resetPage();
      this.connectRest();
    }
  }

  public connectRest() {
    let restProvider = this.source ||
      Configurator.getRestProvider()(this.apiUrl || Configurator.apiUrl);

    Configurator.beforeRequest();
    restProvider(GET_LIST, this.objects, {
        pagination: this.pagination,
        sort: this.sorting,
        filter: this.filtering
    }).then((results) => {
        Configurator.afterRequest();
        this.totalPages = Math.ceil(results.total / this.pagination.perPage);
        this.rows = results.data;
    });
  }

  public changePage(page) {
    if (page <= 0 || page > this.totalPages) {
      return;
    }
    this.pagination.page = page;
    this.connectRest();
  }

  public resetPage() {
    this.pagination.page = 1;
    return;
  }

  public isSorted(col: ColumnComponent) {
    return false;
  }

  public sort(event, col: ColumnComponent) {
    if (!col.sortable) {
      return;
    }
    if (this.sorting.field === col.mappedOn) {
      this.sorting.order = this.sorting.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sorting = {
        field: col.mappedOn,
        order: 'ASC'
      };
    }
    this.resetPage();
    this.connectRest();
  }

  public filter(event, col: ColumnComponent) {
    this.resetPage();
    if (event === '' || (col.type === 'boolean' && event === 'both')) {
      delete this.filtering[col.mappedOn];
    } else {
      this.filtering[col.mappedOn] = event;
    }
    this.connectRest();
  }

  public createPaginationArray(offset: number) {
    let array = [];
    let startIndex = this.pagination.page - offset <= 0 ? 1 : this.pagination.page - offset;
    let lastIndex = this.pagination.page + offset + 1 > this.totalPages ?
      this.totalPages : this.pagination.page + offset + 1;
    for (let i = startIndex; i < lastIndex + 1; i++) {
      array.push(i);
    }
    return array;
  }

  public ngAfterContentInit() {
    this.initColumns();
    this.initActions();
  }

  /* tslint:disable no-empty */
  public initColumns() { };
  public initActions() { };
}
