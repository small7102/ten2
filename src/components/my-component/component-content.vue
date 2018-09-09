<template>
        <div class="modal-body">
            <div class="del-notice" v-if="componentModalType==='delete'">
                <p>确认删除该选项吗？</p>
                <div class="btn-line">
                  <Button class="btn" @click="cancelModal">取消</Button>
                  <Button class="btn" type="primary" @click="handleSubmit('formCustom')">确定</Button>
                </div>
            </div>
            <Form 
                  v-else
                  ref="formCustom"
                  :model="formCustomData" 
                  label-position="right" 
                  :label-width="80" 
                  :rules="ruleValidate"
                  >
                <FormItem label="组件名称" prop="name">
                    <Input v-model="formCustomData.name"></Input>
                </FormItem>
                <FormItem label="添加属性" prop="property">
                    <Input v-model="formCustomData.property"></Input>
                </FormItem>
                <FormItem label="添加事件" prop="events">
                    <Input v-model="formCustomData.events"></Input>
                </FormItem>
                <FormItem prop="imgurl">
                    <Upload ref="upload"
                            multiple 
                            action="https://fileupload.sellercube.com/api/upload" 
                            :before-upload="handleBeforeUpload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleErrorTypeFile"
                            :on-exceeded-size="handleMaxSize"
                    >
                        <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                    <div class="demo-upload-list" v-for="item in getUploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url" class="img-fit">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>

                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                </FormItem>
                <FormItem>
                    <div class="submit-wrap">
                        <Button 
                            type="primary" 
                            long 
                            @click="handleSubmit('formCustom')" 
                            :loading="isLoading" 
                        >
                            Submit
                        </Button>
                    </div>                  
                </FormItem>
            </Form>
        </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getAddComponent } from "../../api/app";
import { dateFmt } from  '../../libs/utils'
import { DEFAULT_IMG } from '../../libs/dom';

export default {
  name: "ComponentContent",
  data() {
    return {
      defaultList: [],
      uploadList: [],
      imgUrlList: [],
      isLoading: false,
      isButtonDisabled: true,
      ruleValidate: {
        name: [
          {
            required: true,
            message: "组件名称不能为空",
            trigger: "blur"
          }
        ],
        property: [
          {
            required: true,
            message: "属性不能为空",
            trigger: "blur"
          }
        ],
        events: [
          {
            required: true,
            message: "事件不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    getUploadList() {
      const _uploadList = this.uploadList.map((item, index) => {
        let imgUrl;
        if (item.status === "finished") {
          imgUrl = `${DEFAULT_IMG}${item.response.Data[0]}`;
          item.url = imgUrl;
          this.imgUrlList.push(imgUrl);
        }
        return item;
      });

      return _uploadList;
    },
    formCustomData () {
        return this.formCustom
    },
    ...mapGetters(["isModalShow","formCustom","componentsList","componentModalType"])
  },
  methods: {
    handleBeforeUpload() {
      const check = this.uploadList.length < 2;
      if (!check) {
        this.$Notice.warning({
          title: "仅上传一张图片"
        });
      }
      return check;
    },
    handleErrorTypeFile(file) {
      this.$Notice.warning({
        title: "文件格式不对",
        desc: `${fime.name}格式不对`
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大下超出限制",
        desc: `${fime.nam}不能超过2M`
      });
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSubmit(name) {
      let type = this.componentModalType;
      console.log()

      if (type !== "delete") {
        const query = {};
        query.name = this.formCustomData.name;
        query.property = this.formCustomData.property;
        query.events = this.formCustomData.events;
        query.cover = this.imgUrlList[0] || `${DEFAULT_IMG}`;
        query._id = this.formCustomData._id;
        query.time = dateFmt("yyyy-MM-dd hh:mm:ss", new Date())

        this.$refs[name].validate(valid => {
          if (valid) {
            this.toSubmit(type, query, name);
          } else {
            this.$Message.error("Fail!");
          }
        });
      } else {
        this.toSubmit('delete', this.formCustomData, '');
      }
    },
    toSubmit(type, query, name) {
      this.isLoading = true;
      this.submitComponent({ query, type}).then(
        notice => {
          this.handleReset(name, notice, type);
        }
      );
    },
    handleReset(name, notice, type) {
      this.isLoading = false;
      if(type==='delete'){
          this.imgUrlList = []
      } else {
          this.$refs[name].resetFields();
      }
      this.$Message.success(notice);
    },
    cancelModal() {
      this.setModalShow(false);
    },
    ...mapMutations({
      setModalShow: "SET_MODAL_SHOW",
      setComponentData: 'SET_FORM_CUSTOM'
    }),
    ...mapActions(["submitComponent"])
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>


<style lang="stylus" scoped>
.modal-header {
    text-align: center;

    .title {
        font-size: 18px;
    }
}

.demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
    margin-top: 24px;
}

.demo-upload-list img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
}

.demo-upload-list:hover .demo-upload-list-cover {
    display: block;
}

.demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}

.submit-wrap {
    width: 60%;
    margin: 0 auto;
    transform: translateX(-40px);
}

.ivu-btn-primary[disabled] {
    background: #2d8cf0;
    border-color: #2d8cf0;
    opacity: 0.6;
    color: #fff;
}
.btn-line{
  margin-top: 30px;
  text-align: center
}
.btn{
  margin: 0 8px
}
</style>

