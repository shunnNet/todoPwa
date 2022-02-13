import { VueWrapper } from '@vue/test-utils'

// window.GOOGLE_CLOUD_STORAGE = 'https://storage.googleapis.com/jackercleaning'

/**
 *
 * @param {string} appendName
 * @param {any} value
 * @returns {VueWrapper}
 */
VueWrapper.prototype.findDataTest = function (appendName = '', value = '') {
  const append = appendName ? `-${appendName}` : ''
  return this.find(`[data-test${append}="${value}"]`)
}
VueWrapper.prototype.findAllDataTest = function (appendName = '', value = '') {
  const append = appendName ? `-${appendName}` : ''
  return this.findAll(`[data-test${append}="${value}"]`)
}

VueWrapper.prototype.findField = function (field) {
  // console.log();
  return this.find(`[name="${field}"]`)
}
VueWrapper.prototype.findErrorFieldByName = function (field) {
  return this.find(`[data-test-error-name="${field}"]`)
}

VueWrapper.prototype.setFieldByValue = async function (
  field,
  value,
  event = 'input'
) {
  const VueWrapper = this.getField(field)
  VueWrapper.element.value = value
  await VueWrapper.trigger(event)
}
VueWrapper.prototype.setFieldsByValues = async function (fieldOptions = []) {
  return await Promise.all(
    fieldOptions.map(({ field, value, event = 'input' }) =>
      this.setFieldByValue(field, value, event)
    )
  )
}

VueWrapper.prototype.findErrorTextByField = function (field) {
  return this.findErrorFieldByName(field).text()
}
VueWrapper.prototype.submit = async function (selector = 'form') {
  return await this.find(selector).trigger('submit')
}
VueWrapper.prototype.click = async function (option = {}) {
  return await this.trigger('click', option)
}
VueWrapper.prototype.checkErrors = function (errorInfos) {
  errorInfos.forEach(({ name, msg }) => {
    expect(this.getErrorTextByField(name)).toBe(msg)
  })
}
VueWrapper.prototype.$nextTick = async function () {
  await this.vm.$nextTick()
  return this
}

// VueWrapper.prototype.selectFieldByValue = async function(name, value) {
//   return await this.getField(name)
//     .find(`option[value=${value}]`)
//     .setSelected()
// }
