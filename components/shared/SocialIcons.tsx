type IconProps = { className?: string };

export function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LineIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.04 2 11.02c0 4.45 3.96 8.17 9.32 8.9.36.08.86.24.98.55.11.28.07.72.04 1l-.16 1.02c-.05.3-.24 1.17 1.03.64 1.27-.54 6.84-4.03 9.33-6.9C23.4 14.4 24 12.78 24 11.02 24 6.04 17.52 2 12 2Zm-4.4 11.1H6.12V8.9h1.48v4.2Zm3.05 0h-1.4l-1.5-2.04v2.04H6.78V8.9h1.45l1.48 2.02V8.9h1.44v4.2Zm3.4 0h-3.2V8.9h3.2v1.08h-1.72v.54h1.6v1.04h-1.6v.5h1.72v1.04Zm4.83 0h-1.48l-1.08-1.7v1.7h-1.48V8.9h1.48l1.08 1.7V8.9H18.88v4.2Z" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07C2 17.1 5.66 21.24 10.44 22v-7.02H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.1 22 12.07Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.4-.4-5c-.2-.9-.9-1.6-1.8-1.8C18.8 5 12 5 12 5s-6.8 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.8 1 12.2 1 12.2s0 3.4.4 5c.2.9.9 1.6 1.8 1.8C5.2 19.4 12 19.4 12 19.4s6.8 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5 .4-5ZM9.8 15.5V8.9l6.4 3.3-6.4 3.3Z" />
    </svg>
  );
}
