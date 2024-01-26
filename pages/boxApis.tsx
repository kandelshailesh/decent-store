import { Layout } from '@/components/Layouts/Layout';
import { Address } from 'viem';
import { ChainId, ActionType, ActionConfig, Transaction, Payment, BridgeId, RelayInfo, EvmTransaction } from '@decent.xyz/box-common';
import { createBoxActionRequest } from '@/utils/constants/apiTestInputs';
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

const BASE_URL = "https://box-api-git-v2-decent-webapp.vercel.app/api/getBoxAction";

export default function ExamplePage() {
  const { address: account } = useAccount();
  const [txHash, setTxHash] = useState('');
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  async function runTx(){
    // Refer to utils/constants/apiTestInputs to see the possible configs
    // For testing purposes, we are defaulting to grab a random config to send. Presets enumerated in the constants file though.
    try {
      const scenario = 3;
      const { config, response } = await generateResponse(scenario, account!);

      if (chain?.id !== config?.srcChainId) {
        switchNetwork?.(config?.srcChainId)
      } else {
        const tx = response?.tx as EvmTransaction;
        const { hash } = await sendTransaction(tx);
        setTxHash(hash);
      };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <h1 className={'font-semibold text-2xl mb-2'}>Box API's</h1>
      <button 
        onClick={() => runTx()}
        className='bg-black px-5 py-2 rounded-full text-white hover:opacity-80'
      >Send a Tx</button>
      <p className="py-4">{txHash}</p>
    </Layout>
  );
}

async function generateResponse(randInt: number, account: Address){
  let req;
  if (account) {
    req = createBoxActionRequest(account, randInt);
  };

  const url = `${BASE_URL}?arguments=${JSON.stringify(
    req,
    bigintSerializer
  )}`;
  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_DECENT_API_KEY as string,
      },
    });
    const data = await response.text();

    const actionResponse: BoxActionResponse = JSON.parse(data, bigintDeserializer);
    console.log(actionResponse)
    return {
      config: req,
      response: actionResponse
    };
  } catch (e) {
    console.error("Error getting response");
    return {
      config: null,
      response: null,
    };
  }
}

const bigintSerializer = (key: string, value: unknown): unknown => {
  if (typeof value === "bigint") {
    return value.toString() + "n";
  }

  return value;
};

const bigintDeserializer = (key: string, value: unknown): unknown => {
  if (typeof value === "string" && /^-?\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }

  return value;
};