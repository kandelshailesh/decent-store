import { rarible } from './constants/customChains';
import { base } from 'viem/chains'
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
  // Note: need to set an approval for the inbox to spend the ERC20 - https://basescan.org/tx/0x6d1c1fb5fb434f1041e9d05a5eb41e51050fd4be0ddfa7c285e9a39e47122882
  // Sample success: https://basescan.org/tx/0x26e7e838c07e087e4971d0930d6fdfc509053be97f7735157d9bccdf3427aa1a

  const AMOUNT = 1000000000000n;
  const BUFFER = 10_00n; // 10% BPS

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const to = sender;
  const l2CallValue = AMOUNT;
  const maxSubmissionCost = AMOUNT + AMOUNT * BUFFER / 100_00n;
  const excessFeeRefundAddress = sender;
  const callValueRefundAddress = sender;
  const gaslimit = 30000n;
  const { maxFeePerGas } = await publicClient.estimateFeesPerGas();
  const tokenTotalFeeAmount = maxFeePerGas && maxSubmissionCost + l2CallValue + gaslimit * maxFeePerGas;
  const data = '0x';

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
