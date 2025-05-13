import { TestBed } from '@angular/core/testing';
import { ChatbotService } from './chatbot.service';
import { Renderer2, RendererFactory2 } from '@angular/core';
import * as environmentModule from '../../environments/environment';

describe('ChatbotService', () => {
  let service: ChatbotService;
  let rendererFactory: jasmine.SpyObj<RendererFactory2>;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    // Mock
    (environmentModule.environment as any).COPILOT_URL_TOKEN =
      'https://mock-token-url.com?api-version=2023-10-01-preview';
    (environmentModule.environment as any).BOT_FRAMEWORK_URL =
      'https://mock-bot-framework-url.com/webchat.js';

    renderer = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'appendChild',
    ]);
    rendererFactory = jasmine.createSpyObj('RendererFactory2', [
      'createRenderer',
    ]);
    rendererFactory.createRenderer.and.returnValue(renderer);

    TestBed.configureTestingModule({
      providers: [
        ChatbotService,
        { provide: RendererFactory2, useValue: rendererFactory },
      ],
    });

    service = TestBed.inject(ChatbotService);
  });

  describe('loadWebChatScript', () => {
    it('should resolve if script is already loaded', async () => {
      spyOn(document, 'querySelector').and.returnValue(
        document.createElement('script')
      );
      await expectAsync(service.loadWebChatScript()).toBeResolved();
    });

    it('should append script if not already loaded and resolve on load', async () => {
      spyOn(document, 'querySelector').and.returnValue(null);

      const mockScript: any = {};
      renderer.createElement.and.returnValue(mockScript);

      const promise = service.loadWebChatScript();
      mockScript.onload();
      await expectAsync(promise).toBeResolved();
    });

    it('should reject if script fails to load', async () => {
      spyOn(document, 'querySelector').and.returnValue(null);

      const mockScript: any = {};
      renderer.createElement.and.returnValue(mockScript);

      const promise = service.loadWebChatScript();
      mockScript.onerror();
      await expectAsync(promise).toBeRejectedWith(
        'Error loading WebChat script'
      );
    });
  });

  describe('getDirectLine', () => {
    beforeEach(() => {
      (window as any).WebChat = {
        createDirectLine: jasmine
          .createSpy('createDirectLine')
          .and.returnValue('mockDirectLine'),
      };

      spyOn(window, 'fetch').and.callFake((input: RequestInfo | URL) => {
        if ((input as string).toString().includes('regionalchannelsettings')) {
          return Promise.resolve({
            json: () =>
              Promise.resolve({
                channelUrlsById: {
                  directline: 'https://mock-directline.com',
                },
              }),
          } as Response);
        } else {
          return Promise.resolve({
            json: () =>
              Promise.resolve({
                token: 'mock-token',
              }),
          } as Response);
        }
      });
    });

    it('should return a directLine instance', async () => {
      const result = await service.getDirectLine();
      expect((window as any).WebChat.createDirectLine).toHaveBeenCalledWith({
        domain: 'https://mock-directline.com/v3/directline',
        token: 'mock-token',
      });
      expect(result).toBe('mockDirectLine');
    });

    it('should throw error if WebChat is not loaded', async () => {
      const originalWebChat = (window as any).WebChat;
      delete (window as any).WebChat;
      await expectAsync(service.getDirectLine()).toBeRejectedWithError(
        'WebChat is not loaded'
      );
      (window as any).WebChat = originalWebChat;
    });
  });

  describe('getStyleOptions', () => {
    it('should return style options with given icon', () => {
      const iconUrl = 'https://example.com/icon.png';
      const options = service.getStyleOptions(iconUrl);
      expect(options.botAvatarImage).toBe(iconUrl);
      expect(options.backgroundColor).toBe('white');
    });
  });
});
