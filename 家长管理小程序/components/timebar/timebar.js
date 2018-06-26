Component({
  /**
   * properties/data中的变量都可以在wxml中通过{{}}格式引用，properties优先级高于data
   */
  properties: {    
  },
  data: {
    time_descibe: "说明：修改后徐退出家长管理，息屏再唤醒机器，时间控制才生效；在休息时间段输入家长密码解锁也可正常使用!",
    timeTip:"",
    // 这里是一些组件内部数据
    changTimeTag: false,
    changTimePos: 1,
    times: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"
      , "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"
    ],
    timeLine: {
      x1: 36,
      width1: 84,
      x2: 168,
      width2: 228,
      time1:"3:00",
      time2:"7:00",
      time3:"14:00",
      time4:"19:00"
    }
   
  },
  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached:function(){
    this.drawTimeLine();
    var timeTip = this.makeTimeTipTetx(this.data.timeLine);
    this.setData({
      timeTip: timeTip
    });
    
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    _onTouchStart: function (e) {
      console.log("component ontouchstart");
      var changTimeTag, changTimePos;
      var curPos = [e.touches[0].x, e.touches[0].y];
      var line = this.data.timeLine;//通过this.data获取组件内部参数
      if (curPos[0] > line.x1 && curPos[0] < line.x1 + 20) {//第一段时间线左
        changTimeTag = true;
       changTimePos = 1;
      } else if (curPos[0] > line.width1 - 20 && curPos[0] < line.width1) {//第一段时间右
      changTimePos = 2;
        changTimeTag = true;
      } else if (curPos[0] > line.x2 && curPos[0] < line.x2 + 20) {
       changTimePos = 3;
      changTimeTag = true;
      } else if (curPos[0] > line.width2 - 20 && curPos[0] < line.width2) {//第一段时间右
       changTimePos = 4;
       changTimeTag = true;
      } else {
       changTimeTag = false;
      }
      if(changTimeTag){
         this.setData({
           changTimeTag:changTimeTag,
           changTimePos:changTimePos
         })
      }
    },
    _onTouchMove: function (e) {//6px为半小时，12px为1小时
      console.log("component ontouchmove");

      if (!this.data.changTimeTag) {
        return;
      }
      console.log(e.touches[0].x);

      if (e.touches[0].x > 308 || e.touches[0].x <20) {
        return;
      }
      var curPos = [e.touches[0].x, e.touches[0].y];
      var line = this.data.timeLine;
      var times = this.data.times;
      var timePos = parseInt(((curPos[0]-20) / 12).toFixed(0));
      if (timePos > 24) {
        timePos = 24;
      }
      if (timePos < 0) {
        timePos = 0;
      }
      switch (this.data.changTimePos) {
        case 1:
          line.time1 = times[timePos];
          if (curPos[0] > line.width1 - 24) {
            return;
          }
          line.x1 = curPos[0];
          break;
        case 2:
          if (curPos[0] < line.x1 + 12||curPos[0]>line.x2-24) {
            return;
          }
          line.time2 = times[timePos];
          line.width1 = curPos[0];
          break;
        case 3:
          if (curPos[0] > line.width2 - 12||curPos[0]<line.width1+18) {
            return;
          }
          line.time3 = times[timePos];
          line.x2 = curPos[0];
          break;
        case 4:
          if (curPos[0] < line.x2 + 12) {
            return;
          }
          line.time4 = times[timePos];
          line.width2 = curPos[0];
          break;
      }
      // var tip="在时间段"+line.time1+"到"+line.time2+"，"+line.time3+"到"+line.time4+"之间可以使用kimi，其它时间为休息时间";
      var timeTip = this.makeTimeTipTetx(line);
      this.drawTimeLine();
      this.setData({
        timeLine:line,
        timeTip: timeTip
      })
    },
    /**
     * 创建时间提示
     */
    makeTimeTipTetx: function (line) {
      return "在时间段" + line.time1 + "到" + line.time2 + "，" + line.time3 + "到" + line.time4 + "之间可以使用kimi，其它时间为休息时间";
      },
    /**
     * 绘制时间线
     */
    drawTimeLine: function () {//305 100
      var context = wx.createCanvasContext("time_canvas", this)
      var line = this.data.timeLine;
      function drawRect(x, y, w, h, color) {
        context.beginPath();
        context.rect(x, y, w, h);
        context.setFillStyle(color);
        context.setStrokeStyle('rgba(1,1,1,0)')
        context.fill();
        context.stroke();
      }
      function drawTime(time, x, y) {
        context.setFontSize(12);
        context.fillText(time, x, y);
      }


      drawRect(20, 30, 288, 10, "#00a0a0");//背景线
      drawRect(line.x1, 30, line.width1 - line.x1, 10, "#f0a0a0");
      drawTime(line.time1, line.x1 - 15, 25);
      drawTime(line.time2, line.width1 - 15, 25);

      drawRect(line.x2, 30, line.width2 - line.x2, 10, "#f0a0a0");
      drawTime(line.time3, line.x2 - 15, 25);
      drawTime(line.time4, line.width2 - 15, 25);
      context.draw();
    },


  }


})