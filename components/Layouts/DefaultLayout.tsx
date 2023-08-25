import React, { ReactNode } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import styles from '@/styles/splash-animation.module.css';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';

type DefaultLayoutProps = {
  title?: string;
  image?: string;
  showSolana?: boolean;
  children: ReactNode;
};

const DefaultLayout = ({
  title,
  image,
  children,
  showSolana,
}: DefaultLayoutProps) => {
  return (
    <div>
      <nav
        className={clsx(
          'flex flex-wrap items-center justify-end gap-1',
          'fixed inset-0 bottom-auto z-10',
          'my-8 mx-4 md:mx-20'
        )}
      >
        <RainbowConnectButton />
      </nav>
      <div className="relative">
        <div className="bg-gradient-conic sticky top-0">
          <div
            className={clsx(
              'relative bg-gradient-grid-white bg-center',
              'grid place-items-center overflow-hidden min-h-screen',
              styles.gridShrink
            )}
          >
            <div className="absolute m-8 top-0 left-0 flex gap-8 items-center">
              <Image
                src="/decent-icon-black.png"
                alt="Decent Logo"
                height={40}
                width={48}
                // priority
              />
              <p className="uppercase mx-auto text-3xl font-light">
                Click. Mint.
              </p>
            </div>
            {title && (
              <div className="p-4 rounded-md bg-white/60 mt-28">
                {image && (
                  <Image
                    className="rounded-md"
                    src={image}
                    alt="nft image"
                    height={325}
                    width={325}
                  />
                )}
                <div className="flex justify-between items-center pt-4">
                  <p className="text-2xl font-semibold">{title}</p>
                </div>
              </div>
            )}
            <div className="mx-auto my-10 max-w-md space-y-10 mb-24">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
