# Covid Data Sheet

## 🚀 Tech stack

<p align="center">
  <a href="https://nodejs.org"><img width=32 height=32 src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" alt="Node js logo"></a> 
	<a href="https://www.typescriptlang.org"><img width=32 height=32 src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="Typescript logo"></a> 
  <a href="https://vitejs.dev"><img width=32 height=32 src="https://vitejs.dev/logo.svg" alt="Vite logo"></a>
</p>

## How to setup the project 🏗️

#### Clone the project
- First clone the project on your local computer
```
git clone https://github.com/SacramenTeamClassroom/covid-data-sheet.git
cd covid-data-sheet
```

#### Node js
- Make sure you have v14 or higher. You can install it from the official website [here](https://nodejs.org).

#### Librairies
- Install all the required librairies with 
```npm i```

#### Run in dev mode
- Run this command
```npm run dev```

#### Build the project
- Run this command
```npm run build```

#### Serve the project
- Run this command
```npm run serve```


##### Note

Flag emoji don't work on Chrome Windows as Windows doesn't have any default font support for those special emoji
as a work around i've import the mozilla emoji font to get icon in the sheet but i can't use this imported font
in the text svg flag emoji that got display in the chart unless i embed the font as base64 in the svg himself 
which cause massive lag because each flag now store around 1mb of font content.
