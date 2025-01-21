export default {
  name: "geometry-mobile",
  slug: "geometry-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#2B3A67"
  },
  assetBundlePatterns: ["**/*"],
  android: {
    package: "com.agiffachri.Geometry3D",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#2B3A67"
    },
    buildToolsVersion: "33.0.0",
    compileSdkVersion: 33,
    targetSdkVersion: 33,
    gradle: {
      javaHome: null
    }
  },
  extra: {
    eas: {
      projectId: "677b811b-8210-435c-a9e5-9d7a26c46914"
    }
  },
  owner: "alfandito"
};