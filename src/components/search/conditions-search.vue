<template>
    <div class="search-wrap">
        <Row>
            <Col span="6">
             <div class="col-wrap">
                <span class="lable">排序</span>
                <Select v-model="searchItem.select">
                    <Option  v-for="item in selectList" :value="item.name" :key="`select-${item.type}`">{{item.name}}</Option>
                </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="col-wrap">
                <span class="lable">时间</span>
                <DatePicker type="date" placeholder="选择日期" 
                    v-model="searchItem.date"
                    @on-change="handleSelectDate"
                    >                  
                </DatePicker>
                </div>
            </Col>
             <Col span="6">
                <div class="col-wrap">
                    <span class="lable">名称</span>
                    <Input v-model="searchName" @on-keyup="debounceAjax"/>
                </div>
            </Col>
            <!-- <Col span="4">
                <Button type="primary" size="small" class="search-btn" :disabled="searchDisable">搜索</Button>
            </Col> -->
        </Row>
    </div>
</template>

<script>
import { debounce, ajax, throttle } from "../../libs/utils";

const _da = debounce(ajax, 1000)
const _ta = throttle(ajax, 1000)

export default {
  name: "ConditionsSearch",
  props: {
    selectList: Array
  },
  data() {
    return {
      searchItem: {
        select: "",
        date: ""
      },
      searchName: "",
      searchDisable: true
    };
  },
  created(){
      console.log(this.$router)
      console.log(this.$store)
      console.log(this.$route)
      console.log(this.$router.routes)
  },
  methods: {
    handleSelectDate(fmt, date) {

    },
    debounceAjax(){
        _ta(this.searchName)
    }
  }
};
</script>

<style lang="stylus" scoped>
.search-wrap {
    margin-bottom: 15px;

    .col-wrap {
        display: flex;

        span {
            display: inline-block;
            width: 40px;
            padding: 0 5px;
            line-height: 30px;
        }
    }

    .search-btn {
        margin-top: 3px;
    }
}
</style>


