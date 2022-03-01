import { useCallback, useEffect, useState } from 'react';
import useTombFinance from '../useTombFinance';
import { useWallet } from 'use-wallet';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';

const useEstimateTShare = (tbondAmount: string) => {
  const [estimateAmount, setEstimateAmount] = useState<string>('');
  const { account } = useWallet();
  const tombFinance = useTombFinance();

  const estimateAmountOfTShare = useCallback(async () => {
    const tbondAmountBn = parseUnits(tbondAmount);
    const amount = await tombFinance.estimateAmountOfTShare(tbondAmountBn.toString());
    setEstimateAmount(amount);
  }, [account]);

  useEffect(() => {
    if (account) {
      estimateAmountOfTShare().catch((err) => console.error(`Failed to get estimateAmountOfgshares: ${err.stack}`));
    }
  }, [account, estimateAmountOfTShare]);

  return estimateAmount;
};

export default useEstimateTShare;