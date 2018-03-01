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

## Attention
There is a situation may raise your attention in the process of usage. In the essence, command line is a client type, when you input a command to create, update, or remove data, you need complete identity authentication firstly, in github, this authentication could be accomplished by the way of creating a personal access token, so when you encounter a interface that alert you to input your identity token,  
![](https://s1.ax1x.com/2018/02/28/9B7vxP.jpg)
 what you need to do firstly is create it at [generate token address](https://github.com/settings/tokens)  


![](https://ws2.sinaimg.cn/large/006tNc79gy1foqjrqrd5zj30rp09idhm.jpg)  

![](https://ws3.sinaimg.cn/large/006tNc79gy1foqklllx1dj30r405n3zh.jpg)    

![](https://ws4.sinaimg.cn/large/006tNc79gy1foqkn4p1utj30r608ita3.jpg)  

![](https://s1.ax1x.com/2018/02/28/9B7pN9.jpg)

when you select the scopes for this access token,a better choice is making all those scopes checked in case this access token can not comlete some actions that need authentication.
After input the description and select the scopes,you could click the generate token button to create your personal access token, thus copy this token to the command line question interface.

## Detail
Currently, this command line tool has supported the main types of github actions, such as search, repositories, pull request, pesonal user, reaction, issues.The usage detail of these commands scope as follows:  

### Repository
You could get the supported command list of repository scope through
```
$ gh rs
```  
rs command has eight child commands and nearly every child command has some child options, the detail introduction as follows:  
![](https://ws3.sinaimg.cn/large/006tNc79gy1forfbbni9cj30vo0n4q54.jpg)  

1. ls  
the child command 'ls' is for listting all the repositories data belong to a github user, it has some child options to get different type of data:  
![](https://ws1.sinaimg.cn/large/006tNc79gy1forjbol99pj30v80y4n0l.jpg)  

2. cr  
Th child command cr is for making create actions, it has following child options:  
![](https://ws2.sinaimg.cn/large/006tNc79gy1forjz33usgj30v80gsab3.jpg)  

3. et  
The child command et is for making edit actions, it has following child options:  
![](https://ws4.sinaimg.cn/large/006tNc79gy1fork5o0yw4j30uw0bqjs0.jpg)  

4. rm  
This child command is for making delete actions, it has following child options:  
![](https://ws4.sinaimg.cn/large/006tKfTcgy1forkfueuogj30qe0e00te.jpg)  

5. st  
This child command is for making set actions, it has following child options:  
![](https://ws4.sinaimg.cn/large/006tKfTcgy1forkk45hizj30r20e0q3p.jpg)  

6. ck  
This child command is for making check actions,it has following child options:  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1forlbjkm2vj30v80c8t9c.jpg)  

7. ts  
This child command is for transfering your repositories to another githug user,it has no child options  

8. fk  
This child command is for forking a repository,it has no child options  

### Issues  
you could get the supported command list of issues scope through  
```
$ gh iu
```  
iu command has four child commands to complete different tasks, the detail command list as follows:  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1forn3djo21j30pi0e0wf6.jpg)  

1. ls  
This command is for listing issues data, it has some child options to do different things:  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fornmrwnpmj30v80j2gmz.jpg)  

2. cr  
This command is for making create actions, it has following child options  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fornxpbdwmj30v80j2q47.jpg)  

3. et  
This command is for making edit issue actions,it has following child options  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1foro2hs895j30tw0bq74t.jpg)  

4. rm  
This command is for making delete issue actions, it has following child options:  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1foro96dsnrj30ue0bqgm6.jpg)  

### Pull request  
The commands of this scope are designed to complete the tasks of pull requests, you could get the supported command list through 
```
$ gh pr
```  
this command has seven child commands, the detail list as follows:  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1forp5e1vjtj30vo0kujtc.jpg)  

1. ls  
This child command is for listing pull request data, it has some child options to display different types of data  
![](https://ws2.sinaimg.cn/large/006tKfTcgy1forpl9iqfbj30v80t6q5e.jpg)  

2. cr  
This child command is for making create actions,it support following child options:  
![](https://ws2.sinaimg.cn/large/006tKfTcgy1forq6ylblbj30v80d4js3.jpg)  

3. et  
This child command is for making edit actions for pull request,it support following child options:  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1forqavoqibj30v80au3yw.jpg)  

4. rm  
This child command is for making delete actions for pull request,it support following child options:  
![](https://s1.ax1x.com/2018/02/27/9BPPYV.png)  

5. other child commands  
Except the commands described above,there are other three child commands without child options,they are 'mr', 'st', 'ds',I have introduced them on the initial image  

### Reaction  
Reaction scope is responsible for processing some tasks using emoji.You could get the supported command list through  
```
$ gh rt
```  
The detail usage as follows:  
![](https://s1.ax1x.com/2018/02/27/9BFrZj.png)  

1. ls  
This child command is for listing datas about reactions,the supported child options as follows:  
![](https://s1.ax1x.com/2018/02/27/9BeqfA.png)  

2. cr  
This child command is for creating reactions, the suppored child options as follows:  
![](https://s1.ax1x.com/2018/02/27/9BnSjx.png)  

### Search  
This scope is responsible for completing the task of searching,you could get supported child options list through  
```
$ gh sr
```  
The detail usage as follows:  
![](https://s1.ax1x.com/2018/03/01/9rlbEq.png)  

### Users
This scope is responsible for personal actions, you could get the supported child commands and options through  
```
$ gh us
```
the detail usage as follows:  
![](https://s1.ax1x.com/2018/02/27/9BMY2d.png)  


# End
Initially, creating github-cli is just for save the time of checking in and out between the environments of command line and website,after using it for a month, I decided to share this tool with you and I hope that this tool could dou you a favor.If you have any question or suggestion about this tool,please contact me or create an issue for this repository.May you an enjoyable life!






