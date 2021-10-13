import { Utils, Application } from '@nativescript/core'

export const hideKeyboard = () => {
  if (Application.ios) {
    Application.ios.nativeApp.sendActionToFromForEvent('resignFirstResponder', null, null, null)
  } else {
    Utils.ad.dismissSoftInput()
  }
}
