import { useEffect, useState } from 'react';
import useTombFinance from './useTombFinance';
import { AllocationTime } from '../tomb-finance/types';
import useRefresh from './useRefresh';


const useGenesisPoolAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const tombFinance = useTombFinance();
  useEffect(() => {
    if (tombFinance) {
      tombFinance.getGenesisPoolStartAndEndTime().then(setTime);
    }
  }, [tombFinance, slowRefresh]);
  return time;
};

export default useGenesisPoolAllocationTimes;
