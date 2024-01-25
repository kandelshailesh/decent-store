import { ChainId } from '@decent.xyz/box-common';
import { Lookup } from '@decent.xyz/box-common';

export const optimismSepolia = {
  id: 11155420,
  name: 'Optimism Sepolia',
  network: 'optimism-sepolia',
  nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://sepolia.optimism.io'],
    },
    public: {
      http: ['https://sepolia.optimism.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://optimism-sepolia.blockscout.com',
      apiUrl: 'https://optimism-sepolia.blockscout.com/api',
    },
  },
  testnet: true,
};

export const arbitrumSepolia = {
  id: 421_614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum-sepolia',
  nativeCurrency: {
    name: 'Arbitrum Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc'],
    },
    public: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://sepolia.arbiscan.io',
      apiUrl: 'https://sepolia.arbiscan.io/api',
    },
  },
  testnet: true,
};

export const rarible = {
  id: ChainId.RARIBLE,
  name: 'Rarible',
  network: 'rarible',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mainnet.rpc.rarichain.org/http'],
    },
    public: {
      http: ['https://mainnet.rpc.rarichain.org/http'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://mainnet.explorer.rarichain.org/',
      apiUrl: 'https://mainnet.explorer.rarichain.org/api',
    },
  },
  testnet: false,
};

export const raribleTestnet = {
  id: ChainId.RARIBLE_TESTNET,
  name: 'Rarible Testnet',
  network: 'rarible-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.rarichain.org/http'],
    },
    public: {
      http: ['https://testnet.rpc.rarichain.org/http'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://explorer.rarichain.org/',
      apiUrl: 'https://explorer.rarichain.org/api',
    },
  },
  testnet: true,
};

export const customWagmiChains: Lookup<ChainId, any> = {
  [ChainId.ARBITRUM_SEPOLIA]: arbitrumSepolia,
  [ChainId.OPTIMISM_SEPOLIA]: optimismSepolia,
  [ChainId.RARIBLE_TESTNET]: rarible,
  [ChainId.RARIBLE_TESTNET]: raribleTestnet,
}