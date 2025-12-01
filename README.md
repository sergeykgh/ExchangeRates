# A simple React Native application

## Description

This is a simple React Native application. 

## Prerequisites

- Node.js
- React Native CLI
- Xcode 
- CocoaPods

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/sergeykgh/ExchangeRates.git
   cd ExchangeRates
   ```

2. Install the dependencies:
   ```
   npm install --legacy-peer-deps
   ```

3. For iOS: Install CocoaPods dependencies:
   ```
   cd ios && pod install && cd ..
   ```

## Running the App

- **iOS**:
  ```
  npx react-native run-ios
  ```

- **Android** (if set up):
  ```
  npx react-native run-android
  ```

## Troubleshooting

- If you encounter peer dependency issues, the `--legacy-peer-deps` flag handles them.
