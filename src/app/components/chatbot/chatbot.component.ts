import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mushroomsoft-chatbot',
  standalone: true,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit {
  private readonly copilotUrlToken = environment.COPILOT_URL_TOKEN;
  public readonly captchaSiteKey = environment.CAPTCHA_SITE_KEY;

  private recaptchaV3Service = inject(ReCaptchaV3Service);

  chatOpen = false;
  webchatInitialized = false;
  iconTransitioning = false;

  openIcon = 'https://cdn-icons-png.flaticon.com/512/6469/6469080.png';
  closedIcon = 'https://cdn-icons-png.flaticon.com/512/1998/1998597.png';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src =
      'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => console.log('WebChat script loaded.');
    this.renderer.appendChild(document.body, script);
  }

  async toggleChat(forceClose: boolean | null = null) {
    this.recaptchaV3Service.execute(
      this.captchaSiteKey,
      'chat_open',
      (token: string) => {
        if (token) {
          if (forceClose !== null) {
            this.chatOpen = !forceClose;
          } else {
            this.chatOpen = !this.chatOpen;
          }

          this.iconTransitioning = true;
          setTimeout(() => (this.iconTransitioning = false), 150);

          if (this.chatOpen && !this.webchatInitialized) {
            this.webchatInitialized = true;
            this.initializeWebChat();
          }
        } else {
          console.error('Error.');
        }
      }
    );
  }

  private async initializeWebChat() {
    const WebChat = (window as any).WebChat;
    if (!WebChat) {
      console.error('WebChat is not loaded yet.');
      return;
    }

    const tokenEndpointURL = new URL(this.copilotUrlToken);

    const locale = document.documentElement.lang || 'en';
    const apiVersion = tokenEndpointURL.searchParams.get('api-version');

    const [directLineURL, token] = await Promise.all([
      fetch(
        new URL(
          `/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`,
          tokenEndpointURL
        )
      )
        .then((response) => response.json())
        .then(({ channelUrlsById: { directline } }) => directline),
      fetch(tokenEndpointURL)
        .then((response) => response.json())
        .then(({ token }) => token),
    ]);

    const directLine = WebChat.createDirectLine({
      domain: new URL('v3/directline', directLineURL).toString(),
      token,
    });

    directLine.connectionStatus$.subscribe({
      next(value: number) {
        if (value === 2) {
          directLine
            .postActivity({
              localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              locale,
              name: 'startConversation',
              type: 'event',
            })
            .subscribe();
        }
      },
    });

    const styleOptions = {
      backgroundColor: 'white',
      accent: '#00809d',
      botAvatarBackgroundColor: '#FFFFFF',
      botAvatarImage: this.closedIcon,
      botAvatarInitials: 'BT',
      userAvatarImage: 'https://avatars.githubusercontent.com/u/661465',
      fontWeight: 'normal',
      bubbleTextStyle: {
        fontWeight: 'normal',
      },
      bubbleFromUserTextStyle: {
        fontWeight: 'normal',
      },
    };

    WebChat.renderWebChat(
      { directLine, locale, styleOptions },
      this.el.nativeElement.querySelector('#webchat')
    );
  }
}
