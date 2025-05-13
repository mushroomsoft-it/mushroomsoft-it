import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-mushroomsoft-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  private subscription!: Subscription;

  chatOpen = false;
  showTooltip = true;
  webchatInitialized = false;
  iconTransitioning = false;
  isVisible = false;

  openIcon = 'icons/2.png';
  closedIcon = 'icons/6.png';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private chatbotService: ChatbotService
  ) {}

  ngOnInit(): void {
    this.chatbotService
      .loadWebChatScript()
      .then(() => (this.isVisible = true))
      .catch((err) => console.error('Error loading WebChat script:', err));
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
    this.chatOpen = forceClose !== null ? !forceClose : !this.chatOpen;
    this.showTooltip = !this.chatOpen;

    this.iconTransitioning = true;
    setTimeout(() => (this.iconTransitioning = false), 150);

    if (this.chatOpen && !this.webchatInitialized) {
      this.webchatInitialized = true;
      this.initializeWebChat();
    }
  }

  private async initializeWebChat() {
    try {
      const WebChat = (window as any).WebChat;
      if (!WebChat) throw new Error('WebChat is not loaded');

      const directLine = await this.chatbotService.getDirectLine();

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

      const styleOptions = this.chatbotService.getStyleOptions(this.closedIcon);

      WebChat.renderWebChat(
        {
          directLine,
          locale: document.documentElement.lang || 'en',
          styleOptions,
        },
        this.el.nativeElement.querySelector('#webchat')
      );
    } catch (error) {
      console.error('Error initializing WebChat:', error);
    }
  }
}
