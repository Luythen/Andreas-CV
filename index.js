async function getRepos() {
    const reponse = await fetch("https://api.github.com/users/Luythen/repos")

    if (reponse.ok) {
        const data = await reponse.json()
        const githubRow = document.getElementById("github")

        let SortedData = data.filter((a) => {
            let desc = a.description;
            if (desc !== null && desc.includes("(Skol projekt)")) {
                return 1
            }
        })

        for (let i = 0; i < SortedData.length; i++) {
            let elm = await createCard(SortedData[i])
            
            githubRow.appendChild(elm)
        }
    } else {
        githubRow.innerHTML = "<h4>Failed to fetch</h4>"
    }
}

async function createCard (repo) {
    const col = document.createElement("div")
    const cardDiv = document.createElement("div")
    const cardBodydDiv = document.createElement("div")

    const cardTitle = document.createElement("a")
    const cardText = document.createElement("p")

    col.classList.add("col-3")
    col.classList.add("mt-4")
    cardDiv.classList.add("card")
    cardDiv.style.height = "8rem"

    cardBodydDiv.classList.add("card-body")

    cardTitle.classList.add("card-title")
    cardTitle.innerHTML = repo.full_name
    cardTitle.href = repo.html_url

    cardText.classList.add("card-text")
    cardText.innerHTML = repo.description.replace("(Skol projekt)", "")


    cardBodydDiv.append(cardTitle)
    cardBodydDiv.append(cardText)

    cardDiv.appendChild(cardBodydDiv)
    col.appendChild(cardDiv)

    return col
}

getRepos()