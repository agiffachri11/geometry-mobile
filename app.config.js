export default {
  expo: {
    name: "Geometry3D",
    slug: "geometry-mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#2B3A67",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#2B3A67",
      },
      package: "com.agiffachri.Geometry3D",
      googleServicesFile: "./config/google-services.json",
    },
    extra: {
      eas: {
        projectId: "886a1f7a-3d94-4bf8-bb54-e30eef54d80c",
      },
    },
  },
};
