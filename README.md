# Read Me
This is forked from Daniel Hill's repo. All the hard work in gathering links is credited to Daniel Hill and Caleb Monroe. https://github.com/danieljhill/comicwriterservices

## Vue
There is a script, ```comicwriterservices_v2.js``` in ```src/app/public/script``` folder which controls how the JSON data is retrieved, organised and then rendered on screen. 

## IDE
You can test the web application with JetBrains Webstorm or any other IDE. Please ensure that the directory ````src/app```` is configured as the web root folder.
Otherwise, the relative paths for CSS, javascript, and data json would be incorrect.

## Directories

### css generator
This folder contains a script and a config file to generate a CSS stylesheet to your web app folder. Tailwind CLI is used to export a CSS file.

Some of the Tailwind syntax may need reworking. It's using old syntax from long before Tailwind updated their CLI.

### data_generator - Excel Spreadsheet
This folder contains a spreadsheet listing articles details and their authors. 
The source of those articles came from the original file ```comicwriterserivces```. Those details were manually added to the spreadsheet and
then cleaned up to avoid formatting issues. Each article has an ID, which is manually entered. 
Those article IDs are used in the ```authors.html``` webpage to link articles to each author. 

The ```ExcelToJSON.js``` script reads the spreadsheet, and then exports articles and authors to a ```data.json``` file.
The script builds up a collection of article details and authors in an javascript array. 
Validation checks are implemented to prevent duplicate entries from being added to those arrays. 

At the end of the process, it will export the data to a josn file ```data.json```. 
The data will exported as one line to keep the file size small. 
If you wish to make the json file readable, in Webstorm IDE, go to the menu ```Code > Reformat File...```. Select whole file and click on ```Run```.

If you don't want a worksheet to be exported, prefix the worksheet name with a dash e.g. ```-Writing for Comics (General)```. 
Worksheet names can be found at bottom of spreadsheet.

Do not manually edit the ````data.json```` file because it will be subsequently overwritten by the ````ExelToJSON.js```` process. 
Save your changes inside the spreadsheet, instead.

## NPM commands

All of the npm commands can be found in the package.json file at top level. Those commands are available to use.

### prod - Tailwind CSS

```npm run prod```

Running the above command will export a Tailwinds CSS stylesheet to the ```css``` folder. 
It will create a CSS file with a smaller file size, suitable for production server. 
It will only include CSS style rules used in the webpages or javascript. It will look for any CSS style rule names in those webpages.

### exportjson

```npm run exportjson```

Running this command will export data from the spreadsheet ```Comic Writer Services.xlsx``` to a JSON file. This will save you time and effort in manually creating JSON file.

To export all data, run the command ```npm run exportjson```. In the spreadsheet, if you want to ignore any links, type "x" or any character in the "Ignore" column. If you want the process to ignore a worksheet, prefix the name of the worksheet with a dash "-" e.g. "-Editors". This means the Editors worksheet will be ignored.

## Original Repo - Read Me Notes

The original repo can be found at https://github.com/danieljhill/comicwriterservices