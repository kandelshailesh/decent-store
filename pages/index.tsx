import { Layout } from '@/components/Layouts/Layout';
import Link from 'next/link';
import { ActionType, ChainId } from '@decent.xyz/box-common';
import { wagmiConfig } from '@/utils/wagmiConfig';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { TheBox } from '@decent.xyz/the-box';
import { parseUnits } from 'viem';
import '@decent.xyz/the-box/index.css';
import { useEffect, useState } from 'react';

const config = {
  [ChainId.POLYGON_TESTNET]: {
    contractAddress: '0x9A681B1501c37a8911880e8cD70Aa3e0f6153a90',
    tokenAddress: ''
  },
  [ChainId.POLYGON]: {
    // 0xC9f7DD5Dca7848798210008e8493f385f0771893
    // original
    // contractAddress: '0x17acD660eb038EC55274d9CE8bd2ae50FFdC60E4',
    // new
    contractAddress: '0x3cd005E512cDc3BcCDbb3D636B3C245FceA4a9b5',
    tokenAddress: '0x2bC07124D8dAc638E290f401046Ad584546BC47b'
  }
}

const chainId = ChainId.POLYGON;

const itemId = 'cdh_30days';
const quantity = 1;
const amount = 1000000000000000000;

export default function BoxSplashPage() {
  // const examples = [
  //   { title: 'The Box', link: '/theBox' },
  //   { title: 'Swap Modal', link: '/swap' },
  //   { title: 'Box Hooks', link: '/boxHooks' },
  //   { title: 'Box UI', link: '/boxUi' },
  //   { title: 'Fiat Checkout', link: '/fiatCheckout' },
  //   { title: 'Box APIs', link: '/boxApis' },
  // ];
  // return (
  //   <Layout>
  //     <h1 className={'font-semibold text-6xl mb-5'}>The Box Examples!</h1>
  //     <p className={'mb-10 text-2xl'}>
  //       Welcome to the-box examples project! Here you can find working-versions
  //       of the-box.
  //     </p>
  //     <ul>
  //       {examples.map(({ title, link }, i) => (
  //         <li className={' mb-5 text-4xl text-gray-500 '} key={i}>
  //           <Link href={link}>{title}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </Layout>
  // );
  const { openConnectModal } = useConnectModal();

  const { address, isConnected } = useAccount();

  const [signature, setSignature] = useState('');

  const [playerId, setPlayerId] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const getPlayerId = async () => {
    try {
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://cdh-web-api-preprod-dot-tower-token-firestore.df.r.appspot.com/get_linked_status', { walletAddress: address });
      const { playerId } = response.data;
      console.log("Player info", playerId);
      setPlayerId(playerId);
      return playerId;
    } catch (error) {
      console.log("Error while fetching the player info", error);
    }
  }

  const getSignature = async () => {
    try {
      setErrorMsg('');
      setPlayerId('');
      const playerId = await getPlayerId();
      if (!playerId) {
        setErrorMsg('Linked player id not found');
        return;
      }
      const response = await axios.post('https://cors-anywhere.herokuapp.com/https://cdh-shop-api-preprod-dot-tower-token-firestore.df.r.appspot.com/store/order/verify', { playerId, walletAddress: address, fingerprint: 'abcdef', itemId: itemId, quantity });
      const result = response.data;
      console.log("Signature result", result);
      setSignature(result.orderSignature);
    } catch (error: any) {
      console.log("Error", error);
      setErrorMsg(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    if (address) {
      getSignature()
    }
  }, [address])

  return (
    <Layout>
      <TheBox
        className="rounded-lg border shadow-md bg-white dark"
        paymentButtonText="Purchase Item"
        actionType={ActionType.EvmFunction}
        actionConfig={{
          contractAddress: config[chainId].contractAddress,
          chainId: chainId,
          cost: {
            amount: parseUnits('1', 18),
            isNative: false,
            tokenAddress: config[chainId].tokenAddress,
          },
          signature:
            'function purchase(address _purchaser, string _itemId, uint256 _quantity, uint256 _totalAmount, bytes _sig)',
          args: [
            address,
            itemId,
            BigInt(quantity),
            BigInt(amount),
            signature,
          ],
        }}
        apiKey={process.env.NEXT_PUBLIC_DECENT_API_KEY as string}
        wagmiConfig={wagmiConfig}
        onConnectWallet={() => openConnectModal}
      />

      {/* {JSON.stringify({ playerId, address, signature })} */}
      {!address && <p style={{ 'color': 'red' }}>Please connect to the wallet</p>}
      {errorMsg && <p style={{ 'color': 'red' }}>{errorMsg}</p>}
    </Layout>
  )
}
