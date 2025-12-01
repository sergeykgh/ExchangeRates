import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { ExchangeRate } from '../types/exchangeRates';

interface Props {
  route: { params?: { rates: ExchangeRate[] } };
}

export const ConversionScreen: React.FC<Props> = ({ route }) => {
  const { rates = [] } = route.params || {};
  const [czkAmount, setCzkAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(rates[0]?.code || 'USD');
  const navigation = useNavigation<any>();

  const czkNum = parseFloat(czkAmount) || 0;
  const selectedRate = rates.find((r) => r.code === selectedCurrency);
  const converted = selectedRate ? (czkNum / selectedRate.rate).toFixed(4) : '0.0000';

  if (rates.length === 0) {
    return (
      <Container>
        <ErrorText>No rates available. <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: 'blue' }}>Go back</Text></TouchableOpacity></ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <View style={closeButtonStyle.container}>
        <TouchableOpacity style={closeButtonStyle.button} onPress={() => navigation.goBack()}>
          <Text style={closeButtonStyle.text}>Close</Text> }
        </TouchableOpacity>
      </View>

      <Title>Currency Converter</Title>
      <InputGroup>
        <Label>Amount in CZK:</Label>
        <AmountInput
          keyboardType="numeric"
          value={czkAmount}
          onChangeText={setCzkAmount}
          placeholder="Enter amount..."
        />
      </InputGroup>
      <InputGroup>
        <Label>To Currency:</Label>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={setSelectedCurrency}
          style={{ backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' }}
        >
          {rates.map((rate) => (
            <Picker.Item key={rate.code} label={`${rate.code} (${rate.currency})`} value={rate.code} />
          ))}
        </Picker>
      </InputGroup>
      <ResultText>{czkNum > 0 ? `${converted} ${selectedCurrency}` : 'Enter amount to convert'}</ResultText>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 14px;
  margin-bottom: 20px;
  color: #333;
`;

const InputGroup = styled.View`
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  margin-bottom: 8px;
  color: #333;
`;

const AmountInput = styled.TextInput`
  background-color: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 18px;
`;

const ResultText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
`;

const ErrorText = styled.Text`
  text-align: center;
  color: red;
  margin-top: 10px;
`;


const closeButtonStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});