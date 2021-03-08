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
            console.table(authorObj);

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
            //this.addFilterToArticles();
            this.addFilterAlternative();

            //console.log(this.filteredAuthors);

        },
        clearArticleFilters: function() {
            this.articles.forEach(articleObj => {
                articleObj.links.forEach(linkObj => {
                    linkObj.filterCSS = "";
                });
            });
        },
        addFilterToArticles: function() {
            this.articles.forEach(articleObj => {
                articleObj.links.forEach(linkObj => {
                    linkObj.Authors.forEach(authorObj => {
                        this.filteredAuthors.forEach(filteredAuthor => {
                            if (filteredAuthor.fullname.trim() === authorObj.fullname.trim()) {
                                linkObj.filterCSS = "visible";
                            } else {
                                linkObj.filterCSS = "hidden";
                            }
                        });
                    });
                });
            });
        },
        addFilterAlternative: function() {
            this.articles[0].links[0].filterCSS = "bg-red-200";

            for(let articleIdx=0; articleIdx < this.articles.length; articleIdx++) {
                //console.log("First Loop");
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length - 1; linkIdx++) {
                    //console.log("Second Loop");
                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].Authors.length - 1; authorIdx++) {
                        console.log("Third Loop");
                        console.log("Article Index: " + articleIdx);
                        console.log("Link Index: " + linkIdx);
                        console.log("Author Index: " + authorIdx);


                        //console.table(this.articles[articleIdx].links[linkIdx]);
                        this.articles[articleIdx].links[linkIdx].filterCSS = "bg-red-200";
                        for(let filterAuthorIndex=0; filterAuthorIndex < this.filteredAuthors.length - 1; filterAuthorIndex++) {
                            if (this.filteredAuthors[filterAuthorIndex].fullname === this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname) {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "visible";
                                console.log("Matched");
                            } else {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "hidden";
                                console.log("Not matched");
                                console.log(this.filteredAuthors[filterAuthorIndex].fullname + " === " + this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname);
                            }
                            
                        }
                    }
                }
            }
        }
    }
});