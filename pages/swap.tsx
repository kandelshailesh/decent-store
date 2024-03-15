import { Layout } from '@/components/Layouts/Layout';
import { useAccount } from 'wagmi';
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
            apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
            address={address}
            chainIds={[
              ChainId.OPTIMISM,
              ChainId.POLYGON,
              ChainId.RARIBLE,
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
