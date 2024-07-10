// import {useQuery} from '@realm/react';

// export const createResult = (data: Result) => {

// };

// export const queryResults = () => {
//   useQuery('Result', (results: any): any => {
//     console.log("in query results: ", results);
//     return results.sorted('happened_at');
//   });
// };

// import SQLite from 'react-native-sqlite-storage';
// import {ExcerciseOptions, ResultT} from './screens/ResultFormScreen';
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

// const DB_NAME = 'feelings-dev.db';

// const openCB = () => {
//   console.log('opening CB');
// };

// const errorCB = (error: any) => {
//   console.log('error CB: ', error);
// };

// const successCB = () => {
//   console.log('success CB');
// };

// export const loadDB = async (): Promise<SQLite.SQLiteDatabase> => {
//   return SQLite.openDatabase(
//     {name: DB_NAME, location: 'Library'},
//     openCB,
//     errorCB,
//   );
// };

// export let DB: SQLite.SQLiteDatabase | undefined;
// const load = () => {
//   if (!DB) {
//     loadDB().then(db => {
//       DB = db;
//     });
//   }
// };
// load();

// export const setupDB = async (): Promise<boolean> => {
//   let status: boolean = true;

//   try {
//     const createResultsQuery = `CREATE TABLE IF NOT EXISTS results (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       happened_at DATETIME,
//       sleep_hours FLOAT(4, 2),
//       sleep_quality TINYINT,
//       feeling_on_wakeup VARCHAR(64),
//       feeling_rest_of_day VARCHAR(64),
//       weight FLOAT(5, 2),
//       nap VARCHAR(64),
//       excercise VARCHAR(64),
//       outside VARCHAR(64)
//     );`;

//     DB?.transaction((tx: SQLite.Transaction) => {
//       tx.executeSql(createResultsQuery)
//         .then(([_tx, results]) => {
//           var len = results.rows.length;
//           for (let i = 0; i < len; i++) {
//             let row = results.rows.item(i);
//             console.log('row of data: ', row);
//           }
//         })
//         .catch(errorCB);
//     }).then(() => console.log('finished setup transaction'));
//   } catch (error) {
//     console.log('error setting up: ', error);
//     status = false;
//   }

//   return status;
// };

// export const wipeDB = () => {
//   const dropResultsQuery = 'DROP TABLE IF EXISTS results;';
//   DB?.transaction((tx: SQLite.Transaction) => {
//     tx.executeSql(dropResultsQuery).then(successCB).catch(errorCB);
//   });
// };

// export const queryResults = async (): Promise<SQLite.ResultSet | undefined> => {
//   const queryResultsQuery = 'SELECT * FROM results;';
//   let response: SQLite.ResultSet | undefined;
//   await DB?.transaction((tx: SQLite.Transaction) => {
//     tx.executeSql(queryResultsQuery, []).then(([_tx, results]) => {
//       response = results;
//     });
//   });

//   return response;
// };

// export const createResult = (data: ResultT) => {
//   console.log('create result', data);

//   const insertQuery = `INSERT INTO results (
//     happened_at,
//     ${Object.keys(data).join(', ')}
//   ) VALUES (
//     '${nowToDBDateTime()}',
//     ${Object.values(data)
//       .map((datum: any) => convertFormAnswer(datum))
//       .join(', ')}
//   )`;
//   console.log(insertQuery);
//   DB?.transaction((tx: SQLite.Transaction) => {
//     tx.executeSql(insertQuery, []).then(successCB).catch(errorCB);
//   });
// };

// const convertFormAnswer = (datum: any): any => {
//   if (datum === null || datum === undefined) {
//     return 'NULL';
//   } else if (
//     datum instanceof String ||
//     Object.keys(ExcerciseOptions).includes(datum)
//   ) {
//     return `\'${datum}\'`;
//   } else {
//     return datum;
//   }
// };

// const nowToDBDateTime = (): string => {
//   return new Date().toISOString().slice(0, 19).replace('T', ' ');
// };
