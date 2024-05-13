import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { erc20Abi, formatEther } from 'viem'
import { useAccount, useBlockNumber, useReadContracts } from 'wagmi'
import {
  balanceAtom,
  stakeBalanceAtom,
  stakeTokenSupplyAtom,
  tokenSupplyAtom,
} from '../../components/staking/atoms'
import { STAKE_TOKEN, TOKEN } from '../../components/staking/constants'

const Updater = () => {
  // Setters
  const setBalance = useSetAtom(balanceAtom)
  const setStakeBalance = useSetAtom(stakeBalanceAtom)
  const setTokenSupply = useSetAtom(tokenSupplyAtom)
  const setStakeTokenSupply = useSetAtom(stakeTokenSupplyAtom)
  // Getters
  const wallet = useAccount()
  const { data: blockNumber } = useBlockNumber({ watch: true })
  // Contract calls
  const { data: balances, refetch: refetchBalances } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'balanceOf',
        args: [wallet.address || '0x'],
      },
    ],
    allowFailure: false,
    query: { enabled: !!wallet.address },
  })
  const { data: supplies, refetch: refetchSupply } = useReadContracts({
    contracts: [
      {
        abi: erc20Abi,
        address: TOKEN.address,
        functionName: 'totalSupply',
      },
      {
        abi: erc20Abi,
        address: STAKE_TOKEN.address,
        functionName: 'totalSupply',
      },
    ],
    allowFailure: false,
  })

  useEffect(() => {
    if (balances) {
      setBalance({ value: balances[0], formatted: formatEther(balances[0]) })
      setStakeBalance({
        value: balances[1],
        formatted: formatEther(balances[1]),
      })
    }
  }, [balances])

  useEffect(() => {
    if (supplies) {
      setTokenSupply(Number(formatEther(supplies[0])))
      setStakeTokenSupply(Number(formatEther(supplies[1])))
    }
  }, [supplies])

  // Refresh data on block
  useEffect(() => {
    refetchBalances()
    refetchSupply()
  }, [blockNumber])

  return null
}

export default Updater
