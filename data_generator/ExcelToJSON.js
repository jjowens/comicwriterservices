const fs = require('fs');

const reader = require('xlsx');

const jsonFileName = "./src/app/public/data/data.json";
const file = reader.readFile("./data_generator/datasource/Comic Writer Services.xlsx");

let data = {
    authors: [],
    articles:[],
}

function createAuthor(fullname, articleid) {
    let names = fullname.trim().split(" ");
    let firstName = "";
    let lastName = "";

    if (names.length > 2) {
        for(i=0; i < names.length - 1; i++) {
            firstName = firstName + names[i].trim() + " ";
        }

        lastName = names[names.length - 1];
    } else if (names.length === 2) {
        firstName = names[0];
        lastName = names[1];
    } else {
        firstName = "";
        lastName = fullname.trim();
    }

    if (firstName !== undefined) {
        firstName = firstName.trim();
    }

    if (lastName !== undefined) {
        lastName = lastName.trim();
    }

    let fullName = fullname.trim();
    let listOfArticles = []

    if (articleid === undefined) {
        listOfArticles.push(0);
    } else {
        listOfArticles.push(articleid);
    }

    let obj = {
        fullname: fullName,
        firstname: firstName,
        lastname: lastName,
        articleids: listOfArticles
    };

    return obj;
}

let tempAuthors = [];

tempAuthors.push(createAuthor("Not Known"));

const sheets = file.SheetNames;

for(let i = 0; i < sheets.length; i++)
{
    const sheetName = file.SheetNames[i];

    // CHECK IF WE SHOULD EXPORT THIS WORKSHEET
    if (sheetName.trim().substring(0,1) === "-") {
        console.log("Found ignored worksheet")
        break;
    }

    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);

    let sheetData = {
        category: sheetName,
        links: []
    };

    let totalFounddNumberOfTimes = 0;

    temp.forEach((res) => {
        if (res.Ignore !== undefined) {
            if (res.Ignore.length > 0) {
                return;
            }
        }

        let linkData = {
            id: 0,
            title: "",
            link: res.Link,
            description: "",
            authors: [],
            category: ""
        };

        linkData.category = sheetName;
        linkData.id = res.ID;
        linkData.title = res.Title;

        if (res.Description !== undefined) {
            linkData.description = res.Description.trim();
        }

        let authors = [];

        if (res.Authors !== undefined) {
            authors = res.Authors.split(";");
        }

        // ADD DEFAULT AUTHOR
        if (authors.length === 0) {
            authors.push("Not Known");
        }

        let tempLinkAuthors = [];

        // CHECK IF LIST OF AUTHORS ALREADY CONTAIN AUTHOR FOR THIS ARTICLE
        authors.forEach(author => {
            let tempAuthor = createAuthor(author, res.ID);
            console.log("Author's article id " + res.ID);

            let found = tempAuthors.some(item => item.fullname === tempAuthor.fullname);

            // ADD AUTHOR TO GENERAL LIST OF AUTHORS
            if (found === false) {
                tempAuthors.push(tempAuthor);
            } else {
                console.log("Found author")
                totalFounddNumberOfTimes ++;
                console.log(tempAuthor);

                // UPDATE AUTHOR's LIST OF ARTICLES
                let idx = tempAuthors.findIndex(item => item.fullname === tempAuthor.fullname);
                console.log("IDX " + idx);
                if (idx !== -1) {
                    tempAuthors[idx].articleids.push(res.ID);
                }
            }

            // ADD AUTHOR TO ARTICLE LIST OF AUTHORS
            tempLinkAuthors.push(tempAuthor);
        });

        // ADD LIST OF AUTHORS TO ARTICLE
        linkData.authors = tempLinkAuthors;

        // ADD NEW LINKS
        data.articles.push(linkData);
    })

    console.log("Total Number of times authors were found = " + totalFounddNumberOfTimes);
}

// REMOVE "NOT KNOWN" BEFORE SORTING.
tempAuthors.splice(0, 1);

// SORT AUTHORS
tempAuthors.sort(function(a,b) {
    if (a.lastname < b.lastname) {
        return -1;
    }
    if (a.lastname > b.lastname) {
        return 1;
    }
    return 0;
});

// RE-ADD "NOT KNOWN"
tempAuthors.unshift(createAuthor("Not Known"));

data.authors = tempAuthors;

let jsonStr = JSON.stringify(data);

fs.writeFile(jsonFileName, jsonStr, function (err) {
    if (err) return console.log(err);
    console.log('Completed Excel to JSON > data.json');
});
