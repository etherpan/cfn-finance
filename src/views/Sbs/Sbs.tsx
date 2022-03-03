import React, { /*useCallback, useEffect, */useMemo, useState } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/background.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import { Box,/* Paper, Typography,*/ Button, Grid } from '@material-ui/core';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useTombFinance from '../../hooks/useTombFinance';
import { getDisplayBalance/*, getBalance*/ } from '../../utils/formatBalance';
import { BigNumber/*, ethers*/ } from 'ethers';
import useSwapTBondToTShare from '../../hooks/TShareSwapper/useSwapTBondToTShare';
import useApprove, { ApprovalState } from '../../hooks/useApprove';
import useTShareSwapperStats from '../../hooks/TShareSwapper/useTShareSwapperStats';
import TokenInput from '../../components/TokenInput';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import TokenSymbol from '../../components/TokenSymbol';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Sbs: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const [tbondAmount, setTbondAmount] = useState('');
  const [tshareAmount, setTshareAmount] = useState('');

  const [approveStatus, approve] = useApprove(tombFinance.TBOND, tombFinance.contracts.TShareSwapper.address);
  const { onSwapTShare } = useSwapTBondToTShare();
  const tshareSwapperStat = useTShareSwapperStats(account);

  const tshareBalance = useMemo(() => (tshareSwapperStat ? Number(tshareSwapperStat.tshareBalance) : 0), [tshareSwapperStat]);
  const bondBalance = useMemo(() => (tshareSwapperStat ? Number(tshareSwapperStat.tbondBalance) : 0), [tshareSwapperStat]);

  const handleTBondChange = async (e: any) => {
    if (e.currentTarget.value === '') {
      setTbondAmount('');
      setTshareAmount('');
      return
    }
    if (!isNumeric(e.currentTarget.value)) return;
    setTbondAmount(e.currentTarget.value);
    const updateTShareAmount = await tombFinance.estimateAmountOfTShare(e.currentTarget.value);
    setTshareAmount(updateTShareAmount);  
  };

  const handleTBondSelectMax = async () => {
    setTbondAmount(String(bondBalance));
    const updateTShareAmount = await tombFinance.estimateAmountOfTShare(String(bondBalance));
    setTshareAmount(updateTShareAmount); 
  };

  const handleTShareSelectMax = async () => {
    setTshareAmount(String(tshareBalance));
    const rateTSharePerTomb = (await tombFinance.getTShareSwapperStat(account)).rateTSharePerTomb;
    const updateTBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateTSharePerTomb))).mul(Number(tshareBalance) * 1e6);
    setTbondAmount(getDisplayBalance(updateTBondAmount, 18, 6));
  };

  const handleTShareChange = async (e: any) => {
    const inputData = e.currentTarget.value;
    if (inputData === '') {
      setTshareAmount('');
      setTbondAmount('');
      return
    }
    if (!isNumeric(inputData)) return;
    setTshareAmount(inputData);
    const rateTSharePerTomb = (await tombFinance.getTShareSwapperStat(account)).rateTSharePerTomb;
    const updateTBondAmount = ((BigNumber.from(10).pow(30)).div(BigNumber.from(rateTSharePerTomb))).mul(Number(inputData) * 1e6);
    setTbondAmount(getDisplayBalance(updateTBondAmount, 18, 6));
  }

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="TBond -> TShare Swap" subtitle="Swap TBond to TShare" />
            </Route>
            <Box mt={5}>
              <Grid container justify="center" spacing={6}>
                <StyledBoardroom>
                  <StyledCardsWrapper>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>TBonds</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={tombFinance.TBOND.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleTBondSelectMax}
                                onChange={handleTBondChange}
                                value={tbondAmount}
                                max={bondBalance}
                                symbol="TBond"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${bondBalance} TBOND Available in Wallet`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
                    </StyledCardWrapper>
                    <Spacer size="lg"/>
                    <StyledCardWrapper>
                      <Card>
                        <CardContent>
                          <StyledCardContentInner>
                            <StyledCardTitle>TShare</StyledCardTitle>
                            <StyledExchanger>
                              <StyledToken>
                                <StyledCardIcon>
                                  <TokenSymbol symbol={tombFinance.TSHARE.symbol} size={54} />
                                </StyledCardIcon>
                              </StyledToken>
                            </StyledExchanger>
                            <Grid item xs={12}>
                              <TokenInput
                                onSelectMax={handleTShareSelectMax}
                                onChange={handleTShareChange}
                                value={tshareAmount}
                                max={tshareBalance}
                                symbol="CSHARE"
                              ></TokenInput>
                            </Grid>
                            <StyledDesc>{`${tshareBalance} TSHARE Available in Swapper`}</StyledDesc>
                          </StyledCardContentInner>
                        </CardContent>
                      </Card>
              
                    </StyledCardWrapper>
                  </StyledCardsWrapper>
                </StyledBoardroom>
              </Grid>
            </Box>

            <Box mt={5}>
              <Grid container justify="center">
                <Grid item xs={8}>
                  <Card>
                    <CardContent>
                      <StyledApproveWrapper>
                      {approveStatus !== ApprovalState.APPROVED ? (
                        <Button
                          disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                          color="primary"
                          variant="contained"
                          onClick={approve}
                          size="medium"
                        >
                          Approve TBOND
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => onSwapTShare(tbondAmount.toString())}
                          size="medium"
                        >
                          Swap
                        </Button>
                      )}
                      </StyledApproveWrapper>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

const StyledBoardroom = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledApproveWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;
const StyledCardTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  background-color: ${(props) => props.theme.color.grey[900]};
  width: 72px;
  height: 72px;
  border-radius: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDesc = styled.span``;

export default Sbs;
