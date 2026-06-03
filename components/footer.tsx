import Link from 'next/link';
import { Instagram, Mail, Phone } from 'lucide-react';
import { LogoLink } from '@/components/logo';

const footerLinks = {
  Collections: ['Women', 'Men', 'Children'],
  'Customer care': ['Contact us', 'Returns', 'Shipping information'],
  Information: ['About us', 'Privacy policy', 'Terms of service'],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <LogoLink
              href="/"
              height={80}
              className="rounded-md bg-primary-foreground p-3"
            />
            <p className="mt-5 max-w-md text-lg leading-relaxed text-primary-foreground/90">
              Traditional South Indian sarees and festive wear for the whole family.
            </p>
            <a
              href="tel:+919000000000"
              className="tap-target mt-5 inline-flex items-center gap-2 text-lg font-semibold underline-offset-2 hover:underline"
            >
              <Phone size={22} aria-hidden />
              Call for orders & help
            </a>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="tap-target flex size-12 items-center justify-center rounded-md border-2 border-primary-foreground/30 hover:bg-primary-foreground/10"
                aria-label="Instagram"
              >
                <Instagram size={24} strokeWidth={1.75} />
              </a>
              <a
                href="mailto:hello@sharnaya.com"
                className="tap-target flex size-12 items-center justify-center rounded-md border-2 border-primary-foreground/30 hover:bg-primary-foreground/10"
                aria-label="Email us"
              >
                <Mail size={24} strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-lg font-bold text-primary-foreground">{title}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <Link
                      href={
                        title === 'Collections'
                          ? link === 'Women'
                            ? '/products?audience=women'
                            : link === 'Men'
                              ? '/products?audience=men'
                              : link === 'Children'
                                ? '/products?audience=children'
                                : '/products'
                          : '#'
                      }
                      className="text-lg text-primary-foreground/90 underline-offset-2 hover:text-primary-foreground hover:underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t-2 border-primary-foreground/20 pt-8 text-center text-base text-primary-foreground/75">
          <p>© {new Date().getFullYear()} SHARNAYA Traditional Fashion. All rights reserved.</p>
          <p className="mt-2">Crafted with care in Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
