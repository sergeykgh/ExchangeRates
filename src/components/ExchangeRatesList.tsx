import React from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { ExchangeRate } from '../types/exchangeRates';

export const ExchangeRatesList: React.FC = () => {
  const { data, isLoading, error } = useExchangeRates();

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading exchange rates...</Text>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>Error: {(error as Error).message}</ErrorText>
      </Container>
    );
  }

  const renderItem = ({ item }: { item: ExchangeRate }) => (
    <ItemContainer>
      <CurrencyInfo>
        <CurrencyText>{item.code} ({item.currency})</CurrencyText>
        <CountryText>{item.country}</CountryText>
        <AmountText>Amount: {item.amount}</AmountText>
      </CurrencyInfo>
      <RateText>{item.rate.toFixed(3)} CZK</RateText>
    </ItemContainer>
  );

  return (
    <Container>
      <Header>Daily Exchange Rates (CNB)</Header>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item.code}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 16px;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
`;

const ItemContainer = styled.View`
  background-color: white;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CurrencyInfo = styled.View`
  flex: 1;
`;

const CurrencyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const CountryText = styled.Text`
  font-size: 16px;
  color: #555;
  margin-top: 4px;
`;

const RateText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
`;

const AmountText = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 2px;
`;

const ErrorText = styled.Text`
  text-align: center;
  color: red;
  font-size: 16px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
