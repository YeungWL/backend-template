<template>
  <div class="page">
    <el-card class="card">
      <el-form inline>
        <el-form-item label="ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="帖子类型">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="话题">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发帖用户ID">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发帖用户昵称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="card">
      <el-table :data="list">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="内容" prop="content"></el-table-column>
        <el-table-column label="内容类型"></el-table-column>
        <el-table-column label="分类"></el-table-column>
        <el-table-column label="标签"></el-table-column>
        <el-table-column label="话题"></el-table-column>
        <el-table-column label="浏览"></el-table-column>
        <el-table-column label="点赞"></el-table-column>
        <el-table-column label="点踩"></el-table-column>
        <el-table-column label="评论"></el-table-column>
        <el-table-column label="分享"></el-table-column>
        <el-table-column label="插眼"></el-table-column>
        <el-table-column label="收藏"></el-table-column>
        <el-table-column label="用户"></el-table-column>
        <el-table-column label="发布时间"></el-table-column>
        <el-table-column label="审核时间"></el-table-column>
        <el-table-column label="显示状态"></el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button plain size="mini" type="primary">查看详情</el-button>
            <el-button plain size="mini" type="warning">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{ id: 1 }]
    }
  }
}
</script>

<style lang="less" scoped></style>
