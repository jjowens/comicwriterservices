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
            return this.articles
        }
    }
});