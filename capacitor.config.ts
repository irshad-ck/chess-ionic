import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "chess-ionic",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000, // Set splash screen timeout (in milliseconds)
      launchAutoHide: true, // Disable automatic hiding of the splash screen
      backgroundColor: "#ffffff", // Splash screen background color
      androidScaleType: "CENTER_CROP", // Splash screen scaling on Android
      // showSpinner: true, // Show spinner while the splash screen is visible
      // spinnerStyle: 'large', // Customize the spinner style
      // spinnerColor: '#000000', // Customize the spinner color
    },
  },
};

export default config;
