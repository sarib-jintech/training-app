/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/pages/loginPage';
import RegisterPage from './src/pages/registerPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ResendEmailPage from './src/pages/resendEmailPage';
import Homepage from './src/pages/homePage';
import AuctionItemPage from './src/pages/auctionItemPage';
import { UserProvider } from './src/utils/userContext';
import ChangePasswordPage from './src/pages/changePasswordPage';
import { ThemeProvider } from './src/utils/themeContext';
import BidHistory from './src/pages/bidHistory';
import InvoicesPage from './src/pages/invoicesPage';
import MyBidPage from './src/pages/myBidPage';

const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginPage,
      options: {
        headerShown: false,
      }
    },
    Register: {
      screen: RegisterPage,
      options: {
        headerTitle: "",
        headerShadowVisible: false,
        headerTintColor: '#094780',
      }
    },
    ResendEmail: {
      screen: ResendEmailPage,
      options: {
        headerTitle: "Resend Activation Email",
        headerShadowVisible: false,
        headerTintColor: '#094780',
      }
    },
    Homepage: {
      screen: Homepage,
      options: {
        headerShown: false,
      },
    },
    AuctionItem: {
      screen: AuctionItemPage,
      options: {
        headerTintColor: '#094780',
        title: "Auction Item"
      }
    },
    BidHistory: {
      screen: BidHistory,
      options: {
        headerTintColor: '#094780',
        title: "Bid History"
      }
    },
    InvoicesPage: {
      screen: InvoicesPage,
      options: {
        headerTintColor: '#094780',
        title: "My Invoices"
      }
    },
    MyBidPage: {
      screen: MyBidPage,
      options: {
        headerTintColor: '#094780',
        title: "My Bids"
      }
    },
    ChangePassword: {
      screen: ChangePasswordPage,
    },
  },
});
const Navigation = createStaticNavigation(RootStack);
const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

export default App;
