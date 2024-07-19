import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
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

  console.log(state);

  return (
    <SafeAreaView style={styles.container}>
      {/* Status bar here */}

      <View
        style={{
          flex: 0.2,
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

      <View style={{flex: 0.8, justifyContent: 'flex-end'}}>
        <Text style={styles.value}>
          {state?.expression === state.displayValue ? '' : state?.expression}
        </Text>

        <Text style={styles.value}>{state.displayValue}</Text>
        {/* Create component Row */}
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
        {/* Number */}
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
        </Row>
      </View>
    </SafeAreaView>
  );
};

// create styles of app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
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
