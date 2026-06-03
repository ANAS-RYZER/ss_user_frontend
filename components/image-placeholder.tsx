import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  /** Filename hint shown to help you drop assets in the right place */
  filename?: string;
  label?: string;
  className?: string;
}

export function ImagePlaceholder({
  filename,
  label = 'Add image',
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-secondary via-muted/80 to-secondary p-6 text-center',
        className,
      )}
      aria-hidden
    >
      <div className="flex size-14 items-center justify-center rounded-full border border-border/60 bg-background/60 shadow-sm">
        <ImageIcon className="size-6 text-muted-foreground/70" strokeWidth={1.25} />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        {filename && (
          <p className="font-mono text-[11px] text-muted-foreground/80">{filename}</p>
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
