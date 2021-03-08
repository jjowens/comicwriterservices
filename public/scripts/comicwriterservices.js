const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        categories: []
    },
    methods: {
        preload: function(event) {
            fetch("data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.categories = data.categories;
            console.log("Done!");
        },
    }
});