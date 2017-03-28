import {
  fakeAsync,
  inject,
  tick,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseRequestOptions, Http } from '@angular/http';
import { By } from '@angular/platform-browser/src/dom/debug/by';
import { MockBackend } from '@angular/http/testing';

// Load the implementations that should be tested
import { CommonModule } from '@angular/common';

import { CardsListModule } from '../lib/cardslist';
import { Configurator } from '../lib/configurator';
import SimpleTestRestProvider from './simpleTest';


const detectChanges = (nb, fixture) => {
  for (let i = 0; i < 3; i++) {
    fixture.detectChanges();
    tick();
  }
}

describe('CardsListComponent', () => {
  // Create a test component to test directives
  @Component({
    template: `<cards-list objects="books">
      <column type="html" mapped-on="title"></column>
      <card>
        <template
          dg-template="card"
          let-card="element"
          let-item="item">
            <div class="test">item</div>
        </template>
      </card>
    </cards-list>`
  })
  class TestComponent {
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
          CommonModule,
          CardsListModule,
          FormsModule
      ]
    });
  });

  it('init simple cardslist', fakeAsync(() => {
    TestBed.compileComponents().then(() => {
      Configurator.setConfig({
        restProvider: SimpleTestRestProvider
      })
      const fixture = TestBed.createComponent(TestComponent);
      detectChanges(3, fixture);
      const element = fixture.debugElement.query(By.css('.cards .card:first-child .test'));
      expect(element.nativeElement.innerHTML).toBe('item');

    });
  }));

});
