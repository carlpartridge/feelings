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
import {ERROR_MESSAGES, ExerciseOptions, VALIDATIONS} from '../constants';
import {useRealm} from '@realm/react';
import uuid from 'react-native-uuid';

// TODO how to get this from the Result model?
export interface ResultFormData {
  sleep_hours: string;
  sleep_quality: string;
  feeling_on_wakeup: string;
  feeling_rest_of_day?: string;
  weight?: string;
  nap?: ExerciseOptions;
  exercise?: ExerciseOptions;
  outside?: ExerciseOptions;
}

// TODO theres gotta be a better way to do this?
export interface ResultModelData {
  _id: string;
  happened_at: string;
  sleep_hours: number;
  sleep_quality: number;
  feeling_on_wakeup: number;
  feeling_rest_of_day?: number | null;
  weight?: number | null;
  nap?: ExerciseOptions;
  exercise?: ExerciseOptions;
  outside?: ExerciseOptions;
}

type Props = NativeStackScreenProps<StackParamList, 'ResultFormScreen'>;

const ResultFormScreen = ({route, navigation}: Props) => {
  const realm = useRealm();

  const {result} = route?.params;
  console.log('result: ', result);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<ResultFormData>({
    mode: 'all',
    shouldUseNativeValidation: true,
    defaultValues: result ? result : {},
  });

  // const getResult: ResultModelData | Record<string, any> = (id: string) => {
  //   if (!id) {
  //     return {};
  //   }
  //   useObject(Result, id);
  // };

  const onSubmit: SubmitHandler<ResultFormData> = (data: any) => {
    const toWrite: ResultModelData = {
      _id: uuid.v4().toString(),
      happened_at: new Date().toDateString(),
      sleep_hours: parseFloat(data.sleep_hours),
      sleep_quality: parseInt(data.sleep_quality, 10),
      feeling_on_wakeup: parseInt(data.feeling_on_wakeup, 10),
      feeling_rest_of_day: data.feeling_rest_of_day
        ? parseInt(data.feeling_rest_of_day, 10)
        : null,
      weight: data.weight ? parseFloat(data.weight) : null,
      nap: data.nap ? data.nap : null,
      exercise: data.exercise ? data.exercise : null,
      outside: data.outside ? data.outside : null,
    };

    realm.write(() => {
      realm.create(Result, toWrite);
    });

    navigation.navigate('HomeScreen');
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
                value={value as ExerciseOptions}
                onValueChange={val => onChange(val)}>
                {Object.entries(ExerciseOptions).map(
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
        {/* exercise */}
        <Controller
          control={control}
          defaultValue={undefined}
          name="exercise"
          rules={{required: false}}
          render={({field: {onChange, value}}) => (
            <>
              <Text variant="titleLarge">Exercise?</Text>
              <RadioButton.Group
                value={value as ExerciseOptions}
                onValueChange={val => onChange(val)}>
                {Object.entries(ExerciseOptions).map(
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
                value={value as ExerciseOptions}
                onValueChange={val => {
                  onChange(val);
                }}>
                {Object.entries(ExerciseOptions).map(
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
