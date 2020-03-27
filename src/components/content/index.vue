<template>
  <div class="el-contents">
    <div class="lump-site">
      <slot name="site">暂无导航位置</slot>
    </div>
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
  name: 'ElCentent',
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* z-index: 0; */
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  display: -webkit-box !important;
}

.el-contents .lump-site {
  width: auto;
  height: 44px;
  position: relative;
  display: -webkit-box;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  padding: 0 15px;
  border-left: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
}
.el-contents .lump-site > div {
  line-height: 40px;
}
.el-contents .lump-wrap {
  position: relative;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  flex: auto;
}

.el-contents .lump-head {
  min-height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f3f3f3;
  position: relative;
}

.el-contents .lump-body {
  display: block;
  text-align: left;
  overflow-x: hidden;
}

.el-contents[auto] .lump-wrap {
  -webkit-box-flex: 1;
  overflow: hidden;
  overflow-y: auto;
}

.el-contents[bespread] .lump-wrap {
  height: 100%;
  flex-direction: column;
  display: flex;
  border-radius: 3px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  margin: 15px 15px 15px 15px;
}

.el-contents[bespread] .lump-body {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
}

.el-contents[bespread] .lump-foot {
  min-height: 40px;
  line-height: 40px;
  border-radius: 0 0 3px 3px;
  position: relative;
  background-color: #fff;
}
</style>
