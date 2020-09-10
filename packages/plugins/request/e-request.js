import axios from 'axios'
import fileDownload from 'js-file-download'
import { HttpError, HTTP_STATUS_CODE, HTTP_ERROR_CONSTANT } from './request.constant'

const RequestPlugin = {
  install(Vue, opts) {
    const requestInterceptorMap = new Map()
    const responseInterceptorMap = new Map()

    /**
     *
     * @deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用
     * @param {any} catchFunction
     */
    // eslint-disable-next-line no-extend-native
    Promise.prototype.aysncErrorCatch = function(catchFunction) {
      console.warn(
        '@deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用, 请使用asyncErrorCatch方法'
      )
      this.$currentErrorCatchFunction = catchFunction
      return this
    }

    /**
     *
     * @deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用
     * @param {any} catchFunction
     */
    // eslint-disable-next-line no-extend-native
    Promise.prototype.aysncThen = function(onResolve, onReject) {
      console.warn(
        '@deprecated 单词命名出错，方法弃用，在2020-07-01之后无法使用, 请使用asyncThen方法'
      )
      this.then(onResolve, onReject)
      return this
    }

    // eslint-disable-next-line no-extend-native
    Promise.prototype.asyncErrorCatch = function(catchFunction) {
      this.$currentErrorCatchFunction = catchFunction
      return this
    }

    // eslint-disable-next-line no-extend-native
    Promise.prototype.asyncThen = function(onResolve, onReject) {
      this.then(onResolve, onReject)
      return this
    }

    const options = {
      baseURL: opts.baseURL || '',
      timeout: opts.timeout || 50000,
      method: opts.method || 'get',
      headers: opts.headers || {},
      withCredentials: opts.withCredentials || false,
      responseType: opts.responseType || 'json',
      validateStatus:
        opts.validateStatus ||
        function(status) {
          return status >= 200 && status < 300 // 默认的
        },
      maxRedirects: opts.maxRedirects || 5,
      onUploadProgress: opts.onUploadProgress,
      onDownloadProgress: opts.onDownloadProgress,
      needShowMessage: opts.needShowMessage === true || typeof opts.needShowMessage === 'undefined'
    }

    const customOptions = {
      businessValid:
        opts.businessValid ||
        function(response) {
          return response.code === '200' || response.code === 'ok'
        },
      businessTransform:
        opts.businessTransform ||
        function(data, response) {
          data.headers = response.headers
          data.data = data.data || data.table
        },
      errorCatch: function(err, needShowMessage) {
        /**
         * 返回true阻断系统提示事件
         */
        if (opts.errorCatch(err, needShowMessage)) {
          return
        }
        if (!needShowMessage) {
          return
        }
        if (err.response) {
          if (HTTP_ERROR_CONSTANT[err.response.status]) {
            Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[err.response.status].errorMsg)
          } else if (
            err.response.status >=
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorCode - 9000 &&
            err.response.status <=
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMax].errorCode - 9000
          ) {
            Vue.prototype.$message.error(
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorMsg
            )
          } else if (
            err.response.status >=
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000 &&
            err.response.status <=
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000
          ) {
            Vue.prototype.$message.error(
              HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorMsg
            )
          }
        } else if (err.message === '终止请求') {
          console.log(err.message)
        } else {
          Vue.prototype.$message.error('timeout : 网络连接超时了， 请检查您的网络设置')
        }
      },
      businessErrorCatch:
        opts.businessErrorCatch ||
        function(failRes, response, needShowMessage) {
          if (needShowMessage) {
            Vue.prototype.$message.info(failRes.message)
          }
        }
    }

    // 设置通用配置
    let instance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      method: options.method,
      headers: options.headers,
      withCredentials: options.withCredentials,
      responseType: options.responseType,
      validateStatus: options.validateStatus,
      maxRedirects: options.maxRedirects
    })

    Vue.setGlobalConfig = function(networkConfig) {
      const globalOptions = {
        ...options,
        ...networkConfig
      }
      instance.defaults = {
        ...instance.defaults,
        ...globalOptions
      }
      Vue.axios = instance
      Vue.prototype.$axios = instance
    }

    Vue.addHeaders = function(headers) {
      options.headers = {
        ...options.headers,
        ...headers
      }
      instance.defaults = {
        ...instance.defaults,
        ...options
      }
      Vue.axios = instance
      Vue.prototype.$axios = instance
    }

    Vue.addInterceptorsRequest = function(interceptorKey, callback) {
      Vue.removeInterceptorsRequest(interceptorKey)
      const requestInterceptor = instance.interceptors.request.use(callback)
      requestInterceptorMap.set(interceptorKey, requestInterceptor)
    }

    Vue.removeInterceptorsRequest = function(interceptorKey) {
      if (requestInterceptorMap.get(interceptorKey)) {
        instance.interceptors.request.eject(requestInterceptorMap.get(interceptorKey))
      }
    }

    Vue.addInterceptorsResponse = function(interceptorKey, callback) {
      Vue.removeInterceptorsResponse(interceptorKey)
      const responseInterceptor = instance.interceptors.response.use(callback)
      responseInterceptorMap.set(interceptorKey, responseInterceptor)
    }

    Vue.removeInterceptorsResponse = function(interceptorKey) {
      if (responseInterceptorMap.get(interceptorKey)) {
        instance.interceptors.request.eject(responseInterceptorMap.get(interceptorKey))
      }
    }

    Vue.post = function(urlConfig, needShowMessage) {
      const config = {
        url: urlConfig.url,
        data: urlConfig.params,
        config: {
          ...urlConfig.config,
          method: 'post'
        }
      }
      return Vue.request(config, needShowMessage)
    }

    Vue.get = function(urlConfig, needShowMessage) {
      const config = {
        url: urlConfig.url,
        params: urlConfig.params,
        config: {
          ...urlConfig.config,
          method: 'get'
        }
      }
      Vue.request(config, needShowMessage)
    }

    Vue.request = function(urlConfig, needShowMessage) {
      if (typeof needShowMessage === 'undefined') {
        needShowMessage = options.needShowMessage
      }
      urlConfig = JSON.parse(JSON.stringify(urlConfig))

      if (urlConfig.url.indexOf('?') !== -1) {
        urlConfig.url = urlConfig.url + '&' + 'timestamp=' + new Date().valueOf()
      } else {
        urlConfig.url = urlConfig.url + '?' + 'timestamp=' + new Date().valueOf()
      }
      const config = {
        ...options,
        ...urlConfig,
        url: urlConfig.url,
        method: urlConfig.method,
        params: urlConfig.params,
        headers: {
          ...options.headers,
          ...urlConfig.headers
        },
        cancelToken: urlConfig.config && urlConfig.config.cancelToken
      }
      if (config.method === 'post' || config.method === 'POST') {
        config.data = urlConfig.params
        delete config.params
      }

      // eslint-disable-next-line no-extend-native
      let promise
      promise = new Promise(function(resolve, reject) {
        instance
          .request(config)
          .then((response) => {
            const data = response.data
            // 自定义解析字段，并带上相关请求头
            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response)
              resolve(data)
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage)
              reject(data)
            }
          })
          .catch((err) => {
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      // eslint-disable-next-line no-new
      return promise
    }

    /**
     * 默认使用post方式下载文件，若需要修改则需要在传入参数的config中，添加相关配置 { method: 'post'}
     */
    Vue.download = function(urlConfig, onDownloadProgress, needShowMessage) {
      if (typeof needShowMessage === 'undefined') {
        needShowMessage = options.needShowMessage
      }
      const config = {
        ...options,
        ...urlConfig,
        timeout: urlConfig.timeout || -1,
        url: urlConfig.url,
        method: urlConfig.method,
        params: urlConfig.params,
        responseType: 'blob',
        onDownloadProgress: onDownloadProgress || urlConfig.onDownloadProgress,
        cancelToken: urlConfig.config && urlConfig.config.cancelToken
      }
      if (config.method === 'post' || config.method === 'POST') {
        config.data = urlConfig.params
        delete config.params
      }

      // eslint-disable-next-line no-new
      let promise
      promise = new Promise((resolve, reject) => {
        instance
          .request(config)
          .then((response) => {
            // console.error(response)
            const disposition = response.headers['content-disposition']
            let filename =
              disposition &&
              disposition.match(/filename=(.*)/).length > 1 &&
              decodeURI(disposition.match(/filename=(.*)/)[1])
            filename = urlConfig.filename || filename || '下载文件'
            fileDownload(response.data, filename)
            // 将文件配置放入数据
            resolve(disposition)
          })
          .catch((err) => {
            console.error(err)
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      return promise
    }

    /**
     * @param urlConfig.params 参数必须是FormData
     */
    Vue.upload = function(urlConfig, onUploadProgress, needShowMessage) {
      if (typeof needShowMessage === 'undefined') {
        needShowMessage = options.needShowMessage
      }
      const config = {
        ...options,
        ...urlConfig,
        timeout: urlConfig.timeout || -1,
        method: 'post',
        onUploadProgress: onUploadProgress || options.onUploadProgress,
        headers: {
          ...options.headers,
          ...urlConfig.headers,
          'Content-Type': 'multipart/form-data'
        },
        url: urlConfig.url,
        data: urlConfig.params
      }
      delete config.params
      // eslint-disable-next-line no-new
      let promise
      promise = new Promise((resolve, reject) => {
        instance
          .request(config)
          .then((response) => {
            const data = response.data
            // 自定义解析字段，并带上相关请求头
            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response)
              resolve(data)
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage)
              reject(data)
            }
          })
          .catch((err) => {
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      return promise
    }

    Vue.prototype.$post = Vue.post
    Vue.prototype.$get = Vue.get
    Vue.prototype.$request = Vue.request
    Vue.prototype.$download = Vue.download
    Vue.prototype.$upload = Vue.upload

    Vue.axios = instance
    Vue.prototype.$axios = instance
  }
}

RequestPlugin.axios = axios

RequestPlugin.HttpConstant = { HttpError, HTTP_STATUS_CODE, HTTP_ERROR_CONSTANT }

export default RequestPlugin
