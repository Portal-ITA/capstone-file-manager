# CapstoneJS file manager
>The tool lets you store files on your server, without using third-party services like Cloudinary. It simplifies the original capstone Storage API, takes care about setting File storage for your files, deletes useless files.
##### Requirements
Node >= v8.9.2
Mongo >= v3.4.0
The tool has **NOT** been tested on earlier versions.
##### Notice! 
As far as you're using `capstone-file-manager`, you should not set [CapstoneJS file Storage](https://capstonejs.com/api/field/file), cause it's set inside of `capstone-file-manager`.

## Installing
 
```
npm install capstone-file-manager
```
## Getting started
`capstone-file-manager` is meant to be used in models. In order to use the it do the following:
1. Require `capstone` and `capstone-file-manager` (returns a javascript class).
2. Create an instance of `capstone.List`.
3. Create a new instance of `capstone-file-manager` and pass the instance of `capstone.List` to constructor.
4. Call `init` method on newly created instance of `capstone-file-manager`.
5. Call `add` method on the instance of `capstone.List`.
```
const capstone = require('capstone);
const capstoneFileManager = require('capstone-file-manager');
const model = new capstone.List('modelName');
new capstoneFileManager(model).init();
model.add(); // add fields here
```
## Configuration
Options are used as follows:
```js
capstone.init({
    'kfm public url': '/images/',
    'kfm virtual prop key': 'src',
    'kfm uploaded files storage': '/uploads/images/'
});
```

There are three of them presented:

##### `kfm uploaded files storage` 
###### Mandatory
Set path on the server where files will be stored.
###### Use case:
If you set the option to `/uploads/images/`, files will be stored in `/uploads/images/` folder on your server.

##### `kfm public url` 
###### Optional
Set the url where files will be reachable.
Default value: `/images/`
###### Use case:
You can set this option to `/path-to-images/`, then file with the name `my-file.jpg` will be reachable on `your-domain.com/path-to-images/my-file.jpg`

##### `kfm virtual prop key` 
###### Optional
Set the name of virtual property, where link to the file will be stored.
Default value: `src`
###### Use case:
Imagine, you have the following model:
```js
const capstone = require('capstonejs');
const types = capstone.Field.Types;
const fileManager = require('capstone-file-manager');
const model = new capstone.List('modelName');

new fileManager(model).init();

model.add({
        title: { type: types.Text },
        icon: { type: types.File }
    });
```

... and later, in your template, you're gonna to get the link to the file as follows (in example we're using `pug` template engine, but this is not mandatory):
```
img(src= icon.src)
```
Pay attention, that the link to the file is stored in `src` property. If you change the `kfm virtual prop key` to, for instance, `myBeatifulVirtualProp`, then link to the file will be stored there, like:
```
img(src= icon.myBeatifulVirtualProp)
```

## How it works
The tool is built according to Facade pattern. It reveals only one simple method init and for correct work requires model. Capstone-file-manager wraps the capstone `add` method and does some magic inside.
