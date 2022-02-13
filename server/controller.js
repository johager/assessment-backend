const compliments = [
    "Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
]

const fortunes = [
    "A person of words and not deeds is like a garden full of weeds.",
    "A pleasant surprise is waiting for you.",
    "A short pencil is usually better than a long memory any day.",
    "A small donation is call for. It’s the right thing to do.",
    "A smile is your personal welcome mat.",
    "A smooth long journey! Great expectations.",
    "A soft voice may be awfully persuasive.",
    "A truly rich life contains love and art in abundance.",
    "Accept something that you cannot change, and you will feel better.",
    "Adventure can be real happiness.",
    "Advice is like kissing. It costs nothing and is a pleasant thing to do.",
    "Advice, when most needed, is least heeded.",
    "All the effort you are making will ultimately pay off.",
    "All the troubles you have will pass away very quickly.",
    "All will go well with your new project."
]

// first line of novels
const novels = [
    `Call me Ishmael. —Herman Melville, Moby-Dick (1851)`,

    `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. —Jane Austen, Pride and Prejudice (1813)`,
    
    `screaming comes across the sky. —Thomas Pynchon, Gravity's Rainbow (1973)`,
    
    `Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice. —Gabriel García Márquez, One Hundred Years of Solitude (1967; trans. Gregory Rabassa)`,
    
    `Lolita, light of my life, fire of my loins. —Vladimir Nabokov, Lolita (1955)`,
    
    `Happy families are all alike; every unhappy family is unhappy in its own way. —Leo Tolstoy, Anna Karenina (1877; trans. Constance Garnett)`,
    
    `riverrun, past Eve and Adam's, from swerve of shore to bend of bay, brings us by a commodius vicus of recirculation back to Howth Castle and Environs. —James Joyce, Finnegans Wake (1939)`,
    
    `It was a bright cold day in April, and the clocks were striking thirteen. —George Orwell, 1984 (1949)`,
    
    `It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair. —Charles Dickens, A Tale of Two Cities (1859)`,
    
    `I am an invisible man. —Ralph Ellison, Invisible Man (1952)`,
    
    `The Miss Lonelyhearts of the New York Post-Dispatch (Are you in trouble?—Do-you-need-advice?—Write-to-Miss-Lonelyhearts-and-she-will-help-you) sat at his desk and stared at a piece of white cardboard. —Nathanael West, Miss Lonelyhearts (1933)`,
    
    `You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter. —Mark Twain, Adventures of Huckleberry Finn (1885)`,
    
    `Someone must have slandered Josef K., for one morning, without having done anything truly wrong, he was arrested. —Franz Kafka, The Trial (1925; trans. Breon Mitchell)`,
    
    `You are about to begin reading Italo Calvino's new novel, If on a winter's night a traveler. —Italo Calvino, If on a winter's night a traveler (1979; trans. William Weaver)`,
    
    `The sun shone, having no alternative, on the nothing new. —Samuel Beckett, Murphy (1938)`,
    
    `If you really want to hear about it, the first thing you'll probably want to know is where I was born, and what my lousy childhood was like, and how my parents were occupied and all before they had me, and all that David Copperfield kind of crap, but I don't feel like going into it, if you want to know the truth. —J. D. Salinger, The Catcher in the Rye (1951)`,
    
    `Once upon a time and a very good time it was there was a moocow coming down along the road and this moocow that was coming down along the road met a nicens little boy named baby tuckoo. —James Joyce, A Portrait of the Artist as a Young Man (1916)`,
    
    `This is the saddest story I have ever heard. —Ford Madox Ford, The Good Soldier (1915)`,
    
    `I wish either my father or my mother, or indeed both of them, as they were in duty both equally bound to it, had minded what they were about when they begot me; had they duly considered how much depended upon what they were then doing;—that not only the production of a rational Being was concerned in it, but that possibly the happy formation and temperature of his body, perhaps his genius and the very cast of his mind;—and, for aught they knew to the contrary, even the fortunes of his whole house might take their turn from the humours and dispositions which were then uppermost:—Had they duly weighed and considered all this, and proceeded accordingly,—I am verily persuaded I should have made a quite different figure in the world, from that, in which the reader is likely to see me. —Laurence Sterne, Tristram Shandy (1759–1767)`,
    
    `Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show. —Charles Dickens, David Copperfield (1850)`
]

const fugitives = [
    {
        name: "JOSE RODOLFO VILLARREAL-HERNANDEZ",
        pic: "jose"
    },{
        name: "RAFAEL CARO-QUINTERO",
        pic: "rafael"
    },{
        name: "YULAN ADONAY ARCHAGA CARIAS",
        pic: "yulan"
    },{
        name: "EUGENE PALMER",
        pic: "eugene"
    },{
        name: "BHADRESHKUMAR CHETANBHAI PATEL",
        pic: "bhadreshkumar"
    },{
        name: "ALEJANDRO ROSALES CASTILLO",
        pic: "alejandro"
    },{
        name: "ARNOLDO JIMENEZ",
        pic: "arnoldo"
    },{
        name: "JASON DEREK BROWN",
        pic: "jason"
    },{
        name: "ALEXIS FLORES",
        pic: "alexis"
    },{
        name: "OCTAVIANO JUAREZ-CORRO",
        pic: "octaviano"
    }
]

const items = []

/*
item = {
    name: '',
    category: ''
}
*/

function randomElementFrom(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

function rollDownStack(stack) {
    stack.y = stack.z
    stack.z = stack.t
}

module.exports = {
    getCompliment: (req, res) => {
        res.status(200).send(randomElementFrom(compliments))
    },
    getFortune: (req, res) => {
        res.status(200).send(randomElementFrom(fortunes))
    },
    getNovel: (req, res) => {
        res.status(200).send(randomElementFrom(novels))
    },
    getFugitive: (req, res) => {
        res.status(200).send(randomElementFrom(fugitives))
    },
    doCalcOperation: (req, res) => {
        let answer = 0
        const {stack} = req.body
        const {x, y} = stack
        switch (req.body.oper) {
            case "+":
                answer = y + x
                break
            case "-":
                answer = y - x
                break
            case "*":
                answer = y * x
                break
            case "/":
                answer = y / x
                break
            default:
                res.status(400).send(`the "${req.body.oper}" operator is not supported`)
                return
        }

        console.log("doCalcOperation inp:", stack)
        rollDownStack(stack)
        stack.x = answer
        console.log("doCalcOperation out:", stack)

        res.status(200).send(stack)
    },
    makeItem: (req, res) => {
        console.log(req.body)
        items.push(req.body)
        res.status(200).send(items)
    },
    updateItem: (req, res) => {
        console.log(req)
        console.log(req.body)
        const index = items.findIndex(elem => elem.name === req.params.name)
        items[index].category = req.body.category
        res.status(200).send(items)
    },
    deleteItem: (req, res) => {
        const index = items.findIndex(elem => elem.name === req.params.name)
        items.splice(index, 1)
        res.status(200).send(items)
    }
}
