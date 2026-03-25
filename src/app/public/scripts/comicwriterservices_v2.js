const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        debugPanelVisible: 'hidden',
        sortPropName: "category_title",
        sortPropOrder: "asc"
    },
    methods: {
        preload: function(event) {
            fetch("public/data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.articles = data.articles;
        },
        organiseMyArticles: function() {
            if (this.sortPropOrder === "asc") {
                return this.sortArticlesByProp(this.sortPropName)
            } else if (this.sortPropOrder === "desc")  {
                return this.sortArticlesByPropReverse(this.sortPropName)
            } else {
                return this.sortArticlesByProp(this.sortPropName)
            }
        },
        sortArticlesByProp: function(propName) {
            if (propName === 'title') {
                return this.articles.slice().sort(function (a,b) {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                })
            } else if (propName === 'category_title') {
                return this.articles.slice().sort(function (a,b) {
                    return (a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
                })
            } else {
                return this.articles.slice().sort(function (a,b) {
                    if (a.title < b.title) return -1;
                    if (a.title > b.title) return 1;
                    return 0;
                })
            }
        },
        sortArticlesByPropReverse: function(propName) {
            if (propName === 'title') {
                return this.articles.slice().sort(function (a,b) {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                })
            } else if (propName === 'category_title') {
                return this.articles.slice().sort(function (a,b) {
                    return (b.category.localeCompare(a.category) || a.title.localeCompare(b.title))
                })
            } else {
                return this.articles.slice().sort(function (a,b) {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                })
            }
        }
    }
});