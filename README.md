![Mux](https://cosmic-s3.imgix.net/ee0ef100-052b-11e9-a865-4d928f17b796-mux.png?w=600&h=250&fit=crop&crop=center)
# Mux Extension
Cosmic JS Extension that integrates the Mux Video Platform with your Bucket.

[View Extension](https://cosmicjs.com/extensions/mux-extension)

## Install the Extension
Follow these steps to install in your Cosmic JS Bucket:
### Option A: One click install
1. [Login to your Cosmic JS Account](https://cosmicjs.com)
2. Go to Your Bucket > Settings > Extensions and find the Mux Video Extension
3. Click "Install"
### Option B: Upload install
1. Clone the repo locally
```
git clone https://github.com/cosmicjs/mux-extension
```
2. Export the build zip
```
npm run export
```
3. Drag and drop the zip file into your Bucket Extension area located in Bucket > Settings > Extensions > Add Extension
## Connect to Mux
Next you will need to add your Mux API Access Tokens in the Extension.  Follow these steps:
1. [Login to your Mux account](https://mux.com)
2. Go to Your Settings > API Access Tokens
3. Click Generate new Token, set your environment & permissions
4. Copy and paste your API Access Tokens (Application Token ID And Secret Key) into the Extension Query Parameters section located in Your Bucket > Settings > Extensions > Mux Extension > Settings.
5. Enjoy uploading videos powered by Cosmic JS and Mux! 
