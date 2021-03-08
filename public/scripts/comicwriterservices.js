const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        filteredAuthors: []
    },
    methods: {
        preload: function(event) {
            fetch("data/data.json")
            .then(response => response.json())
            .then(data => (this.parseData(data)))
        },
        parseData: function(data) {
            this.authors = data.authors;
            this.articles = data.articles;
        },
        clearFilteredAuthors: function() {
            this.clearArticleFilters();
            this.filteredAuthors = [];
        },
        addAuthorToFilter: function(authorObj) {
            let idx = this.filteredAuthors.indexOf(authorObj);

            if (idx === -1) {
                this.filteredAuthors.push(authorObj);
            } else {
                this.filteredAuthors.splice(idx, 1);
            }

            this.filterArticles();
        },
        filterArticles: function() {
            this.clearArticleFilters();
            this.addFilterToArticles();

        },
        clearArticleFilters: function() {
            this.articles.forEach(articleObj => {
                articleObj.links.forEach(linkObj => {
                    linkObj.filterCSS = "";
                });
            });
        },
        addFilterToArticles: function() {
            for(let articleIdx=0; articleIdx < this.articles.length; articleIdx++) {
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length; linkIdx++) {
                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].Authors.length; authorIdx++) {
                        for(let filterAuthorIndex=0; filterAuthorIndex < this.filteredAuthors.length; filterAuthorIndex++) {
                            if (this.filteredAuthors[filterAuthorIndex].fullname.trim() === this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname.trim()) {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "visible";
                                break;
                            } else {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "hidden";
                            }
                            
                        }
                    }
                }
            }
        },
        debugLinks: function() {
            for(let articleIdx=0; articleIdx < this.articles.length; articleIdx++) {
                console.log("Articles Category: " + this.articles[articleIdx].category);
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length; linkIdx++) {
                    console.log("Link Title: " + this.articles[articleIdx].links[linkIdx].Title);
                    //console.log("Link Authors Count: " + this.articles[articleIdx].links[linkIdx].Authors.length);
                    //console.log("Link Author (0): " + this.articles[articleIdx].links[linkIdx].Authors[0].fullname);
                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].Authors.length; authorIdx++) {
                        console.log("Author: " + this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname);
                    }
                }
            }
        }
    }
});