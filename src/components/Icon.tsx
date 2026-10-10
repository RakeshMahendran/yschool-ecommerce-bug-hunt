export type IconName =
  | 'bag'
  | 'cart'
  | 'search'
  | 'box'
  | 'receipt'
  | 'compass'
  | 'star'
  | 'check'
  | 'arrow-left'
  | 'minus'
  | 'plus';

const PATHS: Record<IconName, JSX.Element> = {
  bag: (
    <>
      <path d="M5 8h14l-1 12H6L5 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" />
      <circle cx="10" cy="20.5" r="1.2" />
      <circle cx="17.5" cy="20.5" r="1.2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5v-9z" />
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9L12 3.5z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

interface IconProps {
  name: IconName;
  size?: number;
  filled?: boolean;
  className?: string;
}

/** Decorative SVG icon. Hidden from assistive technology and from page text. */
export default function Icon({ name, size = 18, filled = false, className = '' }: IconProps) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
