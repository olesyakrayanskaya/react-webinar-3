export const formatTime = (date) => {
  return (date < 10 ? '0' : '') + date;
};

export const formatMonth = (month) => {
  switch (month) {
    case 'январь':
      return month.slice(0, -1).concat('я');
      break;
    case 'февраль':
      return month.slice(0, -1).concat('я');
      break;
    case 'март':
      return month.slice(0, -1).concat('а');
      break;
    case 'апрель':
      return month.slice(0, -1).concat('я');
      break;
    case 'май':
      return month.slice(0, -1).concat('я');
      break;
    case 'июнь':
      return month.slice(0, -1).concat('я');
      break;
    case 'июль':
      return month.slice(0, -1).concat('я');
      break;
    case 'август':
      return month.slice(0, -1).concat('а');
      break;
    case 'сентябрь':
      return month.slice(0, -1).concat('я');
      break;
    case 'октябрь':
      return month.slice(0, -1).concat('я');
      break;
    case 'ноябрь':
      return month.slice(0, -1).concat('я');
      break;
    case 'декабрь':
      return month.slice(0, -1).concat('я');
      break;
  }
};
