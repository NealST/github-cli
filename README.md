# Description
This project is designed to supply the conveniance of completing a variety github actions in commamd line.  
I am a command line fans, just inputting the command and everything is well done gives me a lot of enjoyment, especially in the process of developing applications.  
At the same time, I visit github website frequently to look for something interesting. This results to that I have to checkout my acting environment,either from command line to website or the contrary, which is time consuming. I have searched for whether there exist some good command line tools could help me solve this problem, but the result is frustrating. So I decided to create a command line on my own.  

# Usage  
## Install
To use this tool, firstly you need install it, there are two ways you could achive the install.  
```
$ npm i -g gihub-cli  // npm install
$ yarn add github-cli -g // yarn install
```  
After install you could get the detail command information through  
```
$ gh
```
There is a situation may raise your attention in the process of usage. In the essence, command line is a client type, when you input a command to create, update, or remove data, you need complete identity authentication firstly, in github, this authentication could be accomplished by the way of creating a identity token, so when you encounter a interface that alert you to input your identity token, what you need to do is just copy it from the github website and then paste in the command line.  
Currently, this command line tool has supported the main types of github actions, such as search, repositories, pull request, pesonal user, reaction, issues.The usage detail of these commands scope as follows:  

## Repository
You could get the supported command list of repository scope through
```
$ gh rs
```

