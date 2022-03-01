import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/background.png';
import CashImage from '../../assets/img/t_GRAVE-02.png';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useBurnedGSHARES from '../../hooks/useBurnedGSHARES.js';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
`;

const Home = () => {
  
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombAvaxLpStats = useLpStats('GRAVE-AVAX-LP');
  const tShareAvaxLpStats = useLpStats('GSHARE-AVAX-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  // const { balance } = useBurnedGSHARES();
  const balance = 0;

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = `https://traderjoexyz.com/trade?outputCurrency=${tomb?.address}#/`
  const buyTShareAddress = `https://traderjoexyz.com/trade?outputCurrency=${tShare?.address}#/`

  const tombLPStats = useMemo(() => (tombAvaxLpStats ? tombAvaxLpStats : null), [tombAvaxLpStats]);
  const tshareLPStats = useMemo(() => (tShareAvaxLpStats ? tShareAvaxLpStats : null), [tShareAvaxLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInAVAX = useMemo(() => (tombStats ? Number(tombStats.tokenInAvax).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInAVAX = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInAvax).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);
  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInAVAX = useMemo(() => (tBondStats ? Number(tBondStats.tokenInAvax).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'GRAVE-AVAX-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'GSHARE-AVAX-LP' });



  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'GRAVE-AVAX-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'GSHARE-AVAX-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={3} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
		  <Image color="none" style={{ width: "235px", height: "235px", objectFit: "contain", paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={6}>
          <Paper>
            <Box p={4}>
              <h2>Welcome to grave!</h2>
              <p>Pegged to the price of 1 AVAX via seigniorage.</p>
              <p>
							  <StyledLink href="/farms" style={{ color: '#05147c' }} >Stake</StyledLink> your GRAVE-AVAX LP tokens to earn GSHARE seigniorage rewards.
              </p>
              <p>To maximize profits, stake your harvested GSHAREs in the <StyledLink href="/boardroom" style={{ color: '#05147c' }} >Boardroom</StyledLink> to earn more GRAVE!</p>
            </Box>
          </Paper>
        </Grid>		
        <Grid container justify="center">
            <Box mt={3} style={{ width: '1000px' }}>
            <Alert variant="filled" severity="warning">
                Do your own research before investing. Investing is risky and may result in monetary loss. grave is beta software and may contain bugs. By using grave, you agree that the grave and 3omb team is not responsible for any financial losses from investing in grave or 3omb.
            </Alert>
            </Box>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              {/* <Button color="primary" href="/masonry" variant="contained" style={{ marginRight: '25px' }}>
                Stake Now
              </Button> */}
              {/* <Button href="/cemetery" variant="contained" style={{ marginRight: '25px' }}>
                Stake Now
              </Button> */}
              <Button color="primary" href="/farms" variant="contained" style={{ marginRight: '10px' }}>
                Farms
              </Button>
              <Button color="primary" href="/boardroom" variant="contained" style={{ marginRight: '25px' }}>
                Stake
              </Button>
              <Button
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy GRAVE
              </Button>
              {/* <Button variant="contained" target="_blank" href={buyTShareAddress} className={classes.button}>
                Buy GSHARE
              </Button> */}
              <Button variant="contained" target="_blank" href={buyTombAddress} variant="contained" style={{ marginRight: '10px' }}>
                Buy GSHARES
              </Button>
              <Button variant="contained" target="_blank" href={`https://dexscreener.com/avalanche/${tomb.address}`} variant="contained" style={{ marginRight: '10px' }}>
                GRAVE Chart
              </Button>
              <Button variant="contained" target="_blank" href={`https://dexscreener.com/avalanche/${tShare.address}`} variant="contained" style={{ marginRight: '10px' }}>
                GSHARES Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* TOMB */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>GRAVE</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInAVAX ? tombPriceInAVAX : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply-140000}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* <Grid item xs={12} sm={3}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>GRAVEp</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tombPriceInAVAX ? tombPriceInAVAX : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply-140000}
              </span>
            </CardContent>
          </Card>
        </Grid> */}

        {/* TSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>GSHARES</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tSharePriceInAVAX ? tSharePriceInAVAX : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '14px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply-balance} <br />
                Total Supply: {tShareTotalSupply-balance}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* TBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>GBOND</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{tBondPriceInAVAX ? tBondPriceInAVAX : '-.----'} AVAX</span>
              </Box>
              <Box>
                <span style={{ fontSize: '18px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              {/* <span style={{ fontSize: '14px' }}>
                Market Cap: $-.-- <br />
                Circulating Supply: ------ <br />
                Total Supply: ------
              </span> */}
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>GRAVE-WAVAX Joe LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GRAVE-AVAX-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" disabled={false} onClick={onPresentTombZap} variant="contained">
                  Zap In!
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} GRAVE /{' '}
                  {tombLPStats?.avaxAmount ? tombLPStats?.avaxAmount : '-.--'} AVAX
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>GSHARES-WAVAX Joe LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="GSHARE-AVAX-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In!
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} GSHARES /{' '}
                  {tshareLPStats?.avaxAmount ? tshareLPStats?.avaxAmount : '-.--'} AVAX
                </span>
              </Box>
              <Box style={{ fontSize: '18px' }}>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '14px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
