import { useCallback } from 'react';
import useTombFinance from './useTombFinance';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { parseUnits } from 'ethers/lib/utils';
import { TAX_OFFICE_ADDR } from './../utils/constants'

const useProvideTombAvaxLP = () => {
  const tombFinance = useTombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleProvideTombAvaxLP = useCallback(
    (avaxAmount: string, tombAmount: string) => {
      const tombAmountBn = parseUnits(tombAmount);
      handleTransactionReceipt(
        tombFinance.provideTombAvaxLP(avaxAmount, tombAmountBn),
        `Provide Tomb-AVAX LP ${tombAmount} ${avaxAmount} using ${TAX_OFFICE_ADDR}`,
      );
    },
    [tombFinance, handleTransactionReceipt],
  );
  return { onProvideTombAvaxLP: handleProvideTombAvaxLP };
};

export default useProvideTombAvaxLP;
