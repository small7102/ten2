<template>
    <div class="my-component">
        <content-top-bar :topTitle="topTitle">
            <Button type="primary" @click="toOpenModal('add')" >添加组件</Button>
        </content-top-bar>
        <conditions-search :selectList="sortTypeList"></conditions-search>
        <Table :columns="columns" 
               :data="componentsList"          
               >
               </Table>
        <layout-modal 
            :currentComponent="modalContentComponent"
            :modalWidth="modalWidth"
        >
        </layout-modal>
        <page
         class="page"
         :total="totalItemLength"
         @on-change="onChangePage"
         :page-size='8'
         :show-total="true"
        >
        </page>
    </div>
</template>

<script>
import ContentTopBar from "components/base/content-top-bar";
import LayoutModal from "components/base/layout-modal";
import ComponentContent from "./component-content";
import { mapMutations, mapGetters, mapActions } from "vuex";
import ConditionsSearch from '../search';

console.log(ContentTopBar)

const ALERT_WIDTH = 300
const EDIT_WIDTH = 500

export default {
  name: "MyComponent",
  components: {
    ContentTopBar,
    ComponentContent,
    LayoutModal,
    ConditionsSearch
  },
  data() {
    return {
      modalWidth: 500,
      topTitle: "组件列表",
      sortTypeList: [
        {
          type: 'recent',
          name: '最近时间'
        },
        {
          type: 'time-up',
          name: '时间倒序'
        }
      ],
      columns: [
        {
          title: "组件名称",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("img", {
                style: {
                  width: "60px",
                  height: "60px",
                  marginRight: "10px",
                  margin: "20px 10px 20px 0",
                  objectFit: "cover",
                  verticalAlign: "middle"
                },
                attrs: {
                  src: params.row.cover
                },
                class: "fit-img cover-img"
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "组件属性",
          key: "property"
        },
        {
          title: "组件事件",
          key: "events"
        },
        {
          title: "操作时间",
          key: "time"
        },
        {
          title: "操作",
          key: "handle",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: this.toOpenModal.bind(this, "edit", params.row)
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: this.toOpenModal.bind(this, "delete", params.row)
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    modalContentComponent(){
        return ComponentContent
    },
    ...mapGetters(["componentsList", "totalItemLength"])
  },
  created() {
    this.getComponentsList();
  },
  methods: {
    toOpenModal(type, data) {
      this.setComponentModalType(type);
      this.setModalShow(true);
      this.setModalTitle(this.modalTitle(type));
      this.modalWidth = type==='delete' ? ALERT_WIDTH : EDIT_WIDTH;
      data = data ? data : {};
      this.setFormCustom(data);
    },
    modalTitle(type) {
      switch (type) {
        case "delete":
          return "删除提示";
          break;
        case "add":
          return "添加组件";
          break;
        case "edit":
          return "编辑组件";
          break;
      }
    },
    onChangePage(currentPage){
      console.log(currentPage)
        this.getComponentsList({currentPage, limit: 8});
    },
    ...mapMutations({
      setModalShow: "SET_MODAL_SHOW",
      setFormCustom: "SET_FORM_CUSTOM",
      setComponentModalType: 'SET_COMPONENT_MODAL_TYPE',
      setModalTitle:'SET_MODAL_TITLE',
      setModalFooter: 'SET_MODAL_FOOTER',
      setAutofocus: 'SET_AUTO_FOCUS'
    }),
    ...mapActions(["getComponentsList",])
  }
};
</script>


<style lang="stylus" scoped>
.my-component {
    background: #fff;
    box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.05);
    min-height: 300px;
    padding: 15px 20px;
}

.fit-img {
    object-fit: cover;
}

.cover-img {
    width: 60px;
    height: 60px;
    marginRight: 10px;
    margin: 20px 10px 20px 0;
    vertical-align: middle;
}
.page{
    margin-top: 15px;
}
</style>

