const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        debugPanelVisible: 'hidden'
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
            return this.sortArticles()
        },
        defaultSortOrder: function() {
            return this.articles;
        },
        sortArticles: function() {
            return this.articles.sort(function(a, b) {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            })
        },
        sortArticlesReverse: function() {
            return this.articles.reverse();
        }
    }
});