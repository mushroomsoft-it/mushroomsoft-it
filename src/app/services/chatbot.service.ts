import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private readonly copilotUrlToken = environment.COPILOT_URL_TOKEN;
  private readonly botFrameworkUrl = environment.BOT_FRAMEWORK_URL;
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadWebChatScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptAlreadyLoaded = document.querySelector(
        `script[src="${this.botFrameworkUrl}"]`
      );

      if (scriptAlreadyLoaded) {
        resolve();
        return;
      }

      const script = this.renderer.createElement('script');
      script.src = this.botFrameworkUrl;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve();
      script.onerror = () => reject('Error loading WebChat script');
      this.renderer.appendChild(document.body, script);
    });
  }

  async getDirectLine(): Promise<any> {
    const WebChat = (window as any).WebChat;
    if (!WebChat) throw new Error('WebChat is not loaded');

    const tokenEndpointURL = new URL(this.copilotUrlToken);
    const apiVersion = tokenEndpointURL.searchParams.get('api-version') || '';
    const locale = document.documentElement.lang || 'en';

    try {
      const [directLineResponse, tokenResponse] = await Promise.all([
        fetch(
          new URL(
            `/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`,
            tokenEndpointURL
          )
        ).then((res) => res.json()),
        fetch(tokenEndpointURL).then((res) => res.json()),
      ]);

      const directLineURL = directLineResponse.channelUrlsById.directline;
      const token = tokenResponse.token;

      return WebChat.createDirectLine({
        domain: new URL('v3/directline', directLineURL).toString(),
        token,
      });
    } catch (error) {
      throw new Error('Failed to fetch DirectLine token');
    }
  }

  getStyleOptions(closedIcon: string) {
    return {
      backgroundColor: 'white',
      accent: '#00809d',
      botAvatarBackgroundColor: '#d3e1e9',
      botAvatarImage: closedIcon,
      botAvatarInitials: 'BT',
      fontWeight: 'normal',
      bubbleMaxWidth: Infinity,
      bubbleTextStyle: { fontWeight: 'normal' },
      bubbleFromUserTextStyle: { fontWeight: 'normal' },
      bubbleBackground: '#007bff',
      bubbleTextColor: '#ffffff',
      hideUploadButton: true,
    };
  }
}
