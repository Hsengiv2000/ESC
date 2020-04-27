# ESC

Project Created for Elements of Software Construction Module. 

TO view the commit records/history, kindly view the other branches in this repo and all the branches in the repo https://github.com/teckleck19/ESC_Project.

I have included the code from https://github.com/teckleck19/ESC_Project in this repo inside the "RoutingBackend" folder.

3 commands should be run to get the whole thing setup.

1) node firstMsg.js : Handles User login and chatting with agents
2) node createUser.js : Handles signing up as a new user
3) Change directory to the "RoutingBackend" folder and run "npm start".
Note: This code is written to run on an amazon web server EC2 instance http://ec2-18-223-16-89.us-east-2.compute.amazonaws.com:3002/home
However the server is always shut down until requested. To make the code runnable on local machine, change all occurences of "http://ec2-18-223-16-89.us-east-2.compute.amazonaws.com" to "localhost".
Some third party npm installations required. 
