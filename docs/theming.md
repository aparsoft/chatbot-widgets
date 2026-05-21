# Theming

Customize the Aparsoft chatbot widget to match your brand.

## Quick Customization via Props

The easiest way to change colors is via component props:

```jsx
<AparsoftChatbot
  apiKey="cb_your_api_key"
  primaryColor="#e11d48"
  secondaryColor="#7c3aed"
  widgetTitle="My Brand Assistant"
  welcomeMessage="Welcome! Ask me anything about our products."
/>
```

## Dashboard Theming

For persistent theme changes that apply across all installations:

1. Go to [chatbot.aparsoft.com](https://chatbot.aparsoft.com) and open your chatbot settings
2. Navigate to the **Appearance** tab
3. Configure:
   - **Primary Color** -- Header background, send button, launcher icon
   - **Secondary Color** -- User message bubbles, links, accents
   - **Widget Title** -- Header text
   - **Widget Subtitle** -- Text below the title (e.g. "Typically replies instantly")
   - **Welcome Message** -- First bot message
   - **Quick Replies** -- Suggested questions shown below the welcome message
   - **Launcher Icon** -- Custom SVG or emoji for the floating button

## Color Format

Colors accept any valid CSS color value:

```jsx
primaryColor="#1d4ed8"          // Hex
primaryColor="rgb(29, 78, 216)" // RGB
primaryColor="blue"             // Named color
```

Hex values are recommended for consistency.

## Position

Control where the chat launcher appears:

```jsx
<AparsoftChatbot apiKey="cb_your_api_key" position="bottom-left" />
```

Options:
- `bottom-right` (default) -- Launcher in the bottom-right corner
- `bottom-left` -- Launcher in the bottom-left corner

## Branding

The free tier displays "Powered by Aparsoft AI" in the widget footer. To hide it:

```jsx
<AparsoftChatbot apiKey="cb_your_api_key" showBranding={false} />
```

Hiding branding is available on paid plans. The dashboard will prompt you to upgrade if you attempt this on the free tier.

## Auto-Open

Automatically open the chat widget after a delay:

```jsx
<AparsoftChatbot apiKey="cb_your_api_key" autoOpenDelay={5000} />
```

This opens the chat panel 5 seconds after the page loads. Set to `0` (default) to keep the launcher closed until the user clicks it.

## Advanced: CSS Overrides

The widget runs inside a sandboxed iframe on `aparsoft.com`, so you cannot directly override its CSS from your page. If you need deep customization beyond what the props and dashboard offer, contact [hello@aparsoft.com](mailto:hello@aparsoft.com) for a white-label solution.

## Theming Examples

### Dark Theme

```jsx
<AparsoftChatbot
  apiKey="cb_your_api_key"
  primaryColor="#18181b"
  secondaryColor="#3b82f6"
  widgetTitle="Night Mode Assistant"
/>
```

### Minimal / Clean

```jsx
<AparsoftChatbot
  apiKey="cb_your_api_key"
  primaryColor="#ffffff"
  secondaryColor="#111827"
  widgetTitle="Help"
  welcomeMessage="What do you need help with?"
/>
```

### Brand Match

```jsx
<AparsoftChatbot
  apiKey="cb_your_api_key"
  primaryColor="#your-brand-color"
  secondaryColor="#your-accent-color"
  widgetTitle="Your Brand Name"
/>
```
