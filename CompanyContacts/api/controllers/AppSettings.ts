import {Request, Response, Router} from 'express';
import IKeyValue from '@jef/shared/dist/interfaces/IKeyValue.js';
import {PositionTypes} from '@jef/shared/dist/enums/PositionTypes.js';
import {ApplicationStatuses} from '@jef/shared/dist/enums/ApplicationStatuses.js';
import IEnum from '@jef/shared/dist/interfaces/IEnum.js';

const Enums: IKeyValue = {
  PositionTypes,
  ApplicationStatuses
};

const enumKeys = Object.keys(Enums);
const output: IKeyValue = {};
enumKeys.forEach((enumKey) => {
  const result: IEnum[] = [];
  const item = Enums[enumKey];
  const keys = Object.keys(item);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // Skip, as this is a reserved keyword
    if (key.endsWith('_DESCRIPTION')) {
      continue;
    }
    let description = item[`${key}_DESCRIPTION`];
    if (!description) {
      description = key.split('_').map((item) => {
        return item[0] + item.slice(1).toLowerCase();
      }).join(' ');
    }
    result.push({
      Key: key,
      Value: item[key],
      Description: description
    });
  }
  output[enumKey] = result;
});

export default (router: Router) => {
  router.get('/appsettings', async (req: Request, res: Response) => {
    return res.send({
      Constants: output
    });
  });
}