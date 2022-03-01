import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useBondStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchBondPrice() {
      try {
        setStat(await tombFinance.getBondStat());
      }
      catch(err){
        console.error(err);
      }
    }
    fetchBondPrice();
  }, [setStat, tombFinance, slowRefresh]);

  return stat;
};

export default useBondStats;
