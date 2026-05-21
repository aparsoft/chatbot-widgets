# Aparsoft AI Chatbot Widget

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@aparsoft/chatbot-react.svg)](https://www.npmjs.com/package/@aparsoft/chatbot-react)
[![Deploy in 3 mins](https://img.shields.io/badge/Deploy%20in-3%20minutes-blue)](https://chatbot.aparsoft.com)

> Add an AI-powered chatbot to your website in under 60 seconds.
> Trained on **your** content. No coding required beyond a single component.

---

## Install

| Framework | Package | Command |
|---|---|---|
| React | `@aparsoft/chatbot-react` | `npm i @aparsoft/chatbot-react` |
| Next.js | `@aparsoft/chatbot-nextjs` | `npm i @aparsoft/chatbot-nextjs` |
| Vue 2/3 | `@aparsoft/chatbot-vue` | `npm i @aparsoft/chatbot-vue` |
| Angular | `@aparsoft/chatbot-angular` | `npm i @aparsoft/chatbot-angular` |
| Vanilla JS | Hosted loader | See below |

---

## Quick Start

### React

```bash
npm install @aparsoft/chatbot-react
```

```jsx
import AparsoftChatbot from '@aparsoft/chatbot-react';

export default function App() {
  return (
    <>
      <main>Your page content</main>
      <AparsoftChatbot apiKey="YOUR_PUBLIC_API_KEY" />
    </>
  );
}
```

### Next.js (App Router)

```bash
npm install @aparsoft/chatbot-nextjs
```

```tsx
// app/page.tsx or any client component
import AparsoftChatbot from '@aparsoft/chatbot-nextjs';

export default function Page() {
  return <AparsoftChatbot apiKey="YOUR_PUBLIC_API_KEY" />;
}
```

Works with both App Router and Pages Router. The package includes the `'use client'` directive.

### Vue 2 / Vue 3

```bash
npm install @aparsoft/chatbot-vue
```

```vue
<template>
  <AparsoftChatbot api-key="YOUR_PUBLIC_API_KEY" />
</template>

<script>
import AparsoftChatbot from '@aparsoft/chatbot-vue';

export default {
  components: { AparsoftChatbot },
};
</script>
```

### Angular (14+)

```bash
npm install @aparsoft/chatbot-angular
```

```typescript
import { AparsoftChatbotComponent } from '@aparsoft/chatbot-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AparsoftChatbotComponent],
  template: `
    <main>Your page content</main>
    <aparsoft-chatbot apiKey="YOUR_PUBLIC_API_KEY"></aparsoft-chatbot>
  `,
})
export class AppComponent {}
```

SSR-safe with Angular Universal -- uses `isPlatformBrowser` internally.

### Vanilla HTML (any website)

```html
<script
  src="https://www.aparsoft.com/static/chatbot-widget/widget.loader.js"
  data-aparsoft-chatbot="true"
  data-api-key="YOUR_PUBLIC_API_KEY"
></script>
```

### WordPress

Download the plugin zip from the [latest GitHub Release](https://github.com/aparsoft/chatbot-widgets/releases) and upload it via Plugins > Add New > Upload Plugin. Then enter your API key in Settings > Aparsoft Chatbot.

See the [WordPress guide](docs/wordpress-guide.md) for full instructions.

---

## Get Your API Key

1. Sign up at [chatbot.aparsoft.com](https://chatbot.aparsoft.com) -- Free tier: 50 messages/month
2. Register your website URL
3. The platform scrapes, vectorizes, and deploys your chatbot in 3-5 minutes
4. Copy the API key from the dashboard into the component

[Get 50 Free Messages per Website](https://chatbot.aparsoft.com)

---

## Configuration

All props work identically across React, Next.js, Vue, and Angular.

| Prop | Type | Default | Description |
|---|---|---|---|
| `apiKey` | `string` | *(required)* | Public widget API key from dashboard |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Launcher placement |
| `showBranding` | `boolean` | `true` | Show "Powered by Aparsoft" footer |
| `autoOpenDelay` | `number` | `0` | Auto-open after N milliseconds |
| `primaryColor` | `string \| null` | Dashboard config | Override primary theme color (hex) |
| `secondaryColor` | `string \| null` | Dashboard config | Override secondary theme color (hex) |
| `widgetTitle` | `string \| null` | Dashboard config | Override header title |
| `widgetSubtitle` | `string \| null` | Dashboard config | Override header subtitle |
| `welcomeMessage` | `string \| null` | Dashboard config | Override welcome message |
| `onReady` | `(widget) => void` | -- | Callback when widget is mounted (React/Next.js/Vue) |

### Example with Props

```jsx
<AparsoftChatbot
  apiKey="YOUR_PUBLIC_API_KEY"
  position="bottom-left"
  primaryColor="#6366f1"
  secondaryColor="#818cf8"
  widgetTitle="Support"
  welcomeMessage="Hi! How can I help?"
  autoOpenDelay={3000}
  showBranding={false}
  onReady={(widget) => console.log('Widget ready:', widget)}
/>
```

---

## Programmatic Control

### React / Next.js Hook

```jsx
import { useAparsoftChatbot } from '@aparsoft/chatbot-react';

function SupportButton() {
  const { openChat, closeChat, toggleChat, sendMessage, getWidget } = useAparsoftChatbot();

  return (
    <button onClick={() => { sendMessage('I need help'); openChat(); }}>
      Get Help
    </button>
  );
}
```

### Global Window API (any framework)

```javascript
// Open/close/toggle the widget
window.AparsoftChatbot?.open?.();
window.AparsoftChatbot?.close?.();
window.AparsoftChatbot?.toggle?.();

// Send a message programmatically
window.AparsoftChatbot?.sendMessage?.('Hello');

// Clean up
window.AparsoftChatbot?.destroy?.();
```

---

## Features

- **Zero-config RAG** -- Scrapes your site, builds a vector index, answers from YOUR content
- **Real-time WebSocket streaming** -- Token-by-token responses
- **SSR-safe** -- Works with Next.js App Router, Nuxt, Angular Universal
- **Fully customizable** -- Colors, position, welcome message via dashboard or props
- **Analytics dashboard** -- Track conversations, top questions, content gaps
- **Multi-tenant** -- Each website gets isolated vector storage
- **WhatsApp integration** -- Same knowledge base, WhatsApp channel (paid plans)
- **Lightweight** -- Zero dependencies. Widget runtime hosted on Aparsoft CDN.
- **TypeScript support** -- Full type definitions for React and Next.js packages

---

## How It Works

These packages are thin wrappers. They inject the hosted `widget.loader.js` from Aparsoft's CDN into your page. The widget runtime itself (UI, WebSocket connection, chat logic) stays on Aparsoft's infrastructure -- so there are zero dependencies to install and zero bundle-size impact beyond the wrapper.

---

## Documentation

- [Getting Started](docs/getting-started.md)
- [Configuration](docs/configuration.md)
- [Theming](docs/theming.md)
- [SSR Guide](docs/ssr-guide.md)
- [API Reference](docs/api-reference.md)
- [WordPress Guide](docs/wordpress-guide.md)

---

## Examples

A vanilla HTML example is included in [`examples/vanilla-html/`](examples/vanilla-html/index.html).

---

## Pricing

| Plan | Credits/mo | Price (INR/mo) | Key Limits |
|---|---|---|---|
| Free | 50 | 0 | 1 website, 1 MB KB |
| Standard | 1,000 | 999 | 1 website, 20 MB KB, WhatsApp |
| Pro | 4,000 | 2,499 | 3 websites, 50 MB KB, WhatsApp |
| Enterprise | Unlimited | Custom | Unlimited everything |

[View full pricing](https://chatbot.aparsoft.com/pricing)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Bug reports and feature requests are welcome via [GitHub Issues](https://github.com/aparsoft/chatbot-widgets/issues).

---

## License

MIT &copy; [Aparsoft Private Limited](https://aparsoft.com)
