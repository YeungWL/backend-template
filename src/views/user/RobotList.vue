<template>
  <div class="flex-direction-container">
    <el-card class="card search-card">
      <el-form inline label-width="100px" :model="formInline" class="user-from" ref="formInline">
        <el-form-item label="用户ID" prop="id">
          <el-input placeholder="请输入" v-model="formInline.id" maxlength="50" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input placeholder="请输入" v-model="formInline.nickName" maxlength="50" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input placeholder="请输入" v-model="formInline.phone" maxlength="50" clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="">
          <el-date-picker v-model="createdAtList"
                          type="datetimerange"
                          clearable
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="je-ovh">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="success" icon="el-icon-circle-plus" plain @click="handleAddRobot">添加机器人</el-button>
      </div>
    </el-card>
    <el-card class="card flex-card">
      <el-table border
                style="width: 100%"
                v-loading="loading"
                :data="list"
                class="user-table"
                :header-cell-style="{background:'#f5f7fa',color:'#606266'}">
        <el-table-column label="ID" prop="id" width="150"></el-table-column>
        <el-table-column label="用户昵称" prop="nickName"></el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="{row}">
            <el-image :src="row.avatar" fit="cover" style="width:50px;height:50px;"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="生日" align="center">
          <template v-slot="{row}">
            <span>{{row.birthday | formatFullDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" align="center" prop="phone"></el-table-column>
        <el-table-column label="性别" align="center" prop="sex">
          <template v-slot="{row}">
            <span>{{row.sex | filterGender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="所在地区" align="center">
          <template v-slot="{row}">
            <span>{{ row.city !== '' ? `${row.province}-${row.city}` : (`${row.province}` || '暂无') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个性签名" align="center" prop="bio"></el-table-column>
        <el-table-column label="创建时间" align="center">
          <template v-slot="{row}">
            <span>{{row.createdAt | formatFullDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="160">
          <template v-slot="{row}">
            <el-button plain size="mini" type="success" @click.stop="handleEditDialog(row)">编辑</el-button>
            <el-popconfirm title="确定要删除这个用户吗？" style="margin-left:1em;" @onConfirm="handleDelete(row)">
              <el-button plain size="mini" type="danger" slot="reference" @click.stop>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="toolBar">
        <el-pagination background
                      layout="total, prev, pager, next"
                      :current-page.sync="pageInfo.page"
                      :page-size.sync="pageInfo.size"
                      :total="pageInfo.total"
                      @current-change="changePage">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加机器人dialog -->
    <robot-dialog :title="`${ robotForm.id ? '编辑' : '添加' }机器人运营账号`"
                  :visible.sync="isAddRobotDialog"
                  :userData="robotForm"
                  @onSuccess="getList">
    </robot-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import RobotDialog from '@views/user/components/RobotDialog'
export default {
  name: 'RobotList',
  components: { RobotDialog },
  data() {
    return {
      list: [],
      loading: false,
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      formInline: {
        id: '',
        nickName: '',
        phone: '',
        createdAtStart: '',
        createdAtEnd: ''
      },
      createdAtList: [],
      isAddRobotDialog: false,
      robotForm: {
        id: '',
        nickName: '',
        avatar: '',
        birthday: '',
        sex: '',
        bio: '',
        province: '',
        city: ''
      }
    }
  },
  methods: {
    ...mapActions({
      getRobotList: 'user/getRobotList',
      deleteRobot: 'user/deleteRobot'
    }),
    getList() {
      this.loading = true
      this.getRobotList({
        ...this.formInline,
        ...this.pageInfo
      }).then(res => {
        this.list = res.list
        this.pageInfo = res.page
        this.loading = false
      })
    },
    changePage(page) {
      this.pageInfo.page = page
      this.getList()
    },
    handleSearch() {
      if (this.createdAtList && this.createdAtList.length) {
        this.formInline.createdAtStart = this.createdAtList[0]
        this.formInline.createdAtEnd = this.createdAtList[1]
      } else {
        this.formInline.createdAtStart = ''
        this.formInline.createdAtEnd = ''
      }
      this.pageInfo.page = 1
      this.getList()
    },
    handleReset() {
      this.formInline = {
        id: '',
        nickName: '',
        phone: '',
        createdAtStart: '',
        createdAtEnd: ''
      }
      this.createdAtList = []
    },
    handleAddRobot() {
      this.isAddRobotDialog = true
      this.robotForm = {
        id: '',
        nickName: '',
        avatar: '',
        birthday: '',
        sex: '',
        bio: '',
        province: '',
        city: ''
      }
    },
    handleEditDialog(detail) {
      this.isAddRobotDialog = true
      this.robotForm = {...detail}
    },
    handleDelete(detail) {
      this.deleteRobot(detail).then(res => {
        this.$message.success('删除成功')
        // this.pageInfo.page = 1
        // 删除最后一条数据 返回前一页面
        if (this.list.length === 1) {
          this.pageInfo.page === 1 ? this.pageInfo.page = 1 : this.pageInfo.page--
        }
        this.getList()
      }).catch(err => {
        this.$message.warning(err)
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
