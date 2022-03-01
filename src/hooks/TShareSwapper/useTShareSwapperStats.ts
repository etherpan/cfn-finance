import { useEffect, useState } from 'react';
import useTombFinance from '../useTombFinance';
import { TShareSwapperStat } from '../../tomb-finance/types';
import useRefresh from '../useRefresh';

const useTShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<TShareSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const tombFinance = useTombFinance();

  useEffect(() => {
    async function fetchTShareSwapperStat() {
      try{
        if(tombFinance.myAccount) {
          setStat(await tombFinance.getTShareSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTShareSwapperStat();
  }, [setStat, tombFinance, fastRefresh, account]);

  return stat;
};

export default useTShareSwapperStats;