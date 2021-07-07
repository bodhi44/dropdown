import { Toast, Indicator, MessageBox } from 'mint-ui'

// 错误提示
export const showToast = (str, position = 'center', duration = 2000) => {
  Toast({
    message: str || '提示',
    position,
    duration
  })
}

// 成功提示
export const showToastIcon = (
  str,
  position = 'center',
  duration = 2000,
  isIcon = true
) => {
  Toast({
    message: str || '操作成功',
    position,
    iconClass: isIcon ? 'mint-toast-icon mintui mintui-success' : 'none',
    duration
  })
}

// 开启loading
export const showLoading = (str, spinnerType) => {
  // spinnerType = 'snake' || 'fading-circle' || 'double-bounce' || 'triple-bounce'
  Indicator.open({
    text: str || '加载中...',
    spinnerType: spinnerType || 'fading-circle'
  })
}

// 关闭loading
export function hideLoading() {
  Indicator.close()
}

// model
export const showModal = pera => {
  return new Promise(function(resolve, reject) {
    MessageBox({
      title: pera.title || '',
      message: pera.message ? pera.message : ' ',
      showCancelButton: !pera.showCancelButton,
      confirmButtonText: pera.confirmButtonText || '确定',
      cancelButtonText: pera.cancelButtonText || '取消',
      confirmButtonHighlight: pera.confirmButtonHighlight || false,
      cancelButtonHighlight: pera.cancelButtonHighlight || false
    }).then(action => {
      if (action === 'confirm') {
        resolve()
      }
    })
  })
}

// 加法
export const dcmAdd = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (
    (((arg1, second) => {
      var m = 0
      var s1 = arg1.toString()
      var s2 = second.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {}
      try {
        m += s2.split('.')[1].length
      } catch (e) {}
      return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
        Math.pow(10, m)
      )
    })(arg1, m) +
      ((arg2, second) => {
        var m = 0
        var s1 = arg2.toString()
        var s2 = second.toString()
        try {
          m += s1.split('.')[1].length
        } catch (e) {}
        try {
          m += s2.split('.')[1].length
        } catch (e) {}
        return (
          (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
          Math.pow(10, m)
        )
      })(arg2, m)) /
    m
  )
}

// 减法
export const dcmSub = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (
    (((arg1, second) => {
      var m = 0
      var s1 = arg1.toString()
      var s2 = second.toString()
      try {
        m += s1.split('.')[1].length
      } catch (e) {}
      try {
        m += s2.split('.')[1].length
      } catch (e) {}
      return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
        Math.pow(10, m)
      )
    })(arg1, m) -
      ((arg2, second) => {
        var m = 0
        var s1 = arg2.toString()
        var s2 = second.toString()
        try {
          m += s1.split('.')[1].length
        } catch (e) {}
        try {
          m += s2.split('.')[1].length
        } catch (e) {}
        return (
          (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
          Math.pow(10, m)
        )
      })(arg2, m)) /
    m
  )
}

// 乘法
export const accMul = (arg1, arg2) => {
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  )
}

// 身份验证
export const IdCodeValid = code => {
  // 身份证号合法性验证
  // 支持15位和18位身份证号
  // 支持地址编码、出生日期、校验位验证
  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  let row = true
  // let msg = "验证成功";

  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(
      code
    )
  ) {
    row = false
    // app.showError('身份证号格式错误');
    Toast({
      message: '身份证号格式错误'
    })
  } else if (!city[code.substr(0, 2)]) {
    row = false
    // app.showError('身份证号地址编码错误');
    Toast({
      message: '身份证号地址编码错误'
    })
  } else {
    // 18位身份证需要验证最后一位校验位
    // eslint-disable-next-line eqeqeq
    if (code.length === 18) {
      code = code.split('')
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      // 校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      // eslint-disable-next-line eqeqeq
      if (parity[sum % 11] != code[17].toUpperCase()) {
        row = false
        // app.showError('身份证号校验错误');
        Toast({
          message: '身份证号校验错误'
        })
      }
    }
  }
  return row
}

// 校验密码是否包含字母
export const verifyPassword = str => {
  const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{6,16}')
  return pwdRegex.test(str)
}

// 生成随机数
export const getRandom = num => {
  return Math.floor(
    (Math.random() + Math.floor(Math.random() * 9 + 1)) * Math.pow(10, num - 1)
  )
}

// 时间左边加0
export const padLeftZero = str => {
  return ('00' + str).substr(str.length)
}
