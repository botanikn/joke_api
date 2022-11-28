let jokes = [] // Массив, хранящий анекдоты для отрисовки
let genres = [] // Массив, хранящий жанры для отрисовки кнопок
let genre_id; // Переменная, хранящая id жанра
let sorter_jokes = [] // Массив, хранящий анекдоты определённого жанра

$(document).ready(function() {

    // Отрисовка жанра 'Все анектоды'

    let div_genre = $(`
            
        <center><div class="div_genre">
            <button id="all_genres" class="genre_button">Все анекдоты</button>
        </div></center>

    `).appendTo(`div#aside_body`)

    // Отрисовка кнопки создания анекдота

    let div_create = $(`
    
        <center><div id="div_create">
            <button id="create_but">+</button>
        </div></center>
    
    `).appendTo(`div#render`)

    // Первичная отрисовка всех анектодов

    axios.get('http://localhost:5000/api/Jokes'
    
    ).then((response) => {

        jokes = response.data

        jokes.map((joke) => {

            let div_joke = $(`
            
                <div class="div_joke">
                    <p>${joke.text}</p>
                </div
            
            `).appendTo(`div#render`);

        })

    })

    // Отрисовка жанров

    axios.get('http://localhost:5000/api/Genres'
    
    ).then((response) => {

        genres = response.data

        genres.map((genre) => {

            let div_genre = $(`
            
                <center><div class="div_genre">
                    <button id="${genre.guid}" class="genre_button">${genre.name}</button>
                </div></center>

            `).appendTo(`div#aside_body`)

        })

    })

    // Отрисовка анекдотов в зависимости от выбранного жанра

    let click = document.querySelector('div#aside_body');
    click.onclick = function(event) {

        genre_id = event.target.id;
        console.log(genre_id);

        if (genre_id == "aside_body") {

            console.log("Doing nothing")

        }

        else if (genre_id == "all_genres") {

            $(`.div_joke`).remove();

            axios.get('http://localhost:5000/api/Jokes'
    
            ).then((response) => {

                jokes = response.data

                jokes.map((joke) => {

                    let div_joke = $(`
                    
                        <div class="div_joke">
                            <p>${joke.text}</p>
                        </div
                    
                    `).appendTo(`div#render`);

                })

            })

        }

        else {

            $(`.div_joke`).remove();

            axios.get('http://localhost:5000/api/Jokes'
        
            ).then((response) => {

                sorter_jokes = response.data.filter((joke) => {

                    return joke.genre == genre_id;

                })

                sorter_jokes.map((joke) => {

                    let div_sorter_jokes = $(`
                
                        <div class="div_joke">
                            <p>${joke.text}</p>
                        </div>
                
                    `).appendTo(`div#render`)

                })

            })

        }

    }

})