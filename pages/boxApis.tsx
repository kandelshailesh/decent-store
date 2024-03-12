import { Layout } from '@/components/Layouts/Layout';
import { Address, encodeFunctionData } from 'viem';
import {
  ChainId,
  ActionType,
  ActionConfig,
  Transaction,
  Payment,
  BridgeId,
  RelayInfo,
  EvmTransaction,
} from '@decent.xyz/box-common';
import { createBoxActionRequest } from '@/utils/constants/apiTestInputs';
import { ApiTests } from '@/utils/types';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { sendTransaction } from '@wagmi/core';
import { useState } from 'react';

interface BoxActionRequest {
  sender: Address;
  srcChainId: ChainId;
  srcToken?: Address;
  dstChainId: ChainId;
  dstToken?: Address;
  slippage: number;
  actionType: ActionType;
  actionConfig: ActionConfig;
}

type BoxActionResponse = {
  tx: Transaction;
  tokenPayment?: Payment;
  applicationFee?: Payment;
  bridgeFee?: Payment;
  bridgeId?: BridgeId;
  relayInfo?: RelayInfo;
};

const BASE_URL_V1 = 'https://box-v1.api.decent.xyz/api/getBoxAction';
const BASE_URL_V2 =
  'https://box-v2.api.decent.xyz/api/getBoxAction';
const LOCAL_HOST_URL = 'http://localhost:4000/api/getBoxAction';
// TODO: none of these should be called, just box

export default function ExamplePage() {
  const { address: account } = useAccount();
  const [txHash, setTxHash] = useState('');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const runTx = async () => {
    // Refer to utils/constants/apiTestInputs to see the possible configs
    // For testing purposes, we are defaulting to grab a random config to send. Presets enumerated in the constants file though.
    try {
      const scenario = ApiTests.MULTI_HOP_OP_BASE_DEGEN;
      const { config, response } = await generateResponse(scenario, account!);

      if (chain?.id !== config?.srcChainId) {
        switchNetwork?.(config?.srcChainId);
      } else {
        const tx = response?.tx as EvmTransaction;
        const { hash } = await sendTransaction(tx);
        setTxHash(hash);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <h1 className={'font-semibold text-2xl mb-2'}>Box API's</h1>
      <button
        onClick={() => runTx()}
        className="bg-black px-5 py-2 rounded-full text-white hover:opacity-80"
      >
        Send a Tx
      </button>
      <p className="py-4">{txHash}</p>
    </Layout>
  );
}

const generateResponse = async (apiTest: ApiTests, account: Address) => {
  let req;
  if (account) {
    req = await createBoxActionRequest(account, apiTest);
  }

  const url = `${BASE_URL_V2}?arguments=${JSON.stringify(
    req,
    bigintSerializer
  )}`;
  try {
    const response = await fetch(url, {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_NEW_DECENT_API_KEY as string,
      },
    });
    const data = await response.text();

    const actionResponse: BoxActionResponse = JSON.parse(
      data,
      bigintDeserializer
    );
    return {
      config: req,
      response: actionResponse,
    };
  } catch (e) {
    console.error('Error getting response', e);
    return {
      config: null,
      response: null,
    };
  }
};

const bigintSerializer = (key: string, value: unknown): unknown => {
  if (typeof value === 'bigint') {
    return value.toString() + 'n';
  }

  return value;
};

const bigintDeserializer = (key: string, value: unknown): unknown => {
  if (typeof value === 'string' && /^-?\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }

  return value;
};
