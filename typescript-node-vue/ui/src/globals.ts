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
    /* Don't necessarily like that I have to set both here... I need access to the enums in Formatters.ts,
     * and I don't have access to the App at that point */
    window.Enums = enums;
    this.Constants.Enums = enums;
  }
} as IKeyValue;
