import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { By } from '@angular/platform-browser/src/dom/debug/by';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { CommonModule } from '@angular/common';

import { DataGridModule } from '../lib/datagrid';



describe('DataGridComponent', () => {
  // Create a test component to test directives
  @Component({
    template: '<data-grid objects="books"><column type="html" mapped-on="title"></column></data-grid>'
  })
  class TestComponent { }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
          CommonModule,
          DataGridModule
      ]
    });
  });

  it('init simple datagrid', fakeAsync(() => {
    TestBed.compileComponents().then(() => {

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      tick();
      const element = fixture.debugElement.query(By.css('table'));
      // expect('truc').toBe('truc');

    });
  }));

});
