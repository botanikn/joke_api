let select;
let select_option;

function fall() {

    select = document.querySelector('#fallen_list')
    select_option = select.options[select.selectedIndex].id;
    console.log(select_option)

}

$(document).ready(function() {

    $('#create_but').click(function() {

        let trans_back = $(`
        
            <div id="transparent">
            </div>
        
        `).appendTo('html');

        let creat_wind = $(`
        
            <div class="creation_window_anek">
                <center>
                <div class="creation_tex_anekt">
                    <h3>Создание анекдота</h3>
                </div>
                <div class="creation_text_input_anek">
                    <input type="text" id="anek_input" placeholder="Текст анекдота">
                </div>
                <div class="creation_genre_anek">
                    <select id="fallen_list" onchange="fall()">
                        <option selected disabled>Жанр</option>
                    </select>
                </div>
                <div class="button">
                    <button id="send">Создать анекдот</button>
                </div>
                </center>
            </div>
        
        `).appendTo('html');

        genres.map((genre) => {

            let opt = $(`
            
                <option id="${genre.guid}">${genre.name}</option>
            
            `).appendTo('#fallen_list');

        })

        $('#send').click(function() {

            let text = document.querySelector('#anek_input').value
            
            axios.post('http://localhost:5000/api/Jokes', {
    
                genre: select_option,
                tag: "1",
                text: text
    
            }).then(function() {
    
                console.log('Query is successful');
    
            }).catch(function() {
    
                console.log("Query is not successful");
    
            });
    
        })

    })

    

})