export default {
    data() {
        return {
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
        }
    }
}