import { Layout } from '@/components/Layouts/Layout';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { ClientRendered } from '@decent.xyz/box-ui';
import {
  ChainId,
  nativeTokenInfoLookup
} from '@decent.xyz/box-common';
import { SwapModal, darkTheme, BoxThemeProvider } from '@decent.xyz/the-box';
import "@decent.xyz/the-box/index.css";

const Swap = () => {
  const { address } = useAccount();

  return (
    <Layout>
      <ClientRendered>
        <BoxThemeProvider theme={darkTheme}>
          <SwapModal
            className="bg-black"
            apiKey={process.env.NEXT_PUBLIC_NEW_DECENT_API_KEY as string}
            address={address}
            chainIconDictOverride={{
              [ChainId.ZORA]: '/new-zora-icon.png',
              [ChainId.ARBITRUM]: '/new-arb-icon.png',
              [ChainId.AVALANCHE]: '/new-avalanche-icon.png',
              [ChainId.BASE]: '/new-base-icon.png',
              [ChainId.ETHEREUM]: '/new-eth-icon.png',
              [ChainId.OPTIMISM]: '/new-op-icon.png',
              [ChainId.POLYGON]: '/new-poly-icon.png',
              [ChainId.DEGEN]: nativeTokenInfoLookup[ChainId.DEGEN].logo,
              // 1: 'new-rari-icon.png',
              // 1: 'new-zk-icon.png',
            }}
            chainIds={[
              ChainId.ETHEREUM,
              ChainId.OPTIMISM,
              ChainId.POLYGON,
              ChainId.AVALANCHE,
              ChainId.ZORA,
              ChainId.ARBITRUM,
              ChainId.BASE,
            ]}
            selectedRecipientToken={{
              chainId: ChainId.DEGEN,
              tokenInfo: nativeTokenInfoLookup[ChainId.DEGEN],
            }}
          />
        </BoxThemeProvider>
      </ClientRendered>
    </Layout>
  );
}

export default Swap;