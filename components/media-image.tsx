'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImagePlaceholder } from '@/components/image-placeholder';

interface MediaImageProps {
  src: string;
  alt: string;
  filename?: string;
  placeholderLabel?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

export function MediaImage({
  src,
  alt,
  filename,
  placeholderLabel,
  className,
  imageClassName,
  priority,
  fill = true,
  width,
  height,
  sizes,
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const usePlaceholder = failed || src.startsWith('placeholder:');

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {usePlaceholder ? (
        <ImagePlaceholder
          filename={filename ?? src.replace('placeholder:', '')}
          label={placeholderLabel ?? 'Add image'}
          className="h-full w-full"
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill={fill && !width}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={cn(fill && !width ? 'object-cover' : '', imageClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
