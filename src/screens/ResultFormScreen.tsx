import React from 'react';
import {
  Button,
  HelperText,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackParamList} from '../../App';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Result} from '../models/Result';
import {ERROR_MESSAGES, ExcerciseOptions, VALIDATIONS} from '../constants';
import {useRealm} from '@realm/react';
import uuid from 'react-native-uuid';

// TODO get this from the Result model?
export interface ResultData {
  sleep_hours: number;
  sleep_quality: number;
  feeling_on_wakeup: number;
  feeling_rest_of_day?: number;
  weight?: number;
  nap?: ExcerciseOptions;
  excercise?: ExcerciseOptions;
  outside?: ExcerciseOptions;
}

export interface ResultModelData extends ResultData {
  _id: string;
  happened_at: string;
}

type Props = NativeStackScreenProps<StackParamList, 'ResultFormScreen'>;

const ResultFormScreen = ({navigation}: Props) => {
  const realm = useRealm();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<ResultData>({mode: 'all', shouldUseNativeValidation: true});

  const onSubmit: SubmitHandler<ResultData> = (data: any) => {
    console.log('form data: ', data);
    const toWrite: ResultModelData = {
      _id: uuid.v4().toString(),
      happened_at: new Date().toDateString(),
      sleep_hours: parseFloat(data.sleep_hours),
      sleep_quality: parseInt(data.sleep_quality, 10),
      feeling_on_wakeup: parseInt(data.feeling_on_wakeup, 10),
      feeling_rest_of_day: parseInt(data.feeling_rest_of_day, 10),
      weight: parseFloat(data.weight),
      nap: data.nap,
      excercise: data.excercise,
      outside: data.outside,
    };
    console.log('transformed data: ', toWrite);

    realm.write(() => {
      const result = realm.create(Result, toWrite);
      console.log('saved result: ', result);
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* sleep_hours */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="sleep_hours"
          rules={{
            required: {value: true, message: ERROR_MESSAGES.REQUIRED},
            pattern: VALIDATIONS.float,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                label="Hours slept last night:"
                mode="outlined"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                error={errors.sleep_hours && true}
              />
              <HelperText type="error">
                {errors.sleep_hours?.message}
              </HelperText>
            </>
          )}
        />
        {/* sleep_quality */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="sleep_quality"
          rules={{
            required: {value: true, message: ERROR_MESSAGES.REQUIRED},
            pattern: VALIDATIONS.rating,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                label="Sleep quality last night:"
                mode="outlined"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                error={errors.sleep_quality && true}
              />
              <HelperText type="error">
                {errors.sleep_quality?.message}
              </HelperText>
            </>
          )}
        />
        {/* feeling_on_wakeup */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="feeling_on_wakeup"
          rules={{
            required: {value: true, message: ERROR_MESSAGES.REQUIRED},
            pattern: VALIDATIONS.rating,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                label="Feeling on wakeup:"
                mode="outlined"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                error={errors.feeling_on_wakeup && true}
              />
              <HelperText type="error">
                {errors.feeling_on_wakeup?.message}
              </HelperText>
            </>
          )}
        />
        {/* feeling_rest_of_day */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="feeling_rest_of_day"
          rules={{
            required: false,
            pattern: VALIDATIONS.rating,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                label="Feeling rest of day:"
                mode="outlined"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                error={errors.feeling_rest_of_day && true}
              />
              <HelperText type="error">
                {errors.feeling_rest_of_day?.message}
              </HelperText>
            </>
          )}
        />
        {/* weight */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="weight"
          rules={{
            required: false,
            pattern: VALIDATIONS.float,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextInput
                label="Weight"
                mode="outlined"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={val => onChange(val)}
                error={errors.weight && true}
              />
              <HelperText type="error">{errors.weight?.message}</HelperText>
            </>
          )}
        />
        {/* nap */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="nap"
          rules={{required: false}}
          render={({field: {onChange, value}}) => (
            <View>
              <Text variant="titleLarge">Nap?</Text>
              <RadioButton.Group
                value={value as ExcerciseOptions}
                onValueChange={val => onChange(val)}>
                {Object.entries(ExcerciseOptions).map(
                  ([key, val]: [string, string]) => {
                    return (
                      <RadioButton.Item key={key} label={val} value={key} />
                    );
                  },
                )}
              </RadioButton.Group>
            </View>
          )}
        />
        {/* excercise */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="excercise"
          rules={{required: false}}
          render={({field: {onChange, value}}) => (
            <>
              <Text variant="titleLarge">Excercise?</Text>
              <RadioButton.Group
                value={value as ExcerciseOptions}
                onValueChange={val => onChange(val)}>
                {Object.entries(ExcerciseOptions).map(
                  ([key, val]: [string, string]) => {
                    return (
                      <RadioButton.Item key={key} label={val} value={key} />
                    );
                  },
                )}
              </RadioButton.Group>
            </>
          )}
        />
        {/* outside */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="outside"
          rules={{required: false}}
          render={({field: {onChange, value}}) => (
            <>
              <Text variant="titleLarge">Outside?</Text>
              <RadioButton.Group
                value={value as ExcerciseOptions}
                onValueChange={val => {
                  // console.log(val, ExcerciseOptions[val]);
                  // setValue('outside', val as ExcerciseOptions);
                  onChange(val);
                }}>
                {Object.entries(ExcerciseOptions).map(
                  ([key, val]: [string, string]) => {
                    return (
                      <RadioButton.Item key={key} label={val} value={key} />
                    );
                  },
                )}
              </RadioButton.Group>
            </>
          )}
        />
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}>
          Submit
        </Button>
        <Button onPress={() => navigation.navigate('HomeScreen')}>
          Go Back
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', marginHorizontal: 30},
  input: {marginVertical: 5},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});

export default ResultFormScreen;
