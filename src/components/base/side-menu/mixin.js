export default {
    methods: {
        showTitle (item) {
            return (item.meta && item.meta.title) || item.name
          },
        showChildren(item) {
            return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
        },
        getNameOrHref(item, children0) {
            return item.meta.href ? `isTurnByHref_${item.meta.href}` : (children0 ? item.children[0].name : item.name)
        }
    }
}