import ApplicationStatuses from './ApplicationStatuses.js';
import PositionTypes from './PositionTypes.js';

const enums = [{
  key: 'ApplicationStatuses',
  value: ApplicationStatuses
}, {
  key: 'PositionTypes',
  value: PositionTypes
}];

interface GenericObject {
  [key: string]: any;
}

interface KeyValue {
  key: string;
  value: any;
}

export default enums.reduce((output: GenericObject, input: KeyValue) => {
  const result = [];
  const values = input.value;
  for (let key in values) {
    // Skip, as this is a reserved keyword
    if (key.endsWith('_DESCRIPTION')) {
      continue;
    }
    let description = values[`${key}_DESCRIPTION`];
    if (!description) {
      description = key.split('_').map((item) => {
        return item[0] + item.slice(1).toLowerCase();
      }).join(' ');
    }
    result.push({
      Key: key,
      Value: values[key],
      Description: description
    });
  }
  output[input.key] = result;
  return output;
}, {});