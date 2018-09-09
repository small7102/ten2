<template>
    <div class="tags-nav">
        <div class="btn-con left-btn"  @click="handleScroll(240)">
            <Button type="text" class="i-btn">
            <Icon :size="18" type="ios-arrow-back" />
          </Button>
        </div>
        <div class="btn-con right-btn">
            <Button type="text" class="i-btn" @click="handleScroll(-240)">
            <Icon :size="18" type="ios-arrow-forward" />
          </Button>
        </div>

        <div class="scroll-outer" ref="scrollOuter">
            <div class="scroll-body" ref="scrollBody" :style="{left: tagBodyLeft + 'px'}">
                <transition-group name="tag-moving-animation">
                    <Tag
                        type="dot"
                        v-for="item in list"
                        ref="tagsPageOpened"
                        :name="item.name"
                        :key="`tag-nav-${item.name}`"
                        :closable="item.name !== 'home'"
                        :color="item.name === value.name ? 'primary' : 'default'"
                        @click.native="handleClick(item)"
                        @on-close="handleClose"
                    >{{showTitle(item)}}</Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "TagsNav",
  props: {
    value: Object,
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      outerPadding: 4
    };
  },
  methods: {
    showTitle(item) {
      return (item.meta && item.meta.title) || item.name;
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if(offset>0){
          this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleClick(item) {
      this.$emit("on-select", item);
    },
    handleClose(e, name) {
      let res = this.list.filter(item => item.name !== name);
      this.$emit("on-close", res, undefined, name);
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth

      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域   
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        // this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
        this.tagBodyLeft = (outerWidth - tag.offsetLeft) - tag.offsetWidth - this.outerPadding
      }
    },
    getTagElementByName(name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened;
        this.refsTag.forEach((item, index) => {
          if (name === item.name) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
    }
  },
  watch: {
    '$route'(to) {
      this.getTagElementByName(to.name);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tags-nav {
    width: 100%;
    height: 40px;
    background: #eeeeee;
    position: relative;
    margin-top: 3px;
    .btn-con {
        position: absolute;
        top: 0px;
        width: 40px;
        height: 40px;
        text-align: center;
        background: #ffffff;
        line-height: 40px;
        z-index: 2;

        &.left-btn {
            left: 0;
        }

        &.right-btn {
            right: 0;
        }

        .i-btn {
            width: 40px;
        }
    }

    .scroll-outer {
        z-index: 0;
        overflow: hidden;
        position: absolute;
        right: 40px;
        left: 40px;
        height 40px
        .scroll-body {
            position: absolute;
            top: 0;
            z-index: 1;
            white-space: nowrap;
            padding: 0 4px;
            transition all 0.2s
        }
    }
}
</style>


