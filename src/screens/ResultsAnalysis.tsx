import React, {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
// import type {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {StackParamList} from '../../App';
import {ScrollView, View} from 'react-native';
// import {queryResults} from '../db';
import {ResultT} from './ResultFormScreen';
import {queryResults} from '../db';

// type Props = NativeStackScreenProps<StackParamList, 'ResultsAnalysis'>;

const ResultsAnalysis = () => {
  // const [results, setResults] = useState<any[]>([]);
  // useEffect(() => {
    const results = queryResults();
      // .then((data: any) => {
        // setResults(data);
      // })
      // .catch(error => console.log(error));
  // }, []);
  // let result = {};
  console.log('---results: ', results);

  return (
    <ScrollView>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Sleep Hours</DataTable.Title>
            <DataTable.Title numeric>Sleep Quality</DataTable.Title>
            <DataTable.Title numeric>Rest of Day</DataTable.Title>
            <DataTable.Title numeric>Weight</DataTable.Title>
            <DataTable.Title>Nap?</DataTable.Title>
            <DataTable.Title>Excercise?</DataTable.Title>
            <DataTable.Title>Outside?</DataTable.Title>
          </DataTable.Header>

          {results &&
            results.map((result: ResultT) => {
              return (
                <DataTable.Row key={result.id}>
                  <DataTable.Cell>{result.happened_at}</DataTable.Cell>
                  <DataTable.Cell numeric>{result.sleep_hours}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {result.sleep_quality}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {result.feeling_on_wakeup}
                  </DataTable.Cell>
                  <DataTable.Cell>{result.feeling_rest_of_day}</DataTable.Cell>
                  <DataTable.Cell>{result.weight}</DataTable.Cell>
                  <DataTable.Cell>{result.nap}</DataTable.Cell>
                  <DataTable.Cell>{result.excercise}</DataTable.Cell>
                  <DataTable.Cell>{result.outside}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </View>
    </ScrollView>
  );
};

export default ResultsAnalysis;
