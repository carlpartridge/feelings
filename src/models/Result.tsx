import {ObjectSchema} from 'realm';
import {ExerciseOptions} from '../constants';

export class Result extends Realm.Object<Result> {
  _id!: string;
  happened_at!: string;
  sleep_hours!: number;
  sleep_quality!: number;
  feeling_on_wakeup!: number;
  feeling_rest_of_day?: number | null;
  weight?: number | null;
  nap?: ExerciseOptions | null;
  exercise?: ExerciseOptions | null;
  outside?: ExerciseOptions | null;

  static schema: ObjectSchema = {
    name: 'Result',
    properties: {
      _id: 'string',
      happened_at: 'date',
      sleep_hours: 'float',
      sleep_quality: 'int',
      feeling_on_wakeup: 'int',
      feeling_rest_of_day: {type: 'int', optional: true},
      weight: {type: 'float', optional: true},
      nap: {type: 'string', optional: true},
      exercise: {type: 'string', optional: true},
      outside: {type: 'string', optional: true},
    },
    primaryKey: '_id',
  };
}
