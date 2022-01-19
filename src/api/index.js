import axios from '@/utils/request'

export const getData = () =>
  axios({
    url: 'api/mock',
    method: 'POST',
  })
