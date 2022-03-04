import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import { tomb , tShare } from '../../tomb-finance/deployments/deployments.mainnet.json';
import TokenSymbol from '../../components/TokenSymbol';
import ProgressCountdown from './ProgressCountdown';
import useStatsForPool from '../../hooks/useStatsForPool';

const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  let getDepositTokenLink;
  if(bank.depositTokenName.endsWith('LP')) {
    if(bank.depositTokenName.includes('CFN')) {
      getDepositTokenLink = 'https://traderjoexyz.com/pool/AVAX/' + tomb?.address;
    } else {
      getDepositTokenLink = 'https://traderjoexyz.com/pool/AVAX/' + tShare?.address;
    }
  } else {
    getDepositTokenLink = 'https://traderjoexyz.com/trade?outputCurrency=' + bank.depositToken.address;
  }
  return (
    <Grid item xs={12} md={4} lg={4}>
		 <Card variant="outlined" style={{ border: '1px solid var(--white)' }}>
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'transparent',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={40} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            {Date.now() >= new Date(bank.starttime).getTime() ? null : 
            <div style={{display:'flex'}}>Starts In: <ProgressCountdown color="#00bcd4" base={moment().toDate()} hideBar={true} deadline={new Date(bank.starttime)} description="start pool" /></div> }
            <Typography color="textSecondary">
              {/* {bank.name} */}
              Deposit: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.depositTokenName.toUpperCase()}</span>
            </Typography>
              {/* Commenting out for now as it seems to be blocking and site doesnt load properly */}
             <Typography color="textSecondary">
             Earn: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.earnTokenName.toUpperCase()} </span>
            </Typography>
            <Typography color="textSecondary">
              Daily APR: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.closedForStaking || bank.genesisFinished ? '0.00' : statsOnPool?.dailyAPR}%</span>
            </Typography>
            {!bank.depositTokenName.endsWith('LP') && 
              <Typography color="textSecondary">
                Deposit Fee: <span style={{color: '#00bcd4', fontWeight:'700'}}>1%</span>
              </Typography>
            }
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <a style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href={getDepositTokenLink} >
          <Button color="primary" size="small" variant="contained">
            {bank.depositTokenName.endsWith('LP') ? 'Add LP' : 'Buy'}
          </Button>
          </a>
          <Button color="primary" size="small" variant="contained" disabled={Date.now() <= new Date(bank.starttime).getTime()} component={Link} to={`/farms/${bank.contract}`}>
            Stake
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
