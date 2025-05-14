import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ChatbotService } from '../../services/chatbot.service';
import data from '../../config/sections.json';

@Component({
  selector: 'app-mushroomsoft-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  private subscription!: Subscription;

  chatOpen = false;
  showTooltip = true;
  webchatInitialized = false;
  iconTransitioning = false;
  isVisible = false;

  openIcon = 'icons/4.png';
  closedIcon = 'icons/3.png';

  constructor(private el: ElementRef, private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService
      .loadWebChatScript()
      .then(() => (this.isVisible = true))
      .catch((err) => console.error('Error loading WebChat script:', err));
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
