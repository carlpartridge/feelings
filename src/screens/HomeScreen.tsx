import React from 'react';
import {Button} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../App';
import {wipeDB, setupDB} from '../db';

type Props = NativeStackScreenProps<StackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  return (
    <>
      <Button onPress={() => navigation.navigate('ResultFormScreen')}>
        Add Result
      </Button>
      <Button onPress={() => wipeDB()}>Wipe DB</Button>
      <Button onPress={() => setupDB()}>Setup DB</Button>
      <Button onPress={() => navigation.navigate('ResultsAnalysis')}>
        See Results
      </Button>
    </>
  );
};

export default HomeScreen;
