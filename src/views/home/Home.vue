<template>
  <el-content bespread>
    <div class="je-pl10 je-pr10 je-f16" slot="header">{{$route.meta.title}}</div>
    <div style="padding-top:100px;text-align: center;font-size:30px;">欢迎使用管理系统</div>
  </el-content>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from "@/components/HelloWorld.vue";
  // import Layout from "../Layout"
  export default {
    name: "home",
    components: {
      // Layout
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        // this.api.getApp().then(json => {
        //   if (json.data.code === 200) {
        //     console.log(json.data)
        //   }

        // })
      }
    }
  };

</script>
