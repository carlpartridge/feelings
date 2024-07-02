// import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm';

// @Entity()
// export class Result extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   happened_at: string;

//   @Column()
//   sleep_hours: number;

//   @Column()
//   sleep_quality: number;

//   @Column()
//   feeling_on_wakeup: number;

//   @Column()
//   feeling_rest_of_day: number;

//   @Column()
//   weight: string;

//   @Column()
//   nap: string;

//   @Column()
//   excercise: string;

//   @Column()
//   outside: string;
// }

// import SQLite from 'react-native-sqlite-storage';
// import {BaseModel, types} from 'react-native-sqlite-orm';

// const DB_NAME = 'feelings-dev.db';

// export default class Result extends BaseModel {
//   constructor(obj: any) {
//     super(obj);
//   }

//   static get database() {
//     return async () => SQLite.openDatabase({name: DB_NAME});
//   }

//   static get tableName() {
//     return 'results';
//   }

//   static get columnMapping() {
//     return {
//       id: {type: types.INTEGER, primary_key: true},
//       happened_at: {type: types.DATETIME, default: () => Date.now()},
//       sleep_hours: {type: types.FLOAT},
//       sleep_quality: {type: types.INTEGER},
//       feeling_on_wakeup: {type: types.INTEGER},
//       feeling_rest_of_day: {type: types.INTEGER},
//       weight: {type: types.FLOAT},
//       nap: {type: types.TEXT},
//       excercise: {type: types.TEXT},
//       outside: {type: types.TEXT},
//     };
//   }
// }
