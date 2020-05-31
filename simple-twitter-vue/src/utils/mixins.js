import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    },
    formatTime(datetime){
      return datetime ? moment(datetime).format('MMMM Do YYYY, h:mm:ss a') : '-'
    }
  }
}

export const timeFilter = {
  filters: {
    formatTime(datetime) {
      return datetime ? moment(datetime).format('MMMM Do YYYY, h:mm:ss a') : '-'
    }
  }
}