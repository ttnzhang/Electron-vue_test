<template>
  <div id="wrapper" class='home-background'>
  <Header class="header"></Header>
  <div class='carouselDIV'>
      <Carousel autoplay v-model="value2" loop >
        <CarouselItem>
            <div class="demo-carousel">前端張半仙</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">欢迎使用</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">electron测试</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">不定时更新</div>
        </CarouselItem>
    </Carousel>
  </div>
    <Button type="primary" @click='shijian(2)'>提交[F1]</Button>
  <Row type="flex"  align="top" class="code-row-bg">
        <Col span="4"><p style="height: 80px">col-4</p></Col>
        <Col span="4"><p style="height: 30px">col-4</p></Col>
        <Col span="4"><p style="height: 100px">col-4</p></Col>
        <Col span="4"><p style="height: 60px">col-4</p></Col>
        <Col span="4"><p style="height: 60px">col-4</p></Col>
        <Col span="4"><p style="height: 60px">col-4</p></Col>
        <Col span="4"><p style="height: 60px">col-4</p></Col>
        <Col span="4"><p style="height: 60px">col-4</p></Col>
    </Row>
    <!-- <Tooltip content="Here is the prompt text">
        A balloon appears when the mouse passes over this text
    </Tooltip> -->
  </div>
</template>

<script>
import Header from '../components/LandingPage/Header.vue';
  import keyup from '../router/keyup.js'
  export default {
    components: {
      Header,
    },
    name: 'landing-page',
    data () {
      return {
        value2: 0,
        result: '',
      }
    },
    
    methods: {
      shijian(type){
        console.log(type)
        if(type === 1){
          this.$Message.info('F1');
        }else{
          this.$Message.info('点击');
        }
      },
      keyupSubmit(){
        document.onkeydown=e=>{
          let _key = window.event.keyCode;
          if(_key === 112){
            this.shijian(1)
          }
        }
      },
      IsConnection(){
          if (navigator.onLine) 
          {
              alert('联网')//正常工作
          } else{
            alert('断网')
          }

      }

    },
    mounted() {
      this.keyupSubmit();
      localStorage.setItem('corpId', '123123123');
      this.IsConnection();
    },

  }
</script>

<style lang="less">
@import "../assets/less/global.less";

    .home-background {
        position: relative;
        background-color: @bg-color;
        .header {
            position: absolute;
            top: 0;
            left: @view-left;
            right: 0;
            height: @view-top;
            line-height: @view-top;
        }
       
    }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }
  #wrapper{
    width: 80%;
  }
  .carouselDIV{
    height:100px;
    width:500px;
    background:#506b9e;
    margin:0 auto;
  }
  .demo-carousel{
    color:white;
    line-height:100px;
    text-align:center;
    font-size:16px;
    font-weight:bold;
  }
  p{
    text-align:center;
    background:red;
    margin-bottom:10px;
    min-width:100px;
  }
</style>
