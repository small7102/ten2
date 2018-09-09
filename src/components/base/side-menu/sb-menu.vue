<template>
    <Submenu :subItem='subItem' :name='subItem.name'>
        <template slot="title">
                   <Icon :type="subItem.icon" />
                  {{subItem.meta.title}}
        </template>
        <template v-for="item in subMenuList">
            <template v-if="item.length&&item.length===1">
                <sb-menu v-if="showChildren(item)" :subItem='item' :subMenuList="sbMenuList(item)" :key="`menu-${item.name}`">
                </sb-menu>
                <MenuItem v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`" class="menu-item">
                    <Icon :type="item.meta.icon"/>
                    <span>{{ showTitle(item.children[0]) }}</span>
                </MenuItem>
            </template>

            <template v-else>
                <sb-menu v-if="showChildren(item)" :key="`menu-${item.name}`" :subItem='item' :subMenuList="sbMenuList(item)"></sb-menu>
                <MenuItem v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><Icon :type="item.meta.icon"/><span>{{ showTitle(item) }}</span></MenuItem>
            </template>
            
        </template>
    </Submenu>
</template>

<script>
import mixin from './mixin'
export default {
  name: "SbMenu",
  mixins: [ mixin ],
  props: {
    subItem: {
      type: Object,
      default: {}
    },
    subMenuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    sbMenuList(item) {
      return item.children;
    },
  }
};
</script>

<style lang="stylus" scoped>
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active {
    background: #000c17 !important;
    color: #2d8cf0;
    border-right: 2px solid #2d8cf0;
}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: none !important;

    .ivu-menu-submenu-title {
        background: none !important;
    }
}
</style>


