import { AsyncStorage } from 'react-native';

export const TASK_KEY = 'taskKey';
export const STEP_KEY = 'stepKey';
export const IDCOUNTER = 'idCounter';

export async function saveDataAsync(dataKey, dataValue) {
  let stringifiedVal = stringify(dataValue);
  try {
    await AsyncStorage.setItem(dataKey, stringifiedVal);
  } catch (error) {
    //Error saving data
  }
}

export async function loadDataAsync(dataKey) {
  try {
    let data = await AsyncStorage.getItem(dataKey);
    return parse(data);
  } catch (error) {
    //Error retrieving data
  }
}

export async function deleteDataAsync(dataKey) {
  try {
    await AsyncStorage.removeItem(dataKey);
  } catch (error) {
    //Could not delete item with key: dataKey
  }
}

//--Helper functions for this file--//
function parse(dataString) {
  return JSON.parse(dataString);
}

function stringify(dataValue) {
  return JSON.stringify(dataValue);
}
