import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-mushroomsoft-chatbot',
  standalone: true,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent implements OnInit {
  chatOpen = false;
  webchatInitialized = false;
  iconTransitioning = false;

  openIcon = 'https://cdn-icons-png.flaticon.com/512/6469/6469080.png';
  closedIcon = 'https://cdn-icons-png.flaticon.com/512/1998/1998597.png';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src =
      'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => console.log('WebChat script loaded.');
    this.renderer.appendChild(document.body, script);
  }

  async toggleChat(forceClose: boolean | null = null) {
    if (forceClose !== null) {
      this.chatOpen = !forceClose;
    } else {
      this.chatOpen = !this.chatOpen;
    }

    this.iconTransitioning = true;
    setTimeout(() => (this.iconTransitioning = false), 150);

    if (this.chatOpen && !this.webchatInitialized) {
      this.webchatInitialized = true;
      await this.initializeWebChat();
    }
  }

  private async initializeWebChat() {
    const WebChat = (window as any).WebChat;
    if (!WebChat) {
      console.error('WebChat is not loaded yet.');
      return;
    }

    const tokenEndpointURL = new URL(
      'https://ebeaa4747ee6ee02b26eb819114010.e2.environment.api.powerplatform.com/powervirtualagents/botsbyschema/creeb_mushroomSoftExternalAgent/directline/token?api-version=2022-03-01-preview'
    );

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
