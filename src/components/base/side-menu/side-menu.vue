<template>
  <div class="side-menu-wrap">
    <slot></slot>
    <Menu class="menu" width="auto" ref="menu" theme="dark" 
          :active-name="activeName" 
          :open-names="openedNames" 
          :accordion="accordion"
          @on-select="handleSelect"
          >
      <template v-for="item in menuList">
                <template v-if="item.children&&item.children.length===1">
                  <sb-menu v-if="showChildren(item)" :key="`menu-${item.name}`" :subItem="item" :subMenuList="sbMenuList(item)"></sb-menu>
                  <MenuItem v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`" class="menu-item">
                    <Icon :type="item.meta.icon"/>
                    <span>{{ showTitle(item.children[0]) }}</span>
                  </MenuItem>
                </template>
                <template v-else>          
                  <sb-menu v-if="showChildren(item)" :subItem='item' :key="`menu-${item.name}`" :subMenuList="sbMenuList(item)">
                  </sb-menu>
                  <menuItem v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><Icon :type="item.meta.icon"/><span>{{ showTitle(item) }}</span></menuItem>
                </template>  
            </template>
        </Menu>
    </div>
</template>

<script>
import SbMenu from "./sb-menu";
import mixin from "./mixin"
export default {
  name: "SideMenu",
  components: {
    SbMenu
  },
  mixins: [ mixin ],
  props: {
    menuList: {
      type: Array,
      default() {
        return [];
      }
    },
    activeName: {
      type: String,
      default: ""
    },
    openNames: {
      type: Array,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      openedNames: []
    };
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name);
    },
    sbMenuList(item) {
      return item.children;
    },
    getMenuitemName(item, children0) {
      return children0 ? item.children[0].name : item.name;
    },
    getMenuitemHref(item) {
      return `${item.path}/${item.children[0].path}`;
    },
    updateOpenName (name) {
      if (name === 'home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  watch: {
    activeName(name) {
      let getOpenedNames = this.getOpenedNamesByActiveName(name);
      if (this.accordion) this.openedNames = getOpenedNames;
      else this.openedNames = getUnion(this.openedNames, getOpenedNames);
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.menu {
  background: none;

  &:after {
    width: 0;
  }

  .menu-item {
    color: rgba(255, 255, 255, 0.8);
    width: 100%;

    &:hover {
      background: none;
    }
  }
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  background: #000c17 !important;
  color: #2d8cf0;
  border-right: 2px solid #2d8cf0;
}
</style>

