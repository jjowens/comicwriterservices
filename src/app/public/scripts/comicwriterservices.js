const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        filteredAuthors: [],
        currentAuthorObj: '',
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

            this.currentAuthorObj = authorObj;
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
                articleGroupVisibility = "visible";
                foundAuthors = 0;
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length; linkIdx++) {
                    totalAuthors = this.articles[articleIdx].links[linkIdx].authors.length - 1;
                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].authors.length; authorIdx++) {
                        for(let filterAuthorIndex=0; filterAuthorIndex < this.filteredAuthors.length; filterAuthorIndex++) {
                            if (this.filteredAuthors[filterAuthorIndex].fullname.trim() === this.articles[articleIdx].links[linkIdx].authors[authorIdx].fullname.trim()) {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "visible";
                                foundAuthors += 1;
                                break;
                            } else {
                                // DO NOT HIDE IF ALREADY FILTERED TO BE SHOWN
                                if (this.articles[articleIdx].links[linkIdx].filterCSS !== "visible") {
                                    this.articles[articleIdx].links[linkIdx].filterCSS = "hidden";
                                } else {
                                    foundAuthors = 0;
                                }
                            }
                        }
                    }
                }
                if (foundAuthors === 0 && this.filteredAuthors.length > 0) {
                    articleGroupVisibility = "hidden";
                }

                this.articles[articleIdx].filterCSS =  articleGroupVisibility;
            }
        }
    }
});