import axios from 'axios'
import Swal from 'sweetalert2'


let baseURL = ''

if (process.env.NODE_ENV === 'production') {
  // 如果不是 production 模式
  baseURL = 'https://safe-sea-65364.herokuapp.com/api'
}
else {
  baseURL = 'http://localhost:3000/api'
}


export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
