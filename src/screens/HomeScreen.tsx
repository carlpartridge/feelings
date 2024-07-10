import React from 'react';
import {Button} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../App';

type Props = NativeStackScreenProps<StackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <Button onPress={() => navigation.navigate('ResultFormScreen', {})}>
        Add Result
      </Button>
      <Button onPress={() => navigation.navigate('ResultsAnalysis')}>
        See Results
      </Button>
    </>
  );
};

export default HomeScreen;
