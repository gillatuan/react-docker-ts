import {
  assign,
  clone,
  find,
  isEmpty,
  isObjectLike,
  map,
  mapValues,
  reduce,
} from 'lodash'
import rgba from 'rgba-convert'
import jsonpatch from 'fast-json-patch'
import moment from 'moment'

import * as Utils from '../utils/Utils'
import * as Storage from '../utils/Storage'

const PER_PAGE = 10

const convertFileSize = (bytes) => {
  if (bytes > 1000000000) {
    return (bytes / 1000000000).toFixed(2) + 'GB'
  }
  if (bytes > 1000000) {
    return (bytes / 1000000).toFixed(2) + 'MB'
  }
  if (bytes > 1000) {
    return (bytes / 1000).toFixed(2) + 'KB'
  }
  return bytes.toFixed(2) + 'bytes'
}

const base64StringtoFile = (base64String, filename) => {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  var splitFileName = filename.split('.')
  if (mime === 'image/png') {
    filename = splitFileName[0] + '.png'
  }
  return new File([u8arr], filename, { type: mime })
}

// Convert file to base64 string
const getBase64 = (file) => {
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    console.log(reader.result)
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

const getPaginatedItems = (items, offset) => {
  if (items.length > 0) {
    return items.slice(offset, offset + PER_PAGE)
  }

  return []
}

const slugify = (string) => {
  //Đổi chữ hoa thành chữ thường
  let slug = string.toLowerCase()

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
  slug = slug.replace(/đ/gi, 'd')
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /`|~|!|@|#|\||$|%|\^|&|\*|\(|\)|\+|=|,|\.|\/|\?|>|<|'|"|:|;|_/gi,
    ''
  )
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-')
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/-----/gi, '-')
  slug = slug.replace(/----/gi, '-')
  slug = slug.replace(/---/gi, '-')
  slug = slug.replace(/--/gi, '-')
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@'
  slug = slug.replace(/@-|-@|@/gi, '')

  return slug
}

const redirectAfterAuthen = (auth, history) => {
  if (auth.isAuthenticated) {
    const locationSearch = history.location.search.substr(9)

    history.push(locationSearch)
  }
}

/* const routerConnect = (className, actions, processState) => {
  return withRouter(
    connect((state, props) => {
      var result = state
      if (processState) {
        result = processState(state)
      }
      if (result == null) result = {}
      return mapStateToProps(result, props)
    }, actions)(className)
  )
} */

const convertFieldsBeforeSubmit = (listObjFields) => {
  let newObj = mapValues(listObjFields, (value, key) => {
    return {
      fieldName: key,
      fieldType: 'input',
      fieldLabel: 'SHOW_NAME',
      fieldValue: 'en',
      validationRules: [
        { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD' },
      ],
    }
  })

  return newObj
}

export const validateRequired = (value) => {
  let error = true
  if (isEmpty(value)) {
    error = false
  }
  return error
}
// eslint-disable-next-line
const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// eslint-disable-next-line
const notUnicodeFormat = /[^\u0000-\u00ff]/
export const validateEmail = (email) => {
  const lowerCase = String(email).toLowerCase()
  if (!emailFormat.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
    return false
  }

  return true
}

export const recursiveGetFieldName = (obj, entityField, fieldNameCombine) => {
  let listFieldConfig
  listFieldConfig = reduce(
    obj,
    (result, value, key) => {
      let cloneResult = clone(result)
      let localFieldName = clone(fieldNameCombine)
      if (key === entityField) {
        map(value, (item, k) => {
          const getFieldName = `${localFieldName}.${key}.${k}`

          // check whether any validation
          if (item.validationRules && item.validationRules.length > 0) {
            item.validationRules.map((itemValidate, index) => {
              if (itemValidate.rule === 'isRequired') {
                item.validationRules[index].validator = validateRequired
              }
              if (itemValidate.rule === 'isEmail') {
                item.validationRules[index].validator = validateEmail
              }

              return itemValidate
            })
          }

          // insert key, value into list field
          return (cloneResult = {
            ...cloneResult,
            [getFieldName]: item,
          })
        }) // reset field name

        localFieldName = ''
      } else if (isObjectLike(value)) {
        if (!localFieldName) {
          localFieldName = key
        } else {
          localFieldName += `.${key}`
        } // recall recursive fn if not be found the expected entityField

        return assign(
          cloneResult,
          recursiveGetFieldName(value, entityField, localFieldName)
        )
      }

      listFieldConfig = {
        ...listFieldConfig,
        ...cloneResult,
      }

      return listFieldConfig
    },
    {}
  )

  return listFieldConfig
}

const convertToDom = (domHTML) => {
  let domParser = new DOMParser()
  return domParser.parseFromString(domHTML, 'text/html')
}

const convertToHTML = (domObj) => {
  var xmlS = new XMLSerializer()
  return xmlS.serializeToString(domObj)
}

const addPreventClickOnDom = (domObj) => {
  if (domObj.children) {
    for (let i = 0; i < domObj.children.length; i++) {
      let item = domObj.children[i]
      if (item.hasAttribute('href')) {
        item.setAttribute('href', '#')
      }
      item.setAttribute(
        'onclick',
        'if(event.preventDefault) event.preventDefault(); else event.returnValue = false;'
      )
      Utils.addPreventClickOnDom(item)
    }
  }
}

const getBgSVGImage = (pageObj) => {
  let list = []
  if (pageObj.children) {
    for (let i = 0; i < pageObj.children.length; i++) {
      let item = pageObj.children[i]
      findBgSVGImage(item, list)
    }
  }

  return list
}

const findBgSVGImage = (domObj, list) => {
  if (
    domObj.style.background &&
    domObj.style.background.indexOf('data:image/svg+xml') >= 0
  ) {
    console.log('background_svg', domObj.style.background)
    let beginSVG = 'data:image/svg+xml'
    let endSVG = '</svg>'
    let beginIndex = domObj.style.background.indexOf(beginSVG)
    let endIndex = domObj.style.background.indexOf(encodeURIComponent(endSVG))

    if (beginIndex > 0 && endIndex > 0) {
      let svgData = domObj.style.background.substring(
        beginIndex,
        endIndex + encodeURIComponent(endSVG).length
      )
      let obj = {
        dom: domObj,
        svg: svgData,
      }
      list.push(obj)
    }
  }

  if (domObj.children) {
    for (let i = 0; i < domObj.children.length; i++) {
      let item = domObj.children[i]
      findBgSVGImage(item, list)
    }
  }
}

const updateStyleHeightForImageDom = (domObj) => {
  if (domObj.children) {
    for (let i = 0; i < domObj.children.length; i++) {
      let item = domObj.children[i]
      if (item.tagName.toLowerCase() === 'img') {
        if (item.hasAttribute('height')) {
          // let height = item.getAttribute("height");
          item.style.setProperty('height', 'auto', 'important')
        }
      }

      Utils.updateStyleHeightForImageDom(item)
    }
  }
}

const convertToJapanDate = (value) => {
  var date = new Date(value)
  var options = {
    year: 'numeric', //年の形式
    month: 'short', //月の形式
    day: 'numeric', //日の形式
  }
  return date.toLocaleDateString('ja-JP', options)
}

const formatDateByLocale = (value) => {
  var options = {
    year: 'numeric', //年の形式
    month: 'short', //月の形式
    day: 'numeric', //日の形式
  }

  const locale = Storage.getCookieData('locale') || 'ja-JP'
  const localDateString = moment(value).toDate().toLocaleString(locale, options)

  return localDateString
}

const splitMathExpression = (expression) => {
  var matchPattern = /[^\s()*/%+-]+/g
  var result = expression.match(matchPattern)
  return result
}

const color = (hex) => {
  var color = rgba.obj(hex)
  return { ...color, a: color.a / 255 }
}

const hex = (color) => {
  var hex = rgba.hex({
    r: color.r,
    g: color.g,
    b: color.b,
    a: Math.round(color.a * 255),
  })
  return hex
}

const numberWithCommas = (x) => {
  let number = parseFloat(x)
  //keep 2 dimecial
  // number = parseFloat(number.toFixed(2));
  // number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return abbreviate_number(number, 1)
}
const abbreviate_number = (num, fixed) => {
  if (num === null) {
    return null
  } // terminate early

  if (num === 0) {
    return '0'
  } // terminate early

  fixed = !fixed || fixed < 0 ? 0 : fixed // number of decimal places to show
  var b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k] // append power

  return e
}

const formatCompact = (x) => {
  let number = parseFloat(x)
  return abbreviateNumber(number, 1)
}
const abbreviateNumber = (num, fixed) => {
  if (num === null) {
    return null
  } // terminate early

  if (num === 0) {
    return '0'
  } // terminate early

  fixed = !fixed || fixed < 0 ? 0 : fixed // number of decimal places to show
  var b = num.toPrecision(1).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(0 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k] // append power

  return e
}

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1, 3), 16)
  var G = parseInt(color.substring(3, 5), 16)
  var B = parseInt(color.substring(5, 7), 16)

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  var RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const _rgba = { hex, color }

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
    else if (obj[key] == null) delete obj[key]
  })
}

const diff = (obj1, obj2) => {
  return jsonpatch.compare(obj1, obj2)
}

const merge = (obj1, patch) => {
  return jsonpatch.applyPatch(obj1, patch)
}

const groupValues = function (o) {
  var r = []
  for (var k in o) {
    if (o.hasOwnProperty(k)) {
      r.push(o[k])
    }
  }
  return r
}

// JSON配列を指定のキーで集計する
const groupBy = function (arr, keys, sumKeys) {
  var hash = arr.reduce(function (res, data) {
    // 集計キーを作成
    var key = keys.reduce(function (s, k) {
      s += data[k]
      return s
    }, '')
    // 初めての集計キー
    if (!(key in res)) {
      // 集計キーをオブジェクトに設定
      var keyList = keys.reduce(function (h, k) {
        h[k] = data[k]
        return h
      }, {})
      // 集計項目の初期値を設定
      res[key] = sumKeys.reduce(function (h, k) {
        h[k] = 0
        return h
      }, keyList)
    }
    // データを集計（加算）
    sumKeys.forEach(function (k) {
      res[key][k] += data[k]
    })

    return res
  }, {})

  return groupValues(hash)
}

const round = (num, dinum) => {
  return +(Math.round(num + ('e+' + dinum)) + ('e-' + dinum))
}

const format = (n) => {
  if (n && !isNaN(parseFloat(n)) && isFinite(n)) {
    if (parseFloat(n) < 1000) {
      n = Math.round(parseFloat(n) * 10) / 10
    }

    var base = Math.floor(Math.log(Math.abs(n)) / Math.log(1000))
    var suffix = 'KMB'[base - 1]
    return suffix
      ? String(Math.floor(n / Math.pow(1000, base))).substring(0, 3) + suffix
      : '' + parseFloat(n).toString()
  }
  return n
}

const formatWithCommas = (number, digit = 2) => {
  if (digit > 0) {
    const p = parseFloat(number).toFixed(digit).split('.')

    return (
      p[0]
        .split('')
        .reverse()
        .reduce(function (acc, num, i, orig) {
          return num == '-' ? num + acc : num + (i && !(i % 3) ? ',' : '') + acc
        }, '') +
      '.' +
      p[1]
    )
  }

  return parseInt(number)
    .toString()
    .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}
const formatPercent = (number, digit = 0) => {
  // let percent = parseFloat((1000 / 100) * number).toFixed(digit) + "%";
  //Based on BZCR 434
  let percent = parseFloat(100 * number).toFixed(digit) + '%'
  return percent
}

const hasGA = (datasources) => {
  let index = datasources.findIndex(
    (obj) => obj.data_type == 'GOOGLE_ANALYTICS'
  )
  if (index < 0) {
    return false
  }

  return true
}

const getAccessToken = () => {
  if (Storage.getCookieData('accGgAuthen')) {
    let accGgAuthen = JSON.parse(Storage.getCookieData('accGgAuthen'))
    return accGgAuthen.access_token
  }
  return ''
}

const DEFAULT_SCREEN_DPI = (() => {
  for (var i = 56; i < 2000; i++) {
    if (matchMedia('(max-resolution: ' + i + 'dpi)').matches === true) {
      return i
    }
  }
  return 96
})()

const dataURItoBlob = (dataURI) => {
  let binary = atob(dataURI.split(',')[1])
  let array = []
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type: 'image/png' })
}

const captitalize = (string) => {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const removeDuplicates = (arr, key) => {
  if (!(arr instanceof Array) || (key && typeof key !== 'string')) {
    return false
  }

  if (key && typeof key === 'string') {
    return arr.filter((obj, index, arr) => {
      return arr.map((mapObj) => mapObj[key]).indexOf(obj[key]) === index
    })
  } else {
    return arr.filter(function (item, index, arr) {
      return arr.indexOf(item) === index
    })
  }
}

const replaceJapaneseCharacter = (string) => {
  if (!string) return ''
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) > 256) {
      string = replaceCharAt(string, i, 'a')
    }
  }
  return string
}

const replaceCharAt = (str, index, chr) => {
  if (index > str.length - 1) return str
  return str.substr(0, index) + chr + str.substr(index + 1)
}

const replaceKeyInObjectArray = (a, r) =>
  a.map((o) =>
    Object.keys(o)
      .map((key) => ({ [r[key] || key]: o[key] }))
      .reduce((a, b) => Object.assign({}, a, b))
  )

const checkDuplicateInObject = (propertyName, inputArray, metrics) => {
  let itemDuplicate = {},
    testObject = {}
  let newInputArray = []

  inputArray.map((item, key) => {
    let itemPropertyName = item[propertyName]

    if (itemPropertyName in testObject) {
      newInputArray = newInputArray.filter((objInput, keyInput) => {
        return objInput !== newInputArray[newInputArray.length - 1]
      })
      metrics.map((metric, index) => {
        if (metric.display_name.indexOf('Average') < 0) {
          if (parseFloat(itemDuplicate[metric.display_name]) == 0) {
            delete itemDuplicate[metric.display_name]
          }
          if (parseFloat(item[metric.display_name]) == 0) {
            delete item[metric.display_name]
          }
        }
      })

      newInputArray = [
        ...newInputArray,
        {
          ...itemDuplicate,
          ...item,
        },
      ]
    } else {
      itemDuplicate = item
      testObject[itemPropertyName] = item

      newInputArray = [...newInputArray, { ...item }]

      delete item.duplicate
    }
  })

  return newInputArray
}

const convertColorGradient = (startColor, endColor, alpha) => {
  let newColor = {}

  newColor.g = Math.round(startColor.g * alpha + (1 - alpha) * endColor.g)
  newColor.r = Math.round(startColor.r * alpha + (1 - alpha) * endColor.r)
  newColor.b = Math.round(startColor.b * alpha + (1 - alpha) * endColor.b)
  newColor.a = 1

  return newColor
}

const addItem = (items, item) => {
  let foundObject = find(items, (e) => {
    return e.display_name === item.display_name
  })

  if (!foundObject) {
    items.push(item)
  }
  return items
}

const processMetrics = (item_data) => {
  let itemData = JSON.parse(JSON.stringify(item_data))
  let metricArr = {}
  itemData.metrics.forEach((metric) => {
    let displayName = metric.display_name
    if (metricArr[displayName] == null) {
      metric.display_name = displayName
      metricArr[displayName] = 0
    } else {
      metricArr[displayName] += 1
      metric.display_name = displayName + '(' + metricArr[displayName] + ')'
    }
  })
  return itemData
}

const processMetricsModified = (metrics) => {
  let currMetrics = JSON.parse(JSON.stringify(metrics))
  let metricArr = {}
  currMetrics.forEach((metric) => {
    let displayName = metric.display_name
    if (metricArr[displayName] == null) {
      metric.display_name = displayName
      metricArr[displayName] = 0
    } else {
      metricArr[displayName] += 1
      metric.display_name = displayName + '(' + metricArr[displayName] + ')'
    }
  })
  return currMetrics
}

const getBoundingRect = (rects) => {
  let result = rects[0]
  for (var i = 1; i < rects.length; i++) {
    let rect = rects[i]
    rect.right = rect.left + rect.width
    rect.bottom = rect.top + rect.height
    result.right = result.left + result.width
    result.bottom = result.top + result.height
    let left = Math.min(result.left, rect.left)
    let top = Math.min(result.top, rect.top)
    let right = Math.max(result.right, rect.right)
    let bottom = Math.max(result.bottom, rect.bottom)
    let width = right - left
    let height = bottom - top
    result = { left, top, width, height }
  }
  return result
}

const isInside = (pos, area) => {
  if (
    area.x < pos.x &&
    area.x + area.width > pos.x &&
    area.y < pos.y &&
    area.y + area.height > pos.y
  )
    return true
  return false
}

const arrangeItem = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr // for testing
}

// const arrangeItem = (items, moveFromIndex, moveToIndex) => {
//     debugger;
//     const movingItem = items[moveFromIndex];
//     const arrangedArray = update(items, {
//         $splice: [[moveFromIndex, 1], [moveToIndex, 0, movingItem]]
//     });

//     return arrangedArray;
// };

const calculateFitHeight = (chartHeight, style, pageSize) => {
  let lineHeight = 0
  let lineHeightDecimal = 0
  let noOfColumns = 1
  let lineHeightPerRow = 0
  let calculateStyle = JSON.parse(JSON.stringify(style))

  let headerPadding = 0
  if (calculateStyle.footer.toggleSummary) {
    noOfColumns = 2
  }

  // apply calculating the height of per row inside canvas
  lineHeight = chartHeight / (pageSize + noOfColumns) // include header row
  lineHeightPerRow = Math.floor(lineHeight)

  // calculate the decimal existed all rows then apply to header or footer
  lineHeightDecimal = Math.floor(
    (lineHeight - lineHeightPerRow) * (pageSize + noOfColumns)
  )

  calculateStyle.rowsStyle.removeBorder = false
  // calculateStyle.footer.lineHeight = lineHeightPerRow + "px";
  // if have summary
  if (noOfColumns > 1) {
    lineHeightDecimal = lineHeightDecimal / noOfColumns
    calculateStyle.footer.lineHeight =
      lineHeightPerRow - 2 + lineHeightDecimal + 'px'
  }

  headerPadding = Math.floor(headerPadding + lineHeightDecimal / 2) + 'px'
  calculateStyle.headerStyle.lineHeight = lineHeightPerRow - 2 + 'px'
  calculateStyle.rowsStyle.lineHeight = lineHeightPerRow - 2 + 'px'
  if (lineHeightPerRow < 3) {
    calculateStyle.rowsStyle.removeBorder = true
  }

  return {
    headerStyle: { ...calculateStyle.headerStyle, padding: headerPadding },
    rowsStyle: calculateStyle.rowsStyle,
    footer: calculateStyle.footer,
  }
}

const addEventListener = (eventName, callback) => {
  document.addEventListener(eventName, callback, true)
}

const removeEventListener = (eventName, callback) => {
  document.removeEventListener(eventName, callback, true)
}

const dispatchEvent = (eventName, data = null) => {
  let customEvent = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(customEvent)
}

export {
  base64StringtoFile,
  convertFieldsBeforeSubmit,
  convertFileSize,
  getBase64,
  getPaginatedItems,
  redirectAfterAuthen,
  slugify,
  convertToDom,
  convertToHTML,
  addPreventClickOnDom,
  updateStyleHeightForImageDom,
  convertToJapanDate,
  splitMathExpression,
  shadeColor,
  removeEmpty,
  diff,
  merge,
  groupBy,
  format,
  formatWithCommas,
  formatPercent,
  hasGA,
  getAccessToken,
  captitalize,
  dataURItoBlob,
  numberWithCommas,
  removeDuplicates,
  replaceJapaneseCharacter,
  replaceKeyInObjectArray,
  checkDuplicateInObject,
  convertColorGradient,
  addItem,
  processMetrics,
  processMetricsModified,
  formatDateByLocale,
  getBoundingRect,
  arrangeItem,
  calculateFitHeight,
  addEventListener,
  removeEventListener,
  dispatchEvent,
  isInside,
  formatCompact,
}
