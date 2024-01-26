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
];

export function createBoxActionRequest(sender: Address, index: number): BoxActionRequest {
  return {
    ...apiTestInputs[index],
    sender: sender
  }
}