import React from 'react';
import {DataTable} from 'react-native-paper';
import {ScrollView, View} from 'react-native';
import {useQuery} from '@realm/react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../App';

type Props = NativeStackScreenProps<StackParamList, 'ResultsAnalysis'>;

const ResultsAnalysis = ({navigation}: Props) => {
  const data = useQuery('Result', (results: any): any => {
    return results.sorted('happened_at');
  });

  return (
    <ScrollView>
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title numeric>Sleep Hours</DataTable.Title>
            <DataTable.Title numeric>Sleep Quality</DataTable.Title>
            <DataTable.Title numeric>Wake Up</DataTable.Title>
            <DataTable.Title numeric>Rest of Day</DataTable.Title>
            <DataTable.Title numeric>Weight</DataTable.Title>
            <DataTable.Title>Nap?</DataTable.Title>
            <DataTable.Title>Excercise?</DataTable.Title>
            <DataTable.Title>Outside?</DataTable.Title>
          </DataTable.Header>

          {data &&
            data.map((result: any) => {
              return (
                <DataTable.Row key={result._id}>
                  <DataTable.Cell
                    onPress={() =>
                      navigation.navigate('ResultFormScreen', {
                        resultId: result._id,
                      })
                    }>
                    {result.happened_at.toString()}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{result.sleep_hours}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {result.sleep_quality}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {result.feeling_on_wakeup}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {result.feeling_rest_of_day}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{result.weight}</DataTable.Cell>
                  <DataTable.Cell>{result.nap}</DataTable.Cell>
                  <DataTable.Cell>{result.exercise}</DataTable.Cell>
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
