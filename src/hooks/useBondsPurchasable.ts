import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../tomb-finance/ERC20';
import useTombFinance from './useTombFinance';
import config from '../config';

const useBondsPurchasable = () => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchBondsPurchasable() {
        try {
            setBalance(await tombFinance.getBondsPurchasable());
        }
        catch(err) {
            console.error(err);
        }
      }
    fetchBondsPurchasable();
  }, [setBalance, tombFinance]);

  return balance;
};

export default useBondsPurchasable;
