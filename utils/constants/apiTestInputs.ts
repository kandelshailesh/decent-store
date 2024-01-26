import {
  ActionType,
  BoxActionRequest,
  ChainId,
  SwapDirection,
} from '@decent.xyz/box-common';
import { zeroAddress, parseUnits, Address } from 'viem';

const ARB_INBOX_PROXY = '0x37e60f80d921dc5e7f501a7130f31f6548dba564';

const apiTestInputs: BoxActionRequest[] = [
  // Swap Arb -> Op
  {
    sender: '',
    srcChainId: ChainId.ARBITRUM,
    srcToken: zeroAddress,
    dstChainId: ChainId.OPTIMISM,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: ChainId.OPTIMISM,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Swap OP Sepolia -> Rari
  {
    sender: '',
    srcChainId: 11155420 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 1918988905 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1918988905 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Swap Arb Sep -> Rari
  {
    sender: '',
    srcChainId: 421614 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 1918988905 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1918988905 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.0001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Swap Rari -> Arb Sep
  {
    sender: '',
    srcChainId: 1918988905 as ChainId,
    srcToken: zeroAddress,
    dstChainId: 11155420 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 421614 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Arb -> Rari
  {
    sender: '',
    srcChainId: ChainId.ARBITRUM,
    srcToken: zeroAddress,
    dstChainId: 1380012617 as ChainId,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: 1380012617 as ChainId,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Rari -> Arb
  {
    sender: '',
    srcChainId: 1380012617 as ChainId,
    srcToken: zeroAddress,
    dstChainId: ChainId.ARBITRUM,
    dstToken: zeroAddress,
    slippage: 0,
    actionType: ActionType.SwapAction,
    actionConfig: {
      chainId: ChainId.ARBITRUM,
      swapDirection: SwapDirection.EXACT_AMOUNT_IN,
      amount: parseUnits('0.00001', 18),
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E',
    },
  },
  // Multi-hop swap: OP -> Arb -> Rari
  {
    sender: '0xFDAf8F210d52a3f8EE416ad06Ff4A0868bB649D4',
    srcChainId: ChainId.ARBITRUM, // any source
    srcToken: zeroAddress, // can let users select any token on source chain with DeFi liquidity
    dstChainId: ChainId.ARBITRUM, // always ARB
    dstToken: zeroAddress, // must be Ethereum to call next function
    slippage: 0,
    actionType: ActionType.NftMint,
    actionConfig: {
      chainId: ChainId.ARBITRUM,
      contractAddress: ARB_INBOX_PROXY,
      cost: {
        // this cost should be configurable based on maxSubmissionCost + (maxFeePerGas*gasLimit)
        amount: parseUnits('0.00035', 18),
        isNative: true,
      },
      signature: `function createRetryableTicket(address to,uint256 l2CallValue, uint256 maxSubmissionCost,address excessFeeRefundAddress,address callValueRefundAddress,uint256 gasLimit,uint256 maxFeePerGas,bytes calldata data)`,
      args: [
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232',
        '1000000000000', // l2CallVallue
        '1100000000000', // maxSubmissionCost - would be good to see how tight we can get this -- equal?
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232', // excess fee refund addy
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232', // refund addy
        30000n, // gaslimit
        1700000000n, // maxFeePerGas
        '0x', // calldata (could theoretically mint nfts w this (i think))
      ],
    },
  },
];

export function createBoxActionRequest(
  sender: Address,
  index: number
): BoxActionRequest {
  return {
    ...apiTestInputs[index],
    sender: sender,
  };
}
