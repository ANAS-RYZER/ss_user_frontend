import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/logo.png';

interface LogoProps {
  className?: string;
  /** Display height in pixels */
  height?: number;
  priority?: boolean;
}

export function Logo({ className, height, priority }: LogoProps) {
  return (
    <Image
      src={LOGO_SRC}
      alt="SHARNAYA"
      width={280}
      height={120}
      priority={priority}
      className={cn(
        'h-11 w-auto max-w-[min(160px,42vw)] object-contain object-left sm:h-12 sm:max-w-[200px] md:h-14 md:max-w-[240px]',
        !height && '',
        className,
      )}
      style={height ? { height, maxWidth: 'min(240px, 50vw)' } : undefined}
    />
  );
}

interface LogoLinkProps extends LogoProps {
  href?: string;
}

export function LogoLink({ href = '/', className, height = 52, priority }: LogoLinkProps) {
  return (
    <Link href={href} className={cn('inline-flex shrink-0 items-center', className)}>
      <Logo height={height} priority={priority} />
    </Link>
  );
}
