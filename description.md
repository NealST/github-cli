# 玩转Github的新姿势－github-cli  

## 惊鸿一瞥
这是一个可以帮助你在命令行中完成Github的各种操作的cli工具。  
创建它的初衷是因为我是一个命令行狂热爱好者，与此同时我也是一个Github的fans，每当我在命令行环境中进行开发工作时，如果此时我想看看Github上又诞生了什么新的有趣的开源项目或者我需要完成一些项目仓库之类的操作，我都需要切换到浏览器环境然后在Google中通过搜索跳转到Github的网站，找到我想要的页面去完成我要做的事。一顿操作猛如虎之后我又需要重新切回命令行环境，这样的环境切换既耗时又无趣。我又是一个很懒的人，自然这部分的时间浪费我也不能容忍。于是我开始搜索是否存在这样一个工具可以满足我的需求，但是搜索结果令人沮丧。既然如此，那就自己创造一个吧，谁让我们程序员是最有创造力的呢。  
## 揭开面纱  
前面见了Github-cli的匆匆一面，接下来就得看看它的庐山真面目了，嗯，需要聊一聊它该怎么用。首先你需要安装它  
```
$ npm i -g @mozheng-neal/github_cli
```  
安装之后你可以通过
```
$ gh -h
```  
查看支持的命令和option。  
在使用过程中需要注意的一点是有很多操作是需要做身份的权限校验的，github-cli通过Oauth的access token来完成校验。所以如果你遇到需要如下这样的要求你输入token的interface  
![](https://s1.ax1x.com/2018/02/28/9B7vxP.jpg)你需要在[开发者设置](https://github.com/settings/tokens)生成并填写该token值，该token的生成方法如下所示：  
![](https://ws2.sinaimg.cn/large/006tNc79gy1foqjrqrd5zj30rp09idhm.jpg)  

![](https://ws3.sinaimg.cn/large/006tNc79gy1foqklllx1dj30r405n3zh.jpg)    

![](https://ws4.sinaimg.cn/large/006tNc79gy1foqkn4p1utj30r608ita3.jpg)  

![](https://s1.ax1x.com/2018/02/28/9B7pN9.jpg)  
选择scopes时最好是选中所有的scope以防后续操作中遇到权限校验不通过的问题。token生成之后输入到对话框中即可，Github-cli会将您的token信息保存到本地，一次输入，长久有效。
目前该项目支持6个子域下的相关操作，包括repository,issues,pull request,reaction,search,users，接下来我们就逐一介绍
### Repository  
你可以通过如下命令来查看该scope下支持的命令
```
$ gh rs -h
```  
![](https://ws3.sinaimg.cn/large/006tNc79gy1forfbbni9cj30vo0n4q54.jpg)  
其中带有子option的命令类型拆解如下：
1. ls  
![](https://ws1.sinaimg.cn/large/006tNc79gy1forjbol99pj30v80y4n0l.jpg)  

2. cr  
![](https://ws2.sinaimg.cn/large/006tNc79gy1forjz33usgj30v80gsab3.jpg)  

3. et  
![](https://ws4.sinaimg.cn/large/006tNc79gy1fork5o0yw4j30uw0bqjs0.jpg)  

4. rm  
![](https://ws4.sinaimg.cn/large/006tKfTcgy1forkfueuogj30qe0e00te.jpg)  

5. st   
![](https://ws4.sinaimg.cn/large/006tKfTcgy1forkk45hizj30r20e0q3p.jpg)  

6. ck  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1forlbjkm2vj30v80c8t9c.jpg)  

### Issues  
你可以通过如下命令查看issues scope下支持的命令和option 
```
$ gh iu -h
```  
![](https://ws1.sinaimg.cn/large/006tKfTcgy1forn3djo21j30pi0e0wf6.jpg)  
其中带有子option的命令类型拆解如下：
1. ls  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fornmrwnpmj30v80j2gmz.jpg)  

2. cr   
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fornxpbdwmj30v80j2q47.jpg)  

3. et  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1foro2hs895j30tw0bq74t.jpg)  

4. rm  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1foro96dsnrj30ue0bqgm6.jpg)  

### Pull request  
通过如下指令你可以查看该scope下支持的命令
```
$ gh pr -h
```  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1forp5e1vjtj30vo0kujtc.jpg)  
其中带有子option的命令类型拆解如下：

1. ls  
![](https://ws2.sinaimg.cn/large/006tKfTcgy1forpl9iqfbj30v80t6q5e.jpg)  

2. cr    
![](https://ws2.sinaimg.cn/large/006tKfTcgy1forq6ylblbj30v80d4js3.jpg)  

3. et  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1forqavoqibj30v80au3yw.jpg)  

4. rm  
![](https://s1.ax1x.com/2018/02/27/9BPPYV.png)  

### Reaction  
Reaction scope主要用来查看和创建一些对comment或者issue之类数据的表情回应，你可以通过如下命令查看它所支持的子命令
```
$ gh rt -h
```   
![](https://s1.ax1x.com/2018/02/27/9BFrZj.png)  
其中带有子option的命令类型拆解如下：
1. ls  
![](https://s1.ax1x.com/2018/02/27/9BeqfA.png)  

2. cr  
![](https://s1.ax1x.com/2018/02/27/9BnSjx.png)  

### Search  
Search scope用于搜索操作，它支持的命令可以通过如下命令查看
```
$ gh sr -h
```  
![](https://s1.ax1x.com/2018/03/01/9rlbEq.png)  
### Users
该scope主要用于查看和编辑一些个人数据，它所支持的子命令可以通过如下命令查看
```
$ gh us -h
```
其使用细节如下图所示： 
![](https://s1.ax1x.com/2018/02/27/9BMY2d.png)  


## 结语
创建Github-cli的初衷只是为了节省我环境切换的时间以及享受自己亲手去设计和实现这样一个工具的快感，为了让它变得更好，并让那些像我一样遇到这种效率提升问题的开发小伙伴节省时间我决定将其开源出来，接受大家的意见反馈甚至参与共建。最后，欢迎大家使用这款工具，在使用过程中遇到任何问题可以直接提起issue，我会在第一时间给予回复。如果大家觉得这款工具不错，也请不要吝惜您的star。让我们一起把世界变得更美好。