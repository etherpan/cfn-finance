import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';

interface AccountButtonProps {
  text?: string;
  onOpen?: () => void;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text, onOpen }) => {
  const { account } = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    // fixme: don't know why this closes the provider modal too.
    // onOpen && onOpen();
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const handleAccountModalOpen = () => {
    onPresentAccountModal();
    onOpen && onOpen();
  }

  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <Button onClick={handleWalletProviderOpen} color="primary" variant="contained">
          {buttonText}
        </Button>
      ) : (
        <Button variant="contained" onClick={handleAccountModalOpen}>
          My Wallet
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
