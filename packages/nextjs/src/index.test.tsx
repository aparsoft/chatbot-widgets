import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';

import AparsoftChatbotNext, { useAparsoftChatbot } from './index';

const WIDGET_SCRIPT_URL = 'https://www.aparsoft.com/static/chatbot-widget/widget.loader.js';

describe('AparsoftChatbot (Next.js)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    window.AparsoftChatbot = null;
  });

  it('exports AparsoftChatbot as default', () => {
    expect(AparsoftChatbotNext).toBeTypeOf('function');
  });

  it('exports useAparsoftChatbot hook', () => {
    expect(useAparsoftChatbot).toBeTypeOf('function');
  });

  it('injects the widget loader script into the DOM', () => {
    render(React.createElement(AparsoftChatbotNext, { apiKey: 'test-key' }));

    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`) as HTMLScriptElement | null;
    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
  });

  it('sets data attributes correctly', () => {
    render(
      React.createElement(AparsoftChatbotNext, {
        apiKey: 'test-key',
        position: 'bottom-left',
        showBranding: false,
        primaryColor: '#1d4ed8',
        secondaryColor: '#0f766e',
        widgetTitle: 'Support',
        welcomeMessage: 'Hi!',
      }),
    );

    const script = document.querySelector(
      `script[src="${WIDGET_SCRIPT_URL}"]`,
    ) as HTMLScriptElement;
    expect(script?.dataset.aparsoftChatbot).toBe('true');
    expect(script?.dataset.apiKey).toBe('test-key');
    expect(script?.dataset.position).toBe('bottom-left');
    expect(script?.dataset.showBranding).toBe('false');
    expect(script?.dataset.primaryColor).toBe('#1d4ed8');
    expect(script?.dataset.secondaryColor).toBe('#0f766e');
    expect(script?.dataset.widgetTitle).toBe('Support');
    expect(script?.dataset.welcomeMessage).toBe('Hi!');
  });

  it('does not inject script without apiKey', () => {
    render(React.createElement(AparsoftChatbotNext, { apiKey: '' }));
    const script = document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`);
    expect(script).toBeNull();
  });

  it('cleans up on unmount', () => {
    const { unmount } = render(React.createElement(AparsoftChatbotNext, { apiKey: 'test-key' }));
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).not.toBeNull();
    unmount();
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT_URL}"]`)).toBeNull();
  });

  it('fires onReady callback on ready event', () => {
    const onReady = vi.fn();
    render(React.createElement(AparsoftChatbotNext, { apiKey: 'test-key', onReady }));

    const mockController = { open: vi.fn(), isReady: true };
    window.dispatchEvent(
      new CustomEvent('aparsoft-chatbot:ready', { detail: { controller: mockController } }),
    );
    expect(onReady).toHaveBeenCalledWith(mockController);
  });
});

describe('useAparsoftChatbot (Next.js)', () => {
  beforeEach(() => {
    window.AparsoftChatbot = null;
  });

  it('returns null getWidget when no widget loaded', () => {
    const { result } = renderHook(() => useAparsoftChatbot());
    expect(result.current.getWidget()).toBeNull();
  });

  it('calls widget methods', () => {
    const mockController = {
      open: vi.fn(),
      close: vi.fn(),
      toggle: vi.fn(),
      sendMessage: vi.fn(),
    };
    window.AparsoftChatbot = mockController as any;

    const { result } = renderHook(() => useAparsoftChatbot());
    result.current.openChat();
    result.current.closeChat();
    result.current.toggleChat();
    result.current.sendMessage('test');

    expect(mockController.open).toHaveBeenCalled();
    expect(mockController.close).toHaveBeenCalled();
    expect(mockController.toggle).toHaveBeenCalled();
    expect(mockController.sendMessage).toHaveBeenCalledWith('test');
  });

  it('handles null widget gracefully', () => {
    const { result } = renderHook(() => useAparsoftChatbot());
    expect(() => result.current.openChat()).not.toThrow();
    expect(() => result.current.sendMessage('test')).not.toThrow();
  });
});

function renderHook<T>(hook: () => T) {
  const result: { current: T } = { current: undefined as unknown as T };
  function TestComponent() {
    result.current = hook();
    return null;
  }
  const utils = render(React.createElement(TestComponent));
  return { result, ...utils };
}
