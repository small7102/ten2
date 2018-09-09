<template>
    <Layout style="height:100%" class="main">
        <Sider hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider" :style="{overflow: 'hidden'}">
            <div class="log-con">
                <img src="../../assets/logo.png" alt="">
            </div>
            <side-menu accordion 
            ref="sideMenu" 
            :active-name="$route.name"  
            :menu-list="menuList"
            @on-select="turnToPage"
            @on-close="handlCloseTag"
            >
            </side-menu>
        </Sider>
    
        <Layout>
            <Header class="layout-header-bar">
                <header-bar></header-bar>
            </Header>
            <Content class="content">
                <div class="tag-nav-wrap">
                    <tags-nav
                        :list="tagNavList"
                        :value="$route"
                        @on-select="handleSelect"
                        @on-close="handlCloseTag"
                    >
                    </tags-nav>
                </div>
                <Layout class="main-con-layout">
                    <keep-alive>
                        <router-view/>
                    </keep-alive>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import SideMenu from "../base/side-menu";
import HeaderBar from "./header-bar";
import TagsNav from "./tags-nav";
import { mapMutations, mapGetters } from 'vuex';
import { getHomeRoute, getNewTagList, getNextName } from '../../libs/utils';

export default {
  name: "Main",
  components: {
    SideMenu,
    HeaderBar,
    TagsNav
  },
  data() {
    return {
      menuList: [],
      routes: []
    };
  },
  computed: {
      ...mapGetters(['tagNavList'])
  },
  created() {
    this.getMenuList();
  },
  methods: {
    turnToPage(name) {
        console.log(name)
      if (name.indexOf("isTurnByHref_") > -1) {
        window.open(name.split("_")[1]);
        return;
      }
      this.$router.push({
        name: name
      });
    },
    getMenuList() {
      this.routes = this.$router.options.routes;

      this.setRoutes(this.routes);
      this.menuList = this.routes.filter(item => {
        return item.name !== "_home" && item.name !== "login";
      });
    },
    handleSelect(item){
        this.$router.push({name: item.name})
    },
    handlCloseTag(res,type,name){
        let nextName = getNextName(this.tagNavList, name)
        this.setTagNavList(res)

        let openName = ''
        if(type==='all'){
            this.turnToPage('home')
            openName = 'home'
        } else if (this.$route.name===name){
            this.$router.push({name: nextName})
            openName = nextName
        }

        this.$refs.sideMenu.updateOpenName(openName)
    },
    ...mapMutations({
        setBreadcrumbList: 'SET_BREAD_CRUMB',
        setRoutes: 'SET_ROUTES',
        setTagNavList: 'SET_TAG_NAV_LIST',
        addTag: 'ADD_TAG'
    })
  },
  mounted(){
      console.log(this.$route.matched)
      this.setBreadcrumbList(this.$route.matched);
      this.setTagNavList()
      this.addTag(getHomeRoute(this.routes))
  },
  watch: {
      '$route'(newRoute){
          this.setBreadcrumbList(newRoute.matched);
          this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      }
  }
};
</script>

<style lang="stylus" scoped>
.left-sider {
    background-color: #001529;
}

.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
}

.log-con {
    width: 150px;
    margin: 20px auto;

    img {
        width: 100%;
    }
}

.main-con-layout {
    padding: 20px 30px;
}
</style>

