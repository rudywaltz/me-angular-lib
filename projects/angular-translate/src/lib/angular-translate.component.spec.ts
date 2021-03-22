import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AngularTranslateComponent } from './angular-translate.component'

describe('AngularTranslateComponent', () => {
  let component: AngularTranslateComponent
  let fixture: ComponentFixture<AngularTranslateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularTranslateComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTranslateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
