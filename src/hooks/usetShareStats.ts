import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { TokenStat } from '../tomb-finance/types';
import useRefresh from './useRefresh';

const useShareStats = () => {
  const [stat, setStat] = useState<TokenStat>();
  const { slowRefresh } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchSharePrice() {
      try {
        setStat(await tombFinance.getShareStat());
      } catch(err){
        console.error(err)
      }
    }
    fetchSharePrice();
  }, [setStat, tombFinance, slowRefresh]);

  return stat;
};

export default useShareStats;
