import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/t_GRAVE-01.png';
import tShareLogo from '../../assets/img/t_GSHARE-01.png';
import tombLogoPNG from '../../assets/img/grave-01.png';
import tShareLogoPNG from '../../assets/img/t_GSHARE-01.png';
import tBondLogo from '../../assets/img/GBOND-01.png';

// import tombLogo from '../../assets/img/crypto_tomb_cash.svg';
// import tShareLogo from '../../assets/img/crypto_tomb_share.svg';
// import tombLogoPNG from '../../assets/img/crypto_tomb_cash.f2b44ef4.png';
// import tShareLogoPNG from '../../assets/img/crypto_tomb_share.bf1a6c52.png';
// import tBondLogo from '../../assets/img/crypto_tomb_bond.svg';

import tombAvaxLpLogo from '../../assets/img/GRAVE-WAVAX.png';
import tshareAvaxLpLogo from '../../assets/img/GSHARES-WAVAX.png';

import WAVAXLogo from '../../assets/img/avax_logo_blue.svg';
import wethLogo from '../../assets/img/weth.png';
import rtombLogo from '../../assets/img/crypto_tomb_cash.svg';
import shibaLogo from '../../assets/img/mimlogo.png';

import tombtshares from '../../assets/img/GRAVE-GSHARES.png';

import usdc from '../../assets/img/USDC.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tombLogo,
  TOMBPNG: tombLogoPNG,
  TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  TBOND: tBondLogo,
  WAVAX: WAVAXLogo,
  WETH: wethLogo,
  MIM: shibaLogo,
  // RTOMB: rtombLogo,
  'GRAVE-AVAX-LP': tombAvaxLpLogo,
  'GSHARE-AVAX-LP': tshareAvaxLpLogo,
  'GRAVE-GSHARE-LP': tombtshares,
  'USDC': usdc,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    return <img src={logosBySymbol["TOMB"]} alt={`Tomb Logo`} width={size} height={size} />;
    // throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;
