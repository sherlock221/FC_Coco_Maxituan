import Player from "./\bPlayer";


// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {


    @property(cc.Prefab)
    FirePreFab : cc.Prefab;

    @property(cc.Prefab)
    FireFrontPreFab : cc.Prefab;

    @property(cc.Prefab)
    PlayerPrefab : cc.Prefab;

    @property(cc.AudioClip)
    EndSound;

    // onLoad () {}

    winSize : cc.Size;
    timer :number = 0;
    playerNode : cc.Node;    
    player : Player;
    spriteNode : cc.Node;
    bgAudio : cc.AudioSource;


    start () {

        this.winSize = cc.view.getVisibleSize();       
        this.spriteNode = cc.find("Canvas/sprite_layer");

        this.bgAudio = this.getComponent(cc.AudioSource);

        //创建主角
        this.playerNode = cc.instantiate(this.PlayerPrefab);
        this.playerNode.setLocalZOrder(2)
        this.playerNode.parent = this.spriteNode;
        this.playerNode.position = cc.p(-this.winSize.width /2  + this.playerNode.width /2,-68);
        this.player  = this.playerNode.getComponent(Player);
        

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;

    }

    update (dt) {
       
        
 

       //创建火圈
       this.timer +=1;
       if(this.timer * 0.25 > 100 && cc.random0To1() * 100 < 2 && this.player.status == 0){
             console.log("创建火圈..");
            let fire = cc.instantiate(this.FirePreFab);
            let fireFront = cc.instantiate(this.FireFrontPreFab);

             //设置index
            fire.setLocalZOrder(1);         
            fireFront.setLocalZOrder(3);   
            
            fire.parent  = this.spriteNode;
            fireFront.parent = this.spriteNode;           
            fire.position = cc.p(this.winSize.width / 2   + 30 ,-17);
            fireFront.position = cc.p(this.winSize.width / 2 + 6   + 30 ,-17);          
            this.timer = 0;
            
        }
            

    }

    /**
     * 结束游戏
     */
    public stopGame (){        

         cc.director.pause();   
         //停止背景音乐
         this.bgAudio.stop();
         //播放结束音效
         cc.audioEngine.play(this.EndSound,false,1)
                 
         setTimeout(function(){
            cc.director.loadScene("GameScene");
            cc.director.resume();
         },4000);
    }
}
