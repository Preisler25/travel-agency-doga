class Destination{
  title;
  content;
  img;

  /**
   * @param {string} title string 
   * @param {string} content string
   * @param {string} img string
  **/  
  constructor(title, content, img){
      this.title = title;
      this.content = content;
      this.img = img;
  }
}

const apiUrl = 'https://petrik-utazas-default-rtdb.europe-west1.firebasedatabase.app/travelDestinations.json';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('destination-container');
  const row = document.getElementById('destination-row');
  const template = document.getElementById('destination-template');
  const spinner = document.getElementById('loading-spinner');

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      spinner.classList.add('d-none');
      container.classList.remove('d-none');

      data.forEach(destination => {
        const destinationE = new Destination(destination.title, destination.content, destination.img);
        const clone = template.content.cloneNode(true);
        clone.querySelector('.card-title').textContent = destinationE.title;
        clone.querySelector('.card-text').textContent = destinationE.content;
        clone.querySelector('.card-img-top').src = destinationE.img;
        row.appendChild(clone);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      spinner.innerHTML = '<p>Hiba történt az adatok betöltésekor. Kérjük, próbálja újra később.</p>';
    });
});
