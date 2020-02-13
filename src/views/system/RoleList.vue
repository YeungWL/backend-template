<template>
  <el-content bespread>
    <div class="je-pl10 je-pr10 je-f16" slot="header">{{$route.meta.title}}</div>
    <div class="je-ovh je-p10">
      <el-button type="primary" icon="el-icon-plus" @click="roleShow" plain>添加角色</el-button>
    </div>
    <div class="je-ovh je-p10">
      <el-table :data="roleList.list" border style="width: 100%" v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
        <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色名称" min-width="200"></el-table-column>
        <el-table-column prop="description" label="角色描述" min-width="300"></el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template v-slot="{row}">
            <el-button size="mini" type="success" plain @click="editRoleShow(row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="delsRole(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="je-tc" slot="footer">
      <elPagination background layout="total, prev, pager, next" :current-page.sync="currPage" :total="roleList.total"
        :page-size.sync="pageSize" @current-change="changePage"></elPagination>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog :title="(isAdd ? '添加':'编辑')+'角色'" :visible.sync="roleLayer" center width="500px"
      :close-on-click-modal="false" @close="clearInput">
      <el-form :model="form" :rules="rules" ref="roleForm">
        <el-form-item label="角色名称" label-width="120px" prop="role_name" class="je-pr30">
          <el-input v-model="form.role_name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="description" class="je-pr30">
          <el-input type="textarea" :rows="2" v-model="form.description" placeholder="请输入角色描述内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRoleInfo">提 交</el-button>
        <el-button @click="roleLayer = false">关 闭</el-button>
      </div>
    </el-dialog>
  </el-content>
</template>

<script>
  export default {
    name: "RoleList",
    data() {
      return {
        loading: false,
        currPage: 1,
        pageSize: 16,
        roleLayer: false,
        isAdd: true,
        roleList: [],
        form: {
          userName: "",
          password: "",
          realName: "",
          nickName: "",
          email: "",
          mobile: "",
          status: 1,
          remark: "",
        },
        rules: {}
      }
    },
    created() {
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        let that = this;
        that.cateMenuList = []
        that.api.getRole({
          pageNo: that.currPage,
          pageSize: that.pageSize
        }).then(json => {
          if (json.data.code === 200) {
            that.roleList = json.data.data
            that.loading = false
          }
        })
      },
      clearInput() {
        this.$refs['roleForm'].resetFields()
      },
      roleShow() {
        this.roleLayer = true
        this.isAdd = true
      },
      async addRole() {
        const {
          data: {
            code,
            msg
          }
        } = await this.api.addRole(this.form)
        if (code === 200) {
          this.$message.success(msg)
          this.getRoleList()
          this.roleLayer = false
        }
      },
      editRoleShow(data) {
        this.roleLayer = true
        this.form = Object.assign({}, data)
        this.isAdd = false
      },
      async editRole() {
        const {
          data: {
            code,
            msg
          }
        } = await this.api.editRole(this.form)
        if (code === 200) {
          this.$message.success(msg)
          this.getRoleList()
          this.roleLayer = false
        }
      },
      delsRole() {},
      submitRoleInfo() {
        this.isAdd ? this.addRole() : this.editRole()
      },
      changePage(page) {
        this.currPage = page
      }
    }
  }

</script>
