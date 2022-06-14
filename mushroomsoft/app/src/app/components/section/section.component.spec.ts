import {TestBed} from '@angular/core/testing';
import {MianLibService} from '@mushroomsoft-lib';
import {SectionComponent} from './section.component';
describe('SectionComponent', () => {
  const mockSection = {
    section: {
      title: 'Success is seeing our clients grow and overcome their IT challenges.',
      description: 'WE PROVIDE THE BEST TECH TALENT AND SOLUTIONS FOR YOUR BUSINESS.',
      img: 'assets/banner/banner.png'
    },
    sections: [
      {
        id: 'right',
        class: 'ms-about-grid',
        title: 'Who we are',
        description:
          "We are MushroomSoft IT, an Ecuadorian software company that leverages new technologies and high-performance developer teams to deliver exceptional quality products.We create solutions that address tomorrow's challenges through innovation and technology.",
        img: 'assets/sections/section_1.png'
      },
      {
        id: 'left',
        class: 'ms-about-grid ms-about-2',
        title: 'What we do',
        description:
          'We build teams of developers that are qualified to fulfill customer requirements and bring their ideas to life. Our developers are proactive; they are always looking for the best solution, prioritizing quality and performance. We have experience with different software platforms and solutions, specializing in NodeJS, Javascript and UI Technologies.',
        img: 'assets/sections/section_2.png'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionComponent],
      providers: [MianLibService]
    }).compileComponents();
  });
  it('should initialization of the component', () => {
    const fixture = TestBed.createComponent(SectionComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.sectionsItems).toEqual(mockSection.sections);
  });
});
