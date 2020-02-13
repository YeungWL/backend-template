<template>
  <el-content bespread>
    <div class="je-pl10 je-pr10 je-f16" slot="header">{{$route.meta.title}}</div>
    <div class="je-ovh je-p10">
      <el-button type="primary" icon="el-icon-plus" @click="adminShow" plain>添加管理员</el-button>
    </div>
    <div class="je-ovh je-p10">
      <el-table :data="adminList.list" border style="width: 100%" v-loading="loading"
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
        <el-table-column prop="id" label="ID" width="80" align="center" fixed="left"></el-table-column>
        <el-table-column prop="user_name" label="管理员账号" min-width="160" fixed="left"></el-table-column>
        <el-table-column prop="real_name" label="管理员姓名" width="160"></el-table-column>
        <el-table-column prop="nick_name" label="管理员昵称" min-width="160"></el-table-column>
        <el-table-column prop="email" label="管理员邮箱" min-width="160"></el-table-column>
        <el-table-column prop="mobile" label="管理员电话" min-width="160"></el-table-column>
        <el-table-column prop="status" label="是否启用" width="100" align="center">
          <template v-slot="{row}">
            <el-tag type="success" size="small" v-if="row.status === 1">启用</el-tag>
            <el-tag type="danger" size="small" v-if="row.status === 0">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="管理员备注" min-width="160"></el-table-column>
        <el-table-column label="操作" align="center" width="300" fixed="right">
          <template v-slot="{row}">
            <elButton size="mini" type="primary" plain @click="relationRoleShow(row)">关联用户角色</elButton>
            <el-button size="mini" type="success" plain @click="editAdminShow(row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="delsAdmin(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="je-tc" slot="footer">
      <elPagination background layout="total, prev, pager, next" :current-page.sync="currPage" :total="adminList.total"
        :page-size.sync="pageSize" @current-change="changePage"></elPagination>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog :title="(isAdd ? '添加':'编辑')+'管理员'" :visible.sync="adminLayer" center width="500px"
      :close-on-click-modal="false" @close="clearInput">
      <el-form :model="form" :rules="rules" ref="adminForm">
        <el-form-item label="管理员账号" label-width="120px" prop="user_name" class="je-pr30">
          <el-input v-model="form.user_name" placeholder="请输入管理员名称" :disabled="!isAdd" />
        </el-form-item>
        <el-form-item label="管理员密码" label-width="120px" prop="password" class="je-pr30">
          <el-input v-model="form.password" placeholder="请输入管理员密码" />
        </el-form-item>
        <el-form-item label="管理员姓名" label-width="120px" prop="real_name" class="je-pr30">
          <el-input v-model="form.real_name" placeholder="请输入管理员姓名" />
        </el-form-item>
        <el-form-item label="管理员昵称" label-width="120px" prop="nick_name" class="je-pr30">
          <el-input v-model="form.nick_name" placeholder="请输入管理员昵称" />
        </el-form-item>
        <el-form-item label="管理员邮箱" label-width="120px" prop="email" class="je-pr30">
          <el-input v-model="form.email" placeholder="请输入管理员邮箱" />
        </el-form-item>
        <el-form-item label="管理员电话" label-width="120px" prop="mobile" class="je-pr30">
          <el-input v-model="form.mobile" placeholder="请输入管理员电话" />
        </el-form-item>
        <el-form-item label="是否启用" label-width="120px" prop="status" class="je-pr30">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio :label="1" border>启用</el-radio>
            <el-radio :label="0" border>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="管理员备注" label-width="120px" prop="remark" class="je-pr30">
          <el-input type="textarea" :rows="2" v-model="form.remark" placeholder="请输入管理员备注内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdminInfo">提 交</el-button>
        <el-button @click="adminLayer = false">关 闭</el-button>
      </div>
    </el-dialog>
    <!-- 关联角色 -->
    <el-dialog title="关联角色" :visible.sync="relationLayer" width="600px" center @close="relationId=0">
      <el-table :data="roleList.list" style="width: 100%" border
        :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
        <el-table-column label="选择" width="80" align="center">
          <template v-slot="{row}">
            <el-radio v-model="roleId" :label="row.id"><span></span></el-radio>
          </template>
        </el-table-column>
        <elTable-column prop="role_name" label="角色名称" width="150"></elTable-column>
        <elTable-column prop="description" label="描述"></elTable-column>
      </el-table>
      <div slot="footer" style="je-tc">
        <elButton @click="relationLayer = false">取 消</elButton>
        <elButton type="primary" @click="relationRoleHandler">关 联</elButton>
      </div>
    </el-dialog>
  </el-content>
</template>

<script>
  export default {
    name: "AdminList",
    data() {
      return {
        loading: false,
        currPage: 1,
        pageSize: 16,
        adminLayer: false,
        relationLayer: false,
        isAdd: true,
        adminList: [],
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
        rules: {},
        roleList: [],
        roleId: 0
      }
    },
    created() {
      this.getAdminList()
    },
    methods: {
      getAdminList() {
        let that = this;
        that.cateMenuList = []
        that.api.getAdmin({
          pageNo: that.currPage,
          pageSize: that.pageSize
        }).then(json => {
          if (json.data.code === 200) {
            that.adminList = json.data.data
            that.loading = false
          }
        })
      },
      clearInput() {
        this.$refs['adminForm'].resetFields()
      },
      adminShow() {
        this.adminLayer = true
        this.isAdd = true
      },
      async addAdmin() {
        const {
          data: {
            code,
            msg
          }
        } = await this.api.addAdmin(this.form)
        if (code === 200) {
          this.$message.success(msg)
          this.getAdminList()
          this.adminLayer = false
        }
      },
      editAdminShow(data) {
        this.adminLayer = true
        this.form = Object.assign({}, data)
        this.isAdd = false
      },
      async editAdmin() {
        const {
          data: {
            code,
            msg
          }
        } = await this.api.editAdmin(this.form)
        if (code === 200) {
          this.$message.success(msg)
          this.getAdminList()
          this.adminLayer = false
        }
      },
      delsAdmin() {},
      // 显示关联角色面板
      relationRoleShow(data) {
        this.relationLayer = true
        this.adminID = data.id
        this.getRoleList()
        this.getAdminRole()
      },
      async getAdminRole() {
        const {
          data: {
            code,
            data
          }
        } = await this.api.getAdminRole({
          admin_id: this.adminID
        })
        if (code === 200) {
          this.roleId = data
        }
      },
      // 关联角色
      async relationRoleHandler() {
        const {
          data: {
            code,
            msg
          }
        } = await this.api.saveAdminRole({
          admin_id: this.adminID,
          role_id: this.roleId
        })
        if (code === 200) {
          this.$message.success(msg)
          this.relationLayer = false
        }
      },
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
      submitAdminInfo() {
        this.isAdd ? this.addAdmin() : this.editAdmin()
      },
      changePage(page) {
        this.currPage = page
      }
    }
  }

</script>
