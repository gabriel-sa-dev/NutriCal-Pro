interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
};

const icons: Record<string, JSX.Element> = {
  male: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A8.966 8.966 0 0112 15c2.284 0 4.373.77 6.003 2.054M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  ),
  female: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM6 20v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
  ),
  fire: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2s4 2 4 6-2 6-4 8-4-2-4-6 4-8 4-8z" />
  ),
  muscle: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 010 8h-1l-2 3v-3H9a4 4 0 010-8h7z" />
  ),
  walk: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l-3 7-1-4-3-2 4-5 3 4 4-2z" />
  ),
  run: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  ),
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  ),
  meat: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v6a4 4 0 004 4h10a4 4 0 004-4V7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3v4" />
    </>
  ),
  grain: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  ),
  avocado: (
    <>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8 2 4 5 4 9c0 5 8 13 8 13s8-8 8-13c0-4-4-7-8-7z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
    </>
  ),
  medical: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8M12 2a10 10 0 100 20 10 10 0 000-20z" />
  ),
};

export default function Icon({ name, className = '', size = 'sm' }: IconProps) {
  const icon = icons[name];
  
  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <svg 
      className={`${iconSizes[size]} ${className}`}
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      {icon}
    </svg>
  );
}
