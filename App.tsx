import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type StackParamList = {
  HomeScreen: undefined;
  ResultFormScreen: undefined;
  ResultsAnalysis: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

import HomeScreen from './src/screens/HomeScreen';
import ResultFormScreen from './src/screens/ResultFormScreen';
import ResultsAnalysis from './src/screens/ResultsAnalysis';

function App(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Feelings!'}}
      />
      <Stack.Screen name="ResultFormScreen" component={ResultFormScreen} />
      <Stack.Screen name="ResultsAnalysis" component={ResultsAnalysis} />
    </Stack.Navigator>
  );
}

export default App;
