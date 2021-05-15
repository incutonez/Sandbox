const FA = 'fa';

function getMarkup(icon: string) {
  return `<i class="${FA} ${FA}-${icon}"></i>`;
}

export default {
  PLUS: getMarkup('plus'),
  MINUS: getMarkup('minus')
};
