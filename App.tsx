import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ExchangeRatesList } from './src/components/ExchangeRatesList';
import { ConversionScreen } from './src/components/ConversionScreen';
import { ExchangeRate } from './src/types/exchangeRates';
import { useExchangeRates } from './src/hooks/useExchangeRates';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

const AppContent: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const { data, isLoading, error } = useExchangeRates();

  React.useEffect(() => {
    if (data) setRates(data);
  }, [data]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Rates">
              {(props) => <ExchangeRatesList {...props} rates={rates} isLoading={isLoading} error={error} />}
            </Stack.Screen>
            <Stack.Screen name="Conversion" component={ConversionScreen} options={{ presentation: 'modal' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
