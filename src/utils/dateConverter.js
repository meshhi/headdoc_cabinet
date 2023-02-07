class DateConverter{
  constructor() {
    this.currentDate = Number(new Date());
    this.monthDict = {
      '1': 'января',
      '2': 'февраля',
      '3': 'марта',
      '4': 'апреля',
      '5': 'мая',
      '6': 'июня',
      '7': 'июля',
      '8': 'августа',
      '9': 'сентября',
      '10': 'октября',
      '11': 'ноября',
      '12': 'декабря',
    }
  }

  dateStampToNearestMonday(timestamp = this.currentDate) {
    const currentDate = new Date(timestamp);
    let resultDateStamp;
    if (currentDate.getDay() !== 1) {
      let nearestMonday = currentDate;
      for (let i = 0; i < 7; i++) {
        if (nearestMonday.getDay() !== 1) {
          nearestMonday = new Date(timestamp - 86400000);
        } else {
          break;
        }
        
      }
      resultDateStamp = Number(nearestMonday);
    } else {
      resultDateStamp = Number(currentDate);
    }
  
    return resultDateStamp;
  }
  
  dateToStrForRequest(timestamp) {
    const date = new Date(timestamp);
    
    let dayNumber = date.getUTCDate();
    if (String(dayNumber).length === 1) {
      dayNumber = `0${dayNumber}`
    }
  
    let monthNumber = date.getUTCMonth() + 1;
    if (String(monthNumber).length === 1) {
      monthNumber = `0${monthNumber}`
    }
  
    let yearNumber = date.getUTCFullYear();
  
    //2023-01-23
    return `${yearNumber}-${monthNumber}-${dayNumber}`
  }

  dateToStr(timestamp) {
    const date = new Date(timestamp);
    
    let dayNumber = date.getUTCDate();

    let monthNumber = date.getUTCMonth() + 1;

    let yearNumber = date.getUTCFullYear();
  
    //на 1 февраля 2023
    return `на ${dayNumber} ${this.monthDict[monthNumber]} ${yearNumber}`
  }
}

export default new DateConverter();