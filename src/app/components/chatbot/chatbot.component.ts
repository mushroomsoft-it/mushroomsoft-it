import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../observables/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mushroomsoft-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  private readonly copilotUrlToken = environment.COPILOT_URL_TOKEN;

  private subscription!: Subscription;

  chatOpen = false;
  showTooltip = true;
  webchatInitialized = false;
  iconTransitioning = false;

  openIcon = 'icons/open.png';
  closedIcon = 'icons/close.png';

  tooltipText = ''; // Se eliminó el contenido del tooltip

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src =
      'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      // El script cargó exitosamente
      console.log('WebChat script loaded');
    };
    script.onerror = () => {
      console.error('Error loading WebChat script');
    };
    this.renderer.appendChild(document.body, script);

    this.subscription = this.navigationService.languageObservable.subscribe(
      (language) => {
        if (language === 'en') {
          this.tooltipText = 'Ask me something!';
        } else if (language === 'es') {
          this.tooltipText = '¡Pregúntame algo!';
        }
      }
    );
  }

  ngAfterViewInit(): void {
    const chat = this.el.nativeElement.querySelector('#webchat');

    if (!chat) return;

    const observer = new MutationObserver(() => {
      const bubbles = chat.querySelectorAll('.webchat__bubble__content');

      bubbles.forEach((bubble: HTMLElement) => {
        const text = bubble.textContent?.trim();
        if (
          text?.includes(
            'Hi, I’m Cheetara, MushroomSoft’s virtual assistant. Feel free to ask me about any of the following topics:'
          ) ||
          text?.includes(
            'Hola, soy Cheetara, el asistente virtual de MushroomSoft. Pregúntame cualquier de los siguientes temas:'
          )
        ) {
          this.renderer.addClass(bubble, 'cheetara-message');
        }
      });
    });

    observer.observe(chat, { childList: true, subtree: true });
  }

  async toggleChat(forceClose: boolean | null = null) {
    if (forceClose !== null) {
      this.chatOpen = !forceClose;
    } else {
      this.chatOpen = !this.chatOpen;
    }

    this.showTooltip = !this.chatOpen;

    this.iconTransitioning = true;
    setTimeout(() => (this.iconTransitioning = false), 150);

    if (this.chatOpen && !this.webchatInitialized) {
      this.webchatInitialized = true;
      this.initializeWebChat();
    }
  }

  private async initializeWebChat() {
    const WebChat = (window as any).WebChat;
    if (!WebChat) {
      console.error('WebChat is not loaded yet.');
      return;
    }

    let directLineURL, token;
    try {
      const tokenEndpointURL = new URL(this.copilotUrlToken);
      const locale = document.documentElement.lang || 'en';
      const apiVersion = tokenEndpointURL.searchParams.get('api-version');

      const [directLineResponse, tokenResponse] = await Promise.all([
        fetch(
          new URL(
            `/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`,
            tokenEndpointURL
          )
        ).then((response) => response.json()),
        fetch(tokenEndpointURL).then((response) => response.json()),
      ]);

      directLineURL = directLineResponse.channelUrlsById.directline;
      token = tokenResponse.token;
    } catch (error) {
      console.error('Error fetching DirectLine URL or token:', error);
      return;
    }

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
              locale: document.documentElement.lang || 'en',
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
      botAvatarBackgroundColor: '#d3e1e9',
      botAvatarImage: this.closedIcon,
      botAvatarInitials: 'BT',
      userAvatarImage: 'https://avatars.githubusercontent.com/u/661465',
      fontWeight: 'normal',
      bubbleMaxWidth: Infinity,
      bubbleTextStyle: {
        fontWeight: 'normal',
      },
      bubbleFromUserTextStyle: {
        fontWeight: 'normal',
      },
      bubbleBackground: '#007bff',
      bubbleTextColor: '#ffffff',
    };

    WebChat.renderWebChat(
      {
        directLine,
        locale: document.documentElement.lang || 'en',
        styleOptions,
      },
      this.el.nativeElement.querySelector('#webchat')
    );
  }
}
