import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import HomeImage from '../../assets/img/background.png';
import useLpStats from '../../hooks/useLpStats';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import useTombStats from '../../hooks/useTombStats';
import TokenInput from '../../components/TokenInput';
import useTombFinance from '../../hooks/useTombFinance';
import { useWallet } from 'use-wallet';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import useApproveTaxOffice from '../../hooks/useApproveTaxOffice';
import { ApprovalState } from '../../hooks/useApprove';
import useProvideTombAvaxLP from '../../hooks/useProvideTombAvaxLP';
import { Alert } from '@material-ui/lab';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const ProvideLiquidity = () => {
  const [tombAmount, setTombAmount] = useState(0);
  const [avaxAmount, setAvaxAmount] = useState(0);
  const [lpTokensAmount, setLpTokensAmount] = useState(0);
  const { balance } = useWallet();
  const tombStats = useTombStats();
  const tombFinance = useTombFinance();
  const [approveTaxOfficeStatus, approveTaxOffice] = useApproveTaxOffice();
  const tombBalance = useTokenBalance(tombFinance.TOMB);
  const avaxBalance = (balance / 1e18).toFixed(4);
  const { onProvideTombAvaxLP } = useProvideTombAvaxLP();
  const tombAvaxLpStats = useLpStats('CFN-AVAX-LP');

  const tombLPStats = useMemo(() => (tombAvaxLpStats ? tombAvaxLpStats : null), [tombAvaxLpStats]);
  const tombPriceInAVAX = useMemo(() => (tombStats ? Number(tombStats.tokenInAvax).toFixed(2) : null), [tombStats]);
  const avaxPriceInTOMB = useMemo(() => (tombStats ? Number(1 / tombStats.tokenInAvax).toFixed(2) : null), [tombStats]);
  // const classes = useStyles();

  const handleTombChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setTombAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setTombAmount(e.currentTarget.value);
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(e.currentTarget.value, 'TOMB');
    setAvaxAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / tombLPStats.avaxAmount);
  };

  const handleAvaxChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setAvaxAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setAvaxAmount(e.currentTarget.value);
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(e.currentTarget.value, 'AVAX');
    setTombAmount(quoteFromSpooky);

    setLpTokensAmount(quoteFromSpooky / tombLPStats.tokenAmount);
  };
  const handleTombSelectMax = async () => {
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(getDisplayBalance(tombBalance), 'TOMB');
    setTombAmount(getDisplayBalance(tombBalance));
    setAvaxAmount(quoteFromSpooky);
    setLpTokensAmount(quoteFromSpooky / tombLPStats.avaxAmount);
  };
  const handleAvaxSelectMax = async () => {
    const quoteFromSpooky = await tombFinance.quoteFromSpooky(avaxBalance, 'AVAX');
    setAvaxAmount(avaxBalance);
    setTombAmount(quoteFromSpooky);
    setLpTokensAmount(avaxBalance / tombLPStats.avaxAmount);
  };
  return (
    <Page>
      <BackgroundImage />
      <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
        Provide Liquidity
      </Typography>

      <Grid container justifyContent="center">
        <Box style={{ width: '600px' }}>
          <Alert variant="filled" severity="warning" style={{ marginBottom: '10px' }}>
            <b>This and <a href="https://spookyswap.finance/"  rel="noopener noreferrer" target="_blank">Spookyswap</a> are the only ways to provide Liquidity on TOMB-AVAX pair without paying tax.</b>
          </Alert>
          <Grid item xs={12} sm={12}>
            <Paper>
              <Box mt={4}>
                <Grid item xs={12} sm={12} style={{ borderRadius: 15 }}>
                  <Box p={4}>
                    <Grid container>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleTombSelectMax}
                          onChange={handleTombChange}
                          value={tombAmount}
                          max={getDisplayBalance(tombBalance)}
                          symbol={'TOMB'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <TokenInput
                          onSelectMax={handleAvaxSelectMax}
                          onChange={handleAvaxChange}
                          value={avaxAmount}
                          max={avaxBalance}
                          symbol={'AVAX'}
                        ></TokenInput>
                      </Grid>
                      <Grid item xs={12}>
                        <p>1 TOMB = {tombPriceInAVAX} AVAX</p>
                        <p>1 AVAX = {avaxPriceInTOMB} TOMB</p>
                        <p>LP tokens ≈ {lpTokensAmount.toFixed(2)}</p>
                      </Grid>
                      <Grid xs={12} justifyContent="center" style={{ textAlign: 'center' }}>
                        {approveTaxOfficeStatus === ApprovalState.APPROVED ? (
                          <Button
                            variant="contained"
                            onClick={() => onProvideTombAvaxLP(avaxAmount.toString(), tombAmount.toString())}
                            color="primary"
                            style={{ margin: '0 10px', color: '#fff' }}
                          >
                            Supply
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => approveTaxOffice()}
                            color="secondary"
                            style={{ margin: '0 10px' }}
                          >
                            Approve
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Grid>
    </Page>
  );
};

export default ProvideLiquidity;
