import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'com.ignacio68.arrivalsRadar',
  appPath: 'app',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
} as NativeScriptConfig
