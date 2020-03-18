<!--
 * @Date: 2020-03-12 17:13:35
 * @LastEditors: Yeung
 * @LastEditTime: 2020-03-18 14:30:00
 * @Description: 添加/编辑机器人账户dialog
 -->
<template>
  <el-dialog v-bind="$attrs"
             width="440px"
             v-dialogDrag
             center
             @opened="setFormData"
             @close="$emit('update:visible', false)">
    <el-form label-width="80px" :model="robotForm" class="robot-form" ref="robotForm" :rules="rules">
      <el-form-item label="用户昵称" prop="nickName">
        <el-input placeholder="请输入昵称" v-model="robotForm.nickName" maxlength="50">
        </el-input>
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
        <div class="item" v-if="robotForm.avatar">
          <el-image :src="robotForm.avatar"></el-image>
          <div class="headerBar">
            <i class="el-icon-delete" @click="robotForm.avatar = ''"></i>
          </div>
        </div>
        <by-upload v-else
                   :hasTabs="false"
                   @success="onUploadSuccess">
        </by-upload>
      </el-form-item>
      <el-form-item label="Ta的生日">
        <el-date-picker v-model="robotForm.birthday"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Ta的性别">
        <el-select placeholder="请选择" v-model="robotForm.sex" style="width:100%;">
          <el-option v-for="(item, index) in sexList"
                     :key="index"
                     :label="item.name"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地区">
        <el-cascader v-model="cityData"
                     :options="cityOptions"
                     style="width:100%;"
                     clearable
                     :props="{ expandTrigger: 'hover', label: 'value' }">
        </el-cascader>
      </el-form-item>
      <el-form-item label="个性签名" prop="bio">
        <el-input placeholder="不打算BB什么吗"
                  v-model="robotForm.bio"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handlePrimary">提 交</el-button>
      <el-button @click="$emit('update:visible', false)">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import city from '@/assets/mock/city.json'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'RobotDialog',
  props: {
    userData: {
      type: Object
    }
  },
  data() {
    return {
      robotForm: {
        id: '',
        nickName: '',
        avatar: '',
        birthday: '',
        sex: '',
        bio: '',
        province: '',
        city: ''
      },
      cityOptions: [],
      cityData: [],
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传头像', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      sexList: 'dict/getSexList'
    })
  },
  methods: {
    ...mapActions({
      addRobot: 'user/addRobot',
      updateUserInfo: 'user/updateUserInfo'
    }),
    setFormData() {
      this.$refs.robotForm.resetFields()
      this.robotForm = {...this.userData}
      // 回显所在地区
      if (this.robotForm.city === this.robotForm.province) {
        this.cityData = [this.robotForm.city]
      } else {
        this.cityData = [this.robotForm.province, this.robotForm.city]
      }
    },
    handlePrimary() {
      if (this.cityData.length === 2) {
        this.robotForm.province = this.cityData[0]
        this.robotForm.city = this.cityData[1]
      } else if (this.cityData.length === 1) {
        this.robotForm.province = this.cityData[0]
        this.robotForm.city = this.cityData[0]
      } else {
        this.robotForm.province = ''
        this.robotForm.city = ''
      }
      // 判断有没有ID
      this.$refs.robotForm.validate(val => {
        if (val) {
          if (this.robotForm.id) {
            delete this.robotForm.phone // 删除机器人的手机号字段
            this.updateUserInfo(this.robotForm)
              .then(res => {
                this.$message.success('更新成功')
                this.$emit('update:visible', false)
                this.$emit('onSuccess')
              })
              .catch(err => {
                this.$message.warning(err)
              })
          } else {
            this.addRobot(this.robotForm)
              .then(res => {
                this.$message.success('添加成功')
                this.$emit('update:visible', false)
                this.$emit('onSuccess')
              })
              .catch(err => {
                this.$message.warning(err)
              })
          }
        } else {
          this.$message.warning('请填写必填项')
          return
        }
      })
    },
    onUploadSuccess(val) {
      let avatar = this.$options.filters['formatStaticUrl'](val.imageList[0])
      this.robotForm.avatar = avatar
    }
  },
  mounted() {
    this.cityOptions = city.cityData
  }
}
</script>

<style lang="less" scoped>
.robot-form {
  .item {
    width: 120px;
    height: 120px;
    margin: 5px;
    position: relative;
    img {
      width: 100%;
    }
    .headerBar {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 3px;
      height: 30px;
      text-align: right;
      color: white;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
      i:hover {
        color: @danger;
        cursor: pointer;
      }
    }
  }
}
</style>