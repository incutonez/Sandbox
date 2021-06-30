import Button from '@/components/base/Button.vue';
import Field from '@/components/base/Field.vue';
import Title from '@/components/base/Title.vue';
import {RouteLocationNormalized, RouteParams} from 'vue-router';
import List from '@/components/base/List.vue';
import ComboBox from '@/components/base/ComboBox.vue';

export type IButton = InstanceType<typeof Button>;
export type IField = InstanceType<typeof Field>;
export type ITitle = InstanceType<typeof Title>;
export type IJefList = InstanceType<typeof List>;
export type IComboBox = InstanceType<typeof ComboBox>;
export type IRouteArg = RouteLocationNormalized;
export type IRouteParams = RouteParams;
export type IEventKeyboard = KeyboardEvent;
export type IEventMouse = MouseEvent;
export type IElementAttribute = boolean | null;
export type IValueAttribute = string | number | boolean | null;
