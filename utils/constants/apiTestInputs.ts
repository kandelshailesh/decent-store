import { ActionType, BoxActionRequest, ChainId, SwapDirection } from "@decent.xyz/box-common"
import { zeroAddress, parseUnits, Address } from "viem";

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
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
    }
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
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
    }
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
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
    }
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
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
    }
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
      receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
    }
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
        receiverAddress: '0xAcCC1fe6537eb8EB56b31CcFC48Eb9363e8dd32E'
      }
    },
  // Multi-hop swap: OP -> Arb -> Rari
  {
    sender: '',
    srcChainId: ChainId.ARBITRUM,
    srcToken: zeroAddress, // can let users select any token on source chain with DeFi liquidity
    dstChainId: ChainId.ARBITRUM,
    dstToken: zeroAddress, // must be Ethereum to call next function
    slippage: 0,
    actionType: ActionType.NftMint,
    actionConfig: {
      chainId: ChainId.ARBITRUM,
      contractAddress: '0xDB7c293763f4A459996abbd66c6BE23D771bBCbd',
      cost: {
        amount: parseUnits('0.0004', 18),
        isNative: true,
      },
      signature: `function createRetryableTicket(address to,uint256 l2CallValue, uint256 maxSubmissionCost,address excessFeeRefundAddress,address callValueRefundAddress,uint256 gasLimit,uint256 maxFeePerGas,bytes calldata data)`,
      args: [
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232',
        '1000000000000',
        '1100000000000',
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232',
        '0x5D7370fCD6e446bbC14A64c1EFfe5FBB1c893232',
        30000,
        1700000000,
        '0x'
      ],
    }
  },
];

export function createBoxActionRequest(sender: Address, index: number): BoxActionRequest {
  return {
    ...apiTestInputs[index],
    sender: sender
  }
}