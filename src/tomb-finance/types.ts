import ERC20 from './ERC20';

export type ContractName = string;

export interface BankInfo {
  name: string;
  poolId: number;
  sectionInUI: number;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  multiplier: string;
  sort: number;
  finished: boolean;
  starttime: number;
  closedForStaking: boolean;
  genesisFinished?: boolean;
}

export interface Bank extends BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
  totalBalance?: number;
  tokenAmounts?: number;
}

export type PoolStats = {
  dailyAPR: string;
  yearlyAPR: string;
  TVL: string;
};

export type TokenStat = {
  tokenInAvax: string;
  priceInDollars: string;
  totalSupply: string;
  circulatingSupply: string;
};

export type LPStat = {
  tokenAmount: string;
  avaxAmount: string;
  priceOfOne: string;
  totalLiquidity: string;
  totalSupply: string;
};

export type AllocationTime = {
  from: Date;
  to: Date;
};

export type TShareSwapperStat = {
  tshareBalance: string;
  tbondBalance: string;
  // tombPrice: string;
  // tsharePrice: string;
  rateTSharePerTomb: string;
};
