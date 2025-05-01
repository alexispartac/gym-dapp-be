import React from 'react';
import { MantineProvider, createTheme } from '@mantine/core';
import { useCookies } from 'react-cookie';
import { Provider as JotaiProvider } from './components/ui/provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './pages/new-workout/store';
import { ModalsProvider } from '@mantine/modals';
import { ExpectedModal } from './pages/new-workout/WorkoutModals';
import RoutesOfPages from './routes';
import { SidebarDemo } from './components/NavBar';
import Authentication, { showConnectWalletModal } from './pages/auth/Authentication';
import { LoginModal } from './pages/auth/LogIn';
import { SignUpModal } from './pages/auth/SignUp';
import { CheckBalance } from './pages/solana/check-balance';
import { useUser } from './context/UserContext';
// import { UserNFT } from './pages/Wallet';
// import GetNFTs from './pages/solana/getNFTs';


const theme = createTheme({
  colors: {
    'gym-light': ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529', '#000000'],
    'gym-dark': ['#212529', '#343a40', '#495057', '#6c757d', '#adb5bd', '#ced4da', '#dee2e6', '#e9ecef', '#f8f9fa', '#ffffff'],
  },
});

function App() {
  const [cookies] = useCookies(['login']);
  const { user, setBalance, setNFT } = useUser();

  React.useEffect(() => {
    async function connectWallet() {
      await (window as any).solana.connect();
    }
    if (cookies.login) {
      connectWallet().finally(() =>{
        if(!(window as any).solana.isConnected){
          showConnectWalletModal();
        }
      });
      user.userInfo = cookies.login.userInfo;
      user.isAuthenticated = true;
    }
  }, [cookies.login, user]);

  React.useEffect(() => {
    if (user.userInfo) {
      CheckBalance({ pubkey: user.userInfo.publicKey }).then((balance: number) => {
        setBalance(balance);
      }).catch(() => alert('Connect to the internet!'));

      // adauga asta in blockchain
      // GetNFTs({ pubkey: user.userInfo.publicKey }).then((NFTs: UserNFT[] | undefined) => {
      //   if (NFTs && NFTs.length > 0) {
      //     setNFT([NFTs[0]]); 
      //   } else {
      //     setNFT([]);
      //   }
      // }).catch(() => console.error('Connect to the internet!'));
    }
  }, [setBalance, setNFT, user.userInfo]);

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider modals={{ login: LoginModal, signup: SignUpModal, expected: ExpectedModal }} labels={{ confirm: 'Confirm', cancel: 'Cancel' }}>
        <JotaiProvider>
          <ReduxProvider store={store}>
            <div>
              {
                user.isAuthenticated ?
                  <>
                    <SidebarDemo >
                      <RoutesOfPages />
                    </SidebarDemo>
                  </> :
                  <Authentication />
              }
            </div>
          </ReduxProvider>
        </JotaiProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
