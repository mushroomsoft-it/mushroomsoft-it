import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAccessKey', () => {
    it('should return the public access key from the environment', () => {
      const accessKey = service.getAccessKey();
      expect(accessKey).toBe(environment.PUBLIC_ACCESS_KEY);
    });
  });

  describe('sendEmail', () => {
    it('should make a POST request to the email API', () => {
      const mockFormData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!',
      };
      const mockResponse = { success: true };

      service.sendEmail(mockFormData).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(environment.EMAIL_API);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockFormData);

      req.flush(mockResponse);
    });
  });
});
