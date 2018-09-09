<template>
    <Modal v-model="layoutModalshow"   
            :width="modalWidth" 
            :footer-hide="isModalFooterHide"
            @on-cancel="cancelModal"
            @on-ok="handleSubmit"
            >
        <div class="modal-header" slot="header">
            <span class="title">{{modalTitle}}</span>
        </div>
        <div class="modal-body">
            <component v-bind:is="currentComponent"></component>
        </div>        
    </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "LayoutModal",
  props: {
    modalWidth: {
      type: Number,
      default: 500
    },
    currentComponent: {
        type: Object,
        default: ()=>{}
    }
  },
  data() {
    return {
    };
  },
  computed: {
    layoutModalshow: {
       get: function() {
        return this.isModalShow;
      },
      set: function(bool) {
        this.setModalShow(bool);
      }
    },
    ...mapGetters(["isModalShow", "isModalFooterHide", 'modalTitle', 'componentModalType'])
  },
  methods: {
    cancelModal() {
      console.log("取消业务");
      this.layoutModalshow = false;
    },
    handleSubmit() {
      console.log("确定提交");
    },
    ...mapMutations({
        setModalShow: 'SET_MODAL_SHOW'
    })
  },
  mounted() {
  },
  watch: {
    componentModalType(newVal){
        
    }  
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
</style>

