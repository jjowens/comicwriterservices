const app = new Vue({
    el: '#app', 
    mounted: function() {
        this.preload();
    },
    data: {
        authors: [],
        articles: [],
        filteredAuthors: [],
        currentAuthorObj: ''
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
                for(let linkIdx=0; linkIdx < this.articles[articleIdx].links.length; linkIdx++) {
                    for(let authorIdx=0; authorIdx < this.articles[articleIdx].links[linkIdx].Authors.length; authorIdx++) {
                        for(let filterAuthorIndex=0; filterAuthorIndex < this.filteredAuthors.length; filterAuthorIndex++) {
                            if (this.filteredAuthors[filterAuthorIndex].fullname.trim() === this.articles[articleIdx].links[linkIdx].Authors[authorIdx].fullname.trim()) {
                                this.articles[articleIdx].links[linkIdx].filterCSS = "visible";
                                break;
                            } else {
                                // DO NOT HIDE IF ALREADY FILTERED TO BE SHOWN
                                if (this.articles[articleIdx].links[linkIdx].filterCSS !== "visible") {
                                    this.articles[articleIdx].links[linkIdx].filterCSS = "hidden";
                                }
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
        },
        debugFilteredAuthors: function() {
            for(let authorIdx = 0; authorIdx < this.filteredAuthors.length; authorIdx++) {
                console.log("Author FirstName " + this.filteredAuthors[authorIdx].firstname);
                console.log("Author LastName " + this.filteredAuthors[authorIdx].lastname);
                console.log("Author Fullname " + this.filteredAuthors[authorIdx].fullname);
            }
        },
        debugLinkObj: function(data) {
            console.log("Link Titlte " + data.Title);
            console.log("Link Authors");
            for(let authorIdx = 0; authorIdx < data.Authors.length; authorIdx++) {
                console.log("Author FirstName " + data.Authors[authorIdx].firstname);
                console.log("Author LastName " + data.Authors[authorIdx].lastname);
                console.log("Author Fullname " + data.Authors[authorIdx].fullname);
                console.log("");
            }
        },
        debugCurrentAuthor: function() {


            for(let authorIdx = 0; authorIdx < this.filteredAuthors.length; authorIdx++) {
                if (this.filteredAuthors[authorIdx].fullname === this.currentAuthorObj.fullname) {
                    console.log("Current Author matches up");
                    console.log("Author FirstName " + this.currentAuthorObj.firstname);
                    console.log("Author LastName " + this.currentAuthorObj.lastname);
                    console.log("Author Fullname " + this.currentAuthorObj.fullname);
                }
            }

            this.debugFilteredAuthors();

        }
    }
});