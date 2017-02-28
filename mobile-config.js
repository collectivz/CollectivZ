App.accessRule('http://*');
App.accessRule('https://*');

App.setPreference('android-targetSdkVersion', '21');

App.info({
  id: 'com.union.collectivz',
  name: 'CollectivZ Union',
  version: '0.85',
});

App.icons({
  ios_settings: 'public/img/mobile/ios/icon/icon-ios-29.png',
  ios_settings_2x: 'public/img/mobile/ios/icon/icon-ios-58.png',
  ios_spotlight: 'public/img/mobile/ios/icon/icon-ios-40.png',
  ios_spotlight_2x: 'public/img/mobile/ios/icon/icon-ios-80.png',
  ipad: 'public/img/mobile/ios/icon/icon-ios-76.png',
  ipad_2x: 'public/img/mobile/ios/icon/icon-ios-152.png',
  iphone_2x: 'public/img/mobile/ios/icon/icon-ios-120.png',
  iphone_3x: 'public/img/mobile/ios/icon/icon-ios-180.png',
  android_mdpi: 'public/img/mobile/android/icon/mipmap-mdpi/ic_launcher.png',
  android_hdpi: 'public/img/mobile/android/icon/mipmap-hdpi/ic_launcher.png',
  android_xhdpi: 'public/img/mobile/android/icon/mipmap-xhdpi/ic_launcher.png',
  android_xxhdpi: 'public/img/mobile/android/icon/mipmap-xxhdpi/ic_launcher.png',
  android_xxxhdpi: 'public/img/mobile/android/icon/mipmap-xxxhdpi/ic_launcher.png',
});

App.launchScreens({
  iphone_2x: 'public/img/mobile/ios/splashscreen/Default@2x~iphone_640x960.png',
  iphone5: 'public/img/mobile/ios/splashscreen/Default-568h@2x~iphone_640x1136.png',
  iphone6: 'public/img/mobile/ios/splashscreen/Default-750@2x~iphone6-portrait_750x1334.png',
  iphone6p_portrait: 'public/img/mobile/ios/splashscreen/Default-1242@3x~iphone6s-portrait_1242x2208.png',
  iphone6p_landscape: 'public/img/mobile/ios/splashscreen/Default-1242@3x~iphone6s-landscape_2208x1242.png',
  ipad_portrait: 'public/img/mobile/ios/splashscreen/Default-Portrait~ipad_768x1024.png',
  ipad_portrait_2x: 'public/img/mobile/ios/splashscreen/Default-Portrait@2x~ipad_1536x2048.png',
  ipad_landscape: 'public/img/mobile/ios/splashscreen/Default-Landscape~ipad_1024x768.png',
  ipad_landscape_2x: 'public/img/mobile/ios/splashscreen/Default-Landscape@2x~ipad_2048x1536.png',
  android_mdpi_portrait: 'public/img/mobile/android/splashscreen/drawable-mdpi/screen.png',
  android_mdpi_landscape: 'public/img/mobile/android/splashscreen/drawable-land-mdpi/screen.png',
  android_hdpi_portrait: 'public/img/mobile/android/splashscreen/drawable-hdpi/screen.png',
  android_hdpi_landscape: 'public/img/mobile/android/splashscreen/drawable-land-hdpi/screen.png',
  android_xhdpi_portrait: 'public/img/mobile/android/splashscreen/drawable-xhdpi/screen.png',
  android_xhdpi_landscape: 'public/img/mobile/android/splashscreen/drawable-land-xhdpi/screen.png',
  android_xxhdpi_portrait: 'public/img/mobile/android/splashscreen/drawable-xxhdpi/screen.png',
  android_xxhdpi_landscape: 'public/img/mobile/android/splashscreen/drawable-land-xxhdpi/screen.png',
});
