<template>
  <div class="el-contents">
    <div class="lump-wrap">
      <div class="lump-head" v-if="$slots.header">
        <slot name="header"></slot>
      </div>
      <div class="lump-body">
        <slot></slot>
      </div>
      <div class="lump-foot" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ElCentent",
    props: {},
    data() {
      return {}
    }
  }

</script>


<style>
  .el-contents {
    box-sizing: border-box;
    -webkit-box-flex: 1;
    flex: auto;
    padding: 15px;
  }

  .el-contents[bespread] {
    height: 100%;
    flex-direction: column;
    display: flex;
  }

  .el-contents[auto] {
    height: auto;
  }

  .el-contents .lump-wrap {
    box-sizing: border-box;
    -webkit-box-flex: 1;
    flex: auto;
    border-radius: 3px;
    box-shadow: 0 0px 5px rgba(0, 0, 0, .15);
    background-color: #fff;
  }

  .el-contents .lump-head {
    min-height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #F3F3F3;
    position: relative;
  }

  .el-contents .lump-body {
    display: block;
    text-align: left;
    overflow-x: hidden;
  }

  .el-contents[bespread] .lump-wrap {
    height: 100%;
    flex-direction: column;
    display: flex;
  }

  .el-contents[bespread] .lump-body {
    flex: 1;
    overflow-y: auto;
  }

  .el-contents .lump-foot {
    min-height: 40px;
    line-height: 40px;
    position: relative;
    background-color: #fff;
  }

</style>
