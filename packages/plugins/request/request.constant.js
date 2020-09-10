class HttpError {
  constructor(errorCode, errorMsg, error) {
    this.errorCode = errorCode
    this.errorMsg = errorMsg
    this.error = error
  }
}

const HTTP_STATUS_CODE = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  UnsupportedMedia: 407,
  BadRequestMin: 9400,
  BadRequestMax: 9499,

  ServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HTTPVersionNotSupported: 505,
  ServerExceptionMin: 9500,
  ServerExceptionMax: 9599,

  UnkownError: 600
}

const HTTP_ERROR_CONSTANT = {
  // 400 ~ 415 网络请求出现问题
  [HTTP_STATUS_CODE.BadRequest]: new HttpError(
    HTTP_STATUS_CODE.BadRequest,
    'Bad Request 请求出现语法错误'
  ),
  [HTTP_STATUS_CODE.Unauthorized]: new HttpError(
    HTTP_STATUS_CODE.Unauthorized,
    'Unauthorized 权限不足,访问被拒绝'
  ),
  [HTTP_STATUS_CODE.Forbidden]: new HttpError(
    HTTP_STATUS_CODE.Forbidden,
    'Forbidden 资源不可用,执行访问被禁止'
  ),
  [HTTP_STATUS_CODE.NotFound]: new HttpError(
    HTTP_STATUS_CODE.NotFound,
    'Not Found 无法找到指定位置的资源'
  ),
  [HTTP_STATUS_CODE.MethodNotAllowed]: new HttpError(
    HTTP_STATUS_CODE.MethodNotAllowed,
    'Method Not Allowed 请求方法（GET、POST等）对指定的资源不适用'
  ),
  [HTTP_STATUS_CODE.NotAcceptable]: new HttpError(
    HTTP_STATUS_CODE.NotAcceptable,
    'Not Acceptable 指定的资源已经找到，但MIME类型和客户在Accpet头中所指定的不兼容'
  ),
  [HTTP_STATUS_CODE.UnsupportedMedia]: new HttpError(
    HTTP_STATUS_CODE.UnsupportedMedia,
    'Unsupported Media 不支持的媒体类型'
  ),
  [HTTP_STATUS_CODE.BadRequestMin]: new HttpError(
    HTTP_STATUS_CODE.BadRequestMin,
    'Bad Request 当前无法发起正确的网络请求, 请联系管理员'
  ),
  [HTTP_STATUS_CODE.BadRequestMax]: new HttpError(
    HTTP_STATUS_CODE.BadRequestMax,
    'Bad Request 当前无法发起正确的网络请求, 请联系管理员'
  ),

  // 500 ~ 599 服务器出现异常
  [HTTP_STATUS_CODE.ServerError]: new HttpError(
    HTTP_STATUS_CODE.ServerError,
    'Server Error 服务器遇到了意料不到的情况，不能完成客户的请求'
  ),
  [HTTP_STATUS_CODE.NotImplemented]: new HttpError(
    HTTP_STATUS_CODE.NotImplemented,
    'Not Implemented 服务器不支持实现请求所需要的功能'
  ),
  [HTTP_STATUS_CODE.ServiceUnavailable]: new HttpError(
    HTTP_STATUS_CODE.ServiceUnavailable,
    'Service Unavailable 服务不可用'
  ),
  [HTTP_STATUS_CODE.GatewayTimeout]: new HttpError(
    HTTP_STATUS_CODE.GatewayTimeout,
    'Gateway Timeout 网关超时'
  ),
  [HTTP_STATUS_CODE.HTTPVersionNotSupported]: new HttpError(
    HTTP_STATUS_CODE.HTTPVersionNotSupported,
    'HTTP Version Not Supported 服务器不支持请求中所指明的HTTP版本'
  ),
  [HTTP_STATUS_CODE.ServerExceptionMin]: new HttpError(
    HTTP_STATUS_CODE.ServerExceptionMin,
    'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员'
  ),
  [HTTP_STATUS_CODE.ServerExceptionMax]: new HttpError(
    HTTP_STATUS_CODE.ServerExceptionMax,
    'Server Exception 服务器出现异常，请耐心等待后重试或联系管理员'
  ),

  // 600 ~ 出现未知异常
  [HTTP_STATUS_CODE.UnkownError]: new HttpError(
    HTTP_STATUS_CODE.UnkownError,
    'Unkown Error 出现了未知错误,  请联系管理员'
  )
}

export { HTTP_STATUS_CODE, HttpError, HTTP_ERROR_CONSTANT }
