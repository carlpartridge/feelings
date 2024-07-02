import {ObjectSchema} from 'realm';
import {ExcerciseOptions} from '../constants';

export class Result extends Realm.Object<Result> {
  _id!: string;
  happened_at!: string;
  sleep_hours!: number;
  sleep_quality!: number;
  feeling_on_wakeup!: number;
  feeling_rest_of_day?: number;
  weight?: number;
  nap?: ExcerciseOptions;
  excercise?: ExcerciseOptions;
  outside?: ExcerciseOptions;

  static schema: ObjectSchema = {
    name: 'Result',
    properties: {
      _id: 'string',
      happened_at: 'date',
      sleep_hours: 'float',
      sleep_quality: 'int',
      feeling_on_wakeup: 'int',
      feeling_rest_of_day: 'int',
      weight: 'float',
      nap: 'string',
      excercise: 'string',
      outside: 'string',
    },
    primaryKey: '_id',
  };
}
