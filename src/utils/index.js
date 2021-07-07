// 防抖
export function debounce(func, wait, immediate = true) {
  let timer = null
  const _debounce = function(...args) {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (!timer) {
        // null
        func.apply(this, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, wait)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
        timer = null
      }, wait)
    }
  }
  _debounce.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}

// 节流
export function throttle(func, wait, options = {}) {
  let timer = null

  const _throttle = function(...args) {
    const context = this
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args)
        timer = null
      }, wait)
    }
  }
  return _throttle
}

// 获取当前系统
export function getCurSystem() {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  return { ios: isiOS, android: isAndroid }
}

/**
  @description 页面垂直平滑滚动到指定滚动高度
  @author wb
*/
export function scrollSmoothTo(position, element) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      return setTimeout(callback)
    }
  }
  // 当前滚动高度
  var scrollTop =
    element.scrollTop ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  // 滚动step方法
  var step = function() {
    // 距离目标滚动距离
    var distance = position - scrollTop
    // 目标滚动位置
    scrollTop = scrollTop + distance / 5
    if (Math.abs(distance) < 1) {
      element.scrollTo(0, position)
    } else {
      element.scrollTo(0, scrollTop)
      requestAnimationFrame(step)
    }
  }
  step()
}
