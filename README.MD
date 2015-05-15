- 1 April 2015:  Set up git repository for emulator and prototype.
- 7 April 2015:  Updated README to include repository set up instructions and added collaborator list.
- 15 April 2015: Added git branch instructions
- 19 April 2015: Added EGit setup instructions.
- 15 May 2015:   Updated README to reflect emulator installation instructions.

# COSC345 Emulator and Smart Watch Application


##Collaborators:
* Isabel Baltazar - ifbalta@github.com
* Lennox Huang    - lennsum@github.com
* Raeciel Reyes  - raeciel@github.com
* Huijun Zhou - HuijunZhou@github.com

The emulator is a compatibility layer between the browser and smart watch application.
The smart watch application is a JavaScript implementation of
the classic ball-in-a-maze game.

Language: `JavaScript`

Dependencies:
* `jQuery` version 1.11.1
* `QUnit` version 1.18.0

##Installing the emulator


###Getting the code:
Type `git clone https://github.com/ifbalta/COSC345---Emulator-and-Prototype.git` into the command line or a git client. This command will create a folder called
COSC345--Emulator-and-Prototype in your local directory
and create a local copy of the repository.

The emulator is compatible with Safari. Once you've cloned the repository, simply open `index.html` in Safari.

### Not using Safari?
The emulator is also compatible with Chrome, Internet Explorer, and Opera if you use a server.
The emulator comes with a node.js server powered by Express.js.

#### Running the server      
   * Install node.js from [nodejs.org](https://nodejs.org/download/)
   * Install Express.js using `npm install express --save` on the command line
   * Navigate to the webRoot directory and start the server using the command
     `node bootup`
   * Documentation for both the emulator and maze game is available under `index.html`

##Playing the maze game
   * Start the emulator
   * Select *Maze Game* from the drop down menu
   * Enjoy!