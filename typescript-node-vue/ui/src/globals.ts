import {
  FlexAlignments,
  FlexContentAlignments,
  FlexDirections,
  FlexJustifications,
  FlexWraps,
  TextAlignments
} from '@/statics/Flex';
import IKeyValue from '@/interfaces/IKeyValue';
import Icons, {IIcons} from '@/statics/Icons';
import utilities from '@/utilities';
import Proxy from '@/classes/Proxy';
import Store from '@/classes/Store';
import Enum from '@/models/Enum';
import {PositionTypes} from '../../shared/enums/PositionTypes';
import {ApplicationStatuses} from '../../shared/enums/ApplicationStatuses';
import IStore from '@/interfaces/IStore';
import IEnum from '@/interfaces/IEnum';

interface IEnums {
  ApplicationStatuses: IStore<IEnum> & typeof ApplicationStatuses;
  PositionTypes: IStore<IEnum> & typeof PositionTypes;
}

declare global {
  interface Window {
    Enums: IEnums;
    App: any;
  }
}

// For global props, taken from https://stackoverflow.com/a/64189003/1253609
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    Icons: IIcons;
    FlexAlignments: typeof FlexAlignments;
    FlexContentAlignments: typeof FlexContentAlignments;
    FlexDirections: typeof FlexDirections;
    FlexJustifications: typeof FlexJustifications;
    FlexWraps: typeof FlexWraps;
    TextAlignments: typeof TextAlignments;
    Utilities: typeof utilities;
    Enums: IEnums;
  }
}

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
    // TODO: Is this necessary?  I could potentially load all the enums in an index file
    const response = await Proxy.load({
      url: 'api/appsettings'
    });
    const enums: IKeyValue = {};
    const result = response?.data.Constants;
    const keys = result && Object.keys(result);
    if (keys) {
      keys.forEach((key: string) => {
        enums[key] = new Store(Enum, {
          data: result[key]
        });
      });
    }
    /* Don't necessarily like that I have to set both here... I need access to the enums in Formatters.ts,
     * and I don't have access to the App at that point */
    window.Enums = enums as IEnums;
    this.Constants.Enums = enums;
  }
} as IKeyValue;
