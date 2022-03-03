import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/CFN.png';
import tShareLogo from '../../assets/img/CSHARE.png';
// import tombLogoPNG from '../../assets/img/CFN.png';
// import tShareLogoPNG from '../../assets/img/t_CSHARE-01.png';
import tBondLogo from '../../assets/img/CBOND.png';

import tombAvaxLpLogo from '../../assets/img/CFN-WAVAX.png';
import tshareAvaxLpLogo from '../../assets/img/CSHARE-WAVAX.png';

import WAVAXLogo from '../../assets/img/avax_logo.svg';
import wethLogo from '../../assets/img/weth.png';
import shibaLogo from '../../assets/img/mimlogo.png';

import tombtshares from '../../assets/img/CFN-CSHARE.png';

import usdc from '../../assets/img/USDC.svg';
import joeLogo from '../../assets/img/JOE.svg';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  TOMB: tombLogo,
  // TOMBPNG: tombLogoPNG,
  // TSHAREPNG: tShareLogoPNG,
  TSHARE: tShareLogo,
  TBOND: tBondLogo,
  WAVAX: WAVAXLogo,
  WETH: wethLogo,
  MIM: shibaLogo,
  // RTOMB: rtombLogo,
  'CFN-AVAX-LP': tombAvaxLpLogo,
  'CSHARE-AVAX-LP': tshareAvaxLpLogo,
  'CFN-CSHARE-LP': tombtshares,
  'USDC': usdc,
  JOE: joeLogo,
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
