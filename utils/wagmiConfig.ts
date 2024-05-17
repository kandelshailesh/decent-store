import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { wagmiSetup } from '@decent.xyz/box-common';

const { chains, transports } = wagmiSetup;

export const wagmiConfig = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: process.env['PROJECT_ID'] || 'your-mom',
  chains,
  transports,
  ssr: true,
});
