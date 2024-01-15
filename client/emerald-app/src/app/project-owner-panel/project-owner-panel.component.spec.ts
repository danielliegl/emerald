import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOwnerPanelComponent } from './project-owner-panel.component';

describe('ProjectOwnerPanelComponent', () => {
  let component: ProjectOwnerPanelComponent;
  let fixture: ComponentFixture<ProjectOwnerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectOwnerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectOwnerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
