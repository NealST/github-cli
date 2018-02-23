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
There is a situation may raise your attention in the process of usage. In the essence, command line is a client type, when you input a command to create, update, or remove data, you need complete identity authentication firstly, in github, this authentication could be accomplished by the way of creating a personal access token, so when you encounter a interface that alert you to input your identity token like this:  
![](https://ws4.sinaimg.cn/large/006tNc79gy1foqltggkjsj30n507ptgk.jpg)  

what you need to do firstly is create it at [generate token address](https://github.com/settings/tokens)  


![](https://ws2.sinaimg.cn/large/006tNc79gy1foqjrqrd5zj30rp09idhm.jpg)  

![](https://ws3.sinaimg.cn/large/006tNc79gy1foqklllx1dj30r405n3zh.jpg)    

![](https://ws4.sinaimg.cn/large/006tNc79gy1foqkn4p1utj30r608ita3.jpg)  

![](https://ws2.sinaimg.cn/large/006tNc79gy1foqko6r97tj30oi06gt9j.jpg)  

when you select the scopes for this access token,a better choice is making all those scopes checked in case this access token can not comlete some actions that need authentication.
After input the description and select the scopes,you could click the generate token button to create your personal access token, thus copy this token to the command line question interface.

Currently, this command line tool has supported the main types of github actions, such as search, repositories, pull request, pesonal user, reaction, issues.The usage detail of these commands scope as follows:  

## Repository
You could get the supported command list of repository scope through
```
$ gh rs
```

