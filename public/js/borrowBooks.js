const searchInput = document.querySelector('#search');
const results_body = document.querySelector('#results');

load_data();


function load_data(query = '') {
    const request = new XMLHttpRequest();

    request.open('GET', `/search?q=${query}`);

    request.onload = () => {
        const results = JSON.parse(request.responseText);

        let html = '';

        if (results.length > 0) {
            results.forEach(result => {
                html += `
                <tr>
                    <td>`+ result.book_id + `</td>
                    <td>`+ result.title + `</td>
                    <td>`+ result.author + `</td>
                    <td>`+ result.genre + `</td>
                    <td>`+ result.part_of_series + `</td>
                    <td> <a href='/borrowBooks/requestLoan/${result.book_id}' class='fcc-btn'> Borrow </a></td>
                </tr>
                `;
            });
        }
        else {
            html += `
            <tr>
                <td colspan="5" class="text-center">No Data Found</td>
            </tr>
            `;
        }

        results_body.innerHTML = html;

    };

    request.send();
}

searchInput.addEventListener('input', () => {

    const query = searchInput.value;

    load_data(query);

});