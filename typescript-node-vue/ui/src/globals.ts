import {
  FlexAlignments,
  FlexContentAlignments,
  FlexDirections,
  FlexJustifications,
  FlexWraps,
  TextAlignments
} from '@/statics/Flex';
import IKeyValue from '@/interfaces/IKeyValue';
import Icons from '@/statics/Icons';
import utilities from '@/utilities';
import Proxy from '@/classes/Proxy';
import Store from '@/classes/Store';
import Enum from '@/models/Enum';

export default {
  Constants: {
    FlexDirections,
    FlexAlignments,
    FlexJustifications,
    FlexWraps,
    FlexContentAlignments,
    TextAlignments,
    Icons,
    Utilities: utilities
  },

  async loadAppSettings() {
    const response = await Proxy.load({
      url: 'api/appsettings'
    });
    const enums: IKeyValue = {};
    const result = response?.data.Constants;
    for (const key in result) {
      enums[key] = new Store(Enum, {
        data: result[key]
      });
    }
    this.Constants.Enums = enums;
  }
} as IKeyValue;
