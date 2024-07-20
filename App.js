import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Button from './src/components/Button';
import Row from './src/components/Row';
import calculator, {initialState} from './util/calculator';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

// create functional component of App
const App = () => {
  const [state, setState] = useState(initialState);

  // handle tap method
  const handleTap = (type, value) => {
    setState(state => calculator(type, value, state));
  };

  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [funaction, setFunaction] = useState(null);

  const calculate = (one, two, funact) => {
    let data = null;
    const num1 = Number(one);
    const num2 = Number(two);

    switch (funact) {
      case 'Add':
        data = num1 + num2;
        break;
      case 'Subtract':
        data = num1 - num2;
        break;
      case 'Multiply':
        data = num1 * num2;
        break;
      case 'Divide':
        if (num2 !== 0) {
          data = num1 / num2;
        } else {
          data = 'Error: Division by zero';
        }
        break;
      default:
        data = 'Error: Invalid operation';
    }

    setResult(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar here */}

      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          source={require('./src/assets/icon_png/logo.png')}
          style={{
            width: WIDTH * 0.3,
            height: HEIGHT * 0.04,
            marginTop: 25,
            marginStart: 15,
          }}
        />

        <Image
          source={require('./src/assets/icon_png/user.png')}
          style={{
            width: 40,
            height: 40,
            marginTop: 20,
            marginRight: 15,
          }}
        />
      </View>

      <ScrollView keyboardShouldPersistTaps={'handled'} style={{flex: 0.9}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              marginTop: 50,
              borderWidth: 1,
              borderColor: '#000',
              paddingHorizontal: WIDTH * 0.22,
              borderRadius: 10,
            }}
            keyboardType="numeric"
            textAlign="center"
            placeholder="Please Enter First Operand"
            value={firstNumber}
            onChangeText={data => setFirstNumber(data)}
          />
          <TextInput
            style={{
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#000',
              paddingHorizontal: WIDTH * 0.2,
              borderRadius: 10,
            }}
            value={secondNumber}
            textAlign="center"
            keyboardType="numeric"
            placeholder="Please Enter Second Operand"
            onChangeText={data => setSecondNumber(data)}
          />
        </View>

        <View style={{alignItems: 'center', marginVertical: 30}}>
          <Text style={{color: '#000'}}>
            {result === null ? '' : `Your Result is : ${result}`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              firstNumber === null ||
              secondNumber === null ||
              firstNumber === '' ||
              secondNumber === ''
                ? ToastAndroid.show(
                    'Please Enter First and Second operand',
                    ToastAndroid.LONG,
                  )
                : setFunaction('Add');
            }}>
            <Text
              style={{
                color: funaction === 'Add' ? '#000' : '#fff',
                backgroundColor: funaction === 'Add' ? '#E8FFDB' : '#7B82EA',
                fontWeight: 'bold',
                paddingHorizontal: WIDTH * 0.15,
                paddingVertical: 8,
                borderRadius: 5,
              }}>{`Add ( + )`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              firstNumber === null ||
              secondNumber === null ||
              firstNumber === '' ||
              secondNumber === ''
                ? ToastAndroid.show(
                    'Please Enter First and Second operand',
                    ToastAndroid.LONG,
                  )
                : setFunaction('Subtract');
            }}>
            <Text
              style={{
                color: funaction === 'Subtract' ? '#000' : '#fff',
                backgroundColor:
                  funaction === 'Subtract' ? '#E8FFDB' : '#7B82EA',
                fontWeight: 'bold',
                paddingHorizontal: WIDTH * 0.1,
                paddingVertical: 8,
                borderRadius: 5,
              }}>{`Subtract ( - )`}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 25,
          }}>
          <TouchableOpacity
            onPress={() => {
              firstNumber === null ||
              secondNumber === null ||
              firstNumber === '' ||
              secondNumber === ''
                ? ToastAndroid.show(
                    'Please Enter First and Second operand',
                    ToastAndroid.LONG,
                  )
                : setFunaction('Multiply');
            }}>
            <Text
              style={{
                color: funaction === 'Multiply' ? '#000' : '#fff',
                backgroundColor:
                  funaction === 'Multiply' ? '#E8FFDB' : '#7B82EA',
                fontWeight: 'bold',
                paddingHorizontal: WIDTH * 0.12,
                paddingVertical: 8,
                borderRadius: 5,
              }}>{`Multiply ( * )`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              firstNumber === null ||
              secondNumber === null ||
              firstNumber === '' ||
              secondNumber === ''
                ? ToastAndroid.show(
                    'Please Enter First and Second operand',
                    ToastAndroid.LONG,
                  )
                : setFunaction('Divide');
            }}>
            <Text
              style={{
                color: funaction === 'Divide' ? '#000' : '#fff',
                backgroundColor: funaction === 'Divide' ? '#E8FFDB' : '#7B82EA',
                fontWeight: 'bold',
                paddingHorizontal: WIDTH * 0.12,
                paddingVertical: 8,
                borderRadius: 5,
              }}>{`Divide ( / )`}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 25,
          }}>
          {funaction === null ||
          firstNumber === null ||
          secondNumber === null ||
          firstNumber === '' ||
          secondNumber === '' ? (
            <TouchableOpacity
              onPress={() =>
                ToastAndroid.show(
                  'Please Enter First and Second operand and select Operand',
                  ToastAndroid.LONG,
                )
              }>
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: '#A2A2A2',
                  fontWeight: 'bold',
                  paddingHorizontal: WIDTH * 0.2,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                calculate(firstNumber, secondNumber, funaction);
              }}>
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: '#00A3FF',
                  fontWeight: 'bold',
                  paddingHorizontal: WIDTH * 0.2,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* <Text style={styles.value}>
          {state?.expression === state.displayValue ? '' : state?.expression}
        </Text>

        <Text style={styles.value}>{state.displayValue}</Text>
        {/* Create component Row
        <Row>
          <Button
            text="C"
            theme="secondary"
            onPress={() => handleTap('clear')}
          />

          <Button
            text="+/-"
            theme="secondary"
            onPress={() => handleTap('posneg')}
          />

          <Button
            text="%"
            theme="secondary"
            onPress={() => handleTap('percentage')}
          />

          <Button
            text="/"
            theme="accent"
            onPress={() => handleTap('operator', '/')}
          />
        </Row>
 
        <Row>
          <Button text="7" onPress={() => handleTap('number', 7)} />
          <Button text="8" onPress={() => handleTap('number', 8)} />
          <Button text="9" onPress={() => handleTap('number', 9)} />
          <Button
            text="X"
            theme="accent"
            onPress={() => handleTap('operator', '*')}
          />
        </Row>
        <Row>
          <Button text="4" onPress={() => handleTap('number', 4)} />
          <Button text="5" onPress={() => handleTap('number', 5)} />
          <Button text="6" onPress={() => handleTap('number', 6)} />
          <Button
            text="-"
            theme="accent"
            onPress={() => handleTap('operator', '-')}
          />
        </Row>
        <Row>
          <Button text="1" onPress={() => handleTap('number', 1)} />
          <Button text="2" onPress={() => handleTap('number', 2)} />
          <Button text="3" onPress={() => handleTap('number', 3)} />
          <Button
            text="+"
            theme="accent"
            onPress={() => handleTap('operator', '+')}
          />
        </Row>
        <Row>
          <Button text="0" onPress={() => handleTap('number', 0)} />
          <Button text="." onPress={() => handleTap('number', '.')} />
          <Button text="=" theme="primary" onPress={() => handleTap('equal')} />
        </Row> */}
      </ScrollView>
    </SafeAreaView>
  );
};

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-end',
  },
  value: {
    color: '#fff',
    fontSize: 42,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});

export default App;
