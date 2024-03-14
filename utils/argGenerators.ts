import { rarible, degen, xai } from './constants/customChains';
import { createPublicClient, http } from 'viem';
import { ApiTests } from '@/utils/types';

export const generateArgsMultiHop = async (sender: string) => {
  const AMOUNT = 1000000000000n;
  const BUFFER = 10_00n; // 10% BPS

  const publicClient = createPublicClient({
    chain: rarible,
    transport: http(),
  });

  const to = sender;
  const l2CallValue = AMOUNT;
  const maxSubmissionCost = AMOUNT + AMOUNT * BUFFER / 100_00n;
  const excessFeeRefundAddress = sender;
  const callValueRefundAddress = sender;
  const gaslimit = 30000n;
  const { maxFeePerGas } = await publicClient.estimateFeesPerGas();
  const data = '0x';
  console.log('maxFeePerGas', maxFeePerGas, maxSubmissionCost, gaslimit, l2CallValue)

  return [
    to,
    l2CallValue,
    maxSubmissionCost,
    excessFeeRefundAddress,
    callValueRefundAddress,
    gaslimit,
    maxFeePerGas,
    data,
  ];
}

export const genERC20MulitHop = async (sender: string) => {
  // Sample success: https://basescan.org/tx/0x26e7e838c07e087e4971d0930d6fdfc509053be97f7735157d9bccdf3427aa1a

  const AMOUNT = 1000000000000n;
  const BUFFER = 10_00n; // 10% BPS

  const publicClient1 = createPublicClient({
    chain: degen,
    transport: http(),
  });
  const publicClient2 = createPublicClient({
    chain: xai,
    transport: http(),
  });
  // 0xE5A2B1AE8c5EBf3c73328Dd27f9949F8A887E63d : 1000000150000000000n
  // 0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232 : 3390034710000n
  // 0xFDAf8F210d52a3f8EE416ad06Ff4A0868bB649D4 : 115591004313364744194n
  const balance = await publicClient1.getBalance({
    address: "0xfdaf8f210d52a3f8ee416ad06ff4a0868bb649d4"
  })
  const balance2 = await publicClient2.getBalance({
    address: "0xfdaf8f210d52a3f8ee416ad06ff4a0868bb649d4"
  })
  console.log("TEST DEGEN: ", balance)
  console.log("TEST XAI: ", balance2)

  const to = sender;
  const l2CallValue = AMOUNT;
  const maxSubmissionCost = AMOUNT + AMOUNT * BUFFER / 100_00n;
  const excessFeeRefundAddress = sender;
  const callValueRefundAddress = sender;
  const gaslimit = 30000n;
  const { maxFeePerGas } = await publicClient1.estimateFeesPerGas();
  const tokenTotalFeeAmount = maxFeePerGas && maxSubmissionCost + l2CallValue + gaslimit * maxFeePerGas;
  const data = '0x';

  console.log("TEST: ", maxFeePerGas, tokenTotalFeeAmount, maxSubmissionCost)

  return [
    to,
    l2CallValue,
    maxSubmissionCost,
    excessFeeRefundAddress,
    callValueRefundAddress,
    gaslimit,
    maxFeePerGas,
    tokenTotalFeeAmount,
    data,
  ];
}

type ArgGenerator = (...args: any[]) => Promise<any[]>;

export const argGenerators: Record<ApiTests, ArgGenerator | undefined> = {
  [ApiTests.SWAP_ARB_TO_OP]: undefined,
  [ApiTests.SWAP_OP_SEPOLIA_TO_RARI_TESTNET]: undefined,
  [ApiTests.SWAP_ARB_SEPOLIA_TO_RARI_TESTNET]: undefined,
  [ApiTests.SWAP_RARI_TESTNET_TO_ARB_SEPOLIA]: undefined,
  [ApiTests.SWAP_ARB_TO_RARI]: undefined,
  [ApiTests.SWAP_RARI_TO_ARB]: undefined,
  [ApiTests.SWAP_BASE_TO_OP]: undefined,
  [ApiTests.MULTI_HOP_OP_ARB_RARI]: generateArgsMultiHop,
  [ApiTests.MULTI_HOP_OP_BASE_DEGEN]: genERC20MulitHop,
};
