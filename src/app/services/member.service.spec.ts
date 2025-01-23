import { TestBed } from '@angular/core/testing';
import { MemberService } from './member.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Member } from '../types/member.interface';
import { environment } from '../../environments/environment';

describe('MemberService', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService],
    });
    service = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMembers', () => {
    it('should fetch and map members correctly', () => {
      const mockResponse = [
        {
          acf: {
            name: 'Member 1',
            title: '',
            subtitle: '',
            description: '',
            carrer: '',
            career: '',
            expertin: '',
            hobby: '',
            foto: 0,
            image: '',
          },
        },
        {
          acf: {
            name: 'Member 2',
            title: '',
            subtitle: '',
            description: '',
            carrer: '',
            career: '',
            expertin: '',
            hobby: '',
            foto: 0,
            image: '',
          },
        },
        { otherField: 'Ignored' },
      ];

      const expectedMembers: Member[] = [
        {
          name: 'Member 1',
          title: '',
          subtitle: '',
          description: '',
          carrer: '',
          career: '',
          expertin: '',
          hobby: '',
          foto: 0,
          image: '',
        },
        {
          name: 'Member 2',
          title: '',
          subtitle: '',
          description: '',
          carrer: '',
          career: '',
          expertin: '',
          hobby: '',
          foto: 0,
          image: '',
        },
      ];

      service.getMembers().subscribe((members) => {
        expect(members).toEqual(expectedMembers);
      });

      const req = httpMock.expectOne(environment.memberApiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse); // Simula la respuesta del servidor
    });

    it('should handle errors and return an empty array', () => {
      service.getMembers().subscribe((members) => {
        expect(members).toEqual([]);
      });

      const req = httpMock.expectOne(environment.memberApiUrl);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('getImage', () => {
    it('should fetch image URL for a given foto ID', () => {
      const fotoId = 123;
      const mockResponse = { source_url: 'https://mock-image.com/image.jpg' };

      service.getImage(fotoId).subscribe((imageUrl) => {
        expect(imageUrl).toBe(mockResponse.source_url);
      });

      const req = httpMock.expectOne(environment.mediaApiUrl + fotoId);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(
        environment.API_AUTHORIZATION
      );
      req.flush(mockResponse);
    });

    it('should handle errors when fetching an image', () => {
      const fotoId = 123;

      service.getImage(fotoId).subscribe({
        next: () => fail('Should have failed with an error'),
        error: (error) => expect(error).toBeTruthy(),
      });

      const req = httpMock.expectOne(environment.mediaApiUrl + fotoId);
      req.error(new ErrorEvent('Network error'));
    });
  });
});
