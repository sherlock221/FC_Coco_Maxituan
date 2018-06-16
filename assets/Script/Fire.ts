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
export default class Fire extends cc.Component {

    winSize : cc.Size;

    @property
    speed : number = 15;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {       
        this.winSize = cc.view.getVisibleSize();
        
    }

    update (dt) {

       //撞墙销毁
       if(this.node.x < -this.winSize.width /2){          
            this.node.destroy();
        }        

        //移动
        this.node.x += - (this.speed * dt);
    }

    /**
     * 停止火圈移动
     */
    public stopFire() : void {
        this.speed = 0;
    }
   
}
