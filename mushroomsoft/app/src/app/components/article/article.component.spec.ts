import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {MianLibService} from '@mushroomsoft-lib';
import {of} from 'rxjs';
import {ArticleComponent} from './article.component';
describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let service: MianLibService;
  let httpClient: HttpClient;
  let injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      providers: [MianLibService],
      imports:[HttpClientTestingModule]
    }).compileComponents();
    service = TestBed.inject(MianLibService);
    injector = getTestBed();
    httpClient = injector.get(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the file article.json', () => {
    let mockArticle ={
      "items": [
        {
          "title": "Commitment",
          "image": "assets/commitments/commitment_1.png",
          "description": "We know that outsourcing a developer can be complicated. That's why we take care of all the legal requirements and recruitment process so that our customers can focus on what they do best. Moreover, we have a convenient time zone for clients on the East Coast. Our customers don't have to wait for the next business day to contact our team. We are committed to providing the best tech solutions for our customers while meeting deadlines and business requirements."
        },
        {
          "title": "Philosophy",
          "image": "assets/commitments/commitment_2.png",
          "description": "Description: We are a horizontal organization. This means we want our employees to feel empowered to solve all types of challenges and propose new solutions. We believe our people are our best asset. For the past few years, we have been training our devs in the latest technologies to meet our customers' demands by providing the best solutions within a short time and with high quality."
        },
        {
          "title": "What's next",
          "image": "assets/commitments/commitment_3.png",
          "description": "Description: Our goal is to start the MushroomSoft Foundation, to train developers from rural and underserved communities with the latest technologies and help them become fluent in English. This will allow our graduates to be competitive around the world.Our vision is to be the best outsourcing tech company in Latin America in the next five years."
        }
      ]
    }

    const response: any = '';

    spyOn(service, 'getForm').and.returnValue(of(response))
    component.getForm();
    fixture.detectChanges();
    expect(component.commitmentItems).toEqual(response);



  });
});
