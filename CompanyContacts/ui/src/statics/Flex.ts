export enum FlexDirections {
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse',
  // Only allows 1 item in the container
  FIT = 'fit'
}

export enum FlexWraps {
  NO_WRAP = 'nowrap',
  WRAP = 'wrap',
  WRAP_REVERSE = 'wrap-reverse'
}

// Per https://css-tricks.com/snippets/css/a-guide-to-flexbox/, these are the safest options
// AKA pack
export enum FlexJustifications {
  START = 'flex-start',
  END = 'flex-end',
  CENTER = 'center',
  NORMAL = 'normal'
}

export enum FlexAlignments {
  AUTO = 'auto',
  STRETCH = 'stretch',
  START = 'flex-start',
  END = 'flex-end',
  CENTER = 'center',
  BASELINE = 'baseline'
}

export enum FlexContentAlignments {
  NORMAL = 'normal',
  START = 'flex-start',
  END = 'flex-end',
  CENTER = 'center',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly',
  STRETCH = 'stretch'
}

export enum TextAlignments {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
  JUSTIFY = 'justify',
  INITIAL = 'initial',
  INHERIT = 'inherit'
}
