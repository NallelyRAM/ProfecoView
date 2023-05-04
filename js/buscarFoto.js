const container = document.getElementById('photos');

    function searchPhotos(event) {
      event.preventDefault(); // HACE QUE EL FORMLARIO NO SE ENVIE


        // BUSCARA LA FOTO SI PONER MAYUSCULAS O MINISUCULAS
      const searchTerm = document.getElementById('search').value.trim().toLowerCase();

      fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
          const photos = data.filter(photo => photo.title.toLowerCase().includes(searchTerm));

          container.innerHTML = ''; // Borra las fotos anteriores

          if (photos.length === 0) {
          //NO HAYA PRODUCTO CON ESE NOM BRE
            //container.innerHTML = '<p>No se encontraron el producto</p>';
            alert('No se ha encontrado el producto');
          } else {
            photos.forEach(photo => {
            //TITULO
            const title = document.createElement('p');
             title.textContent = photo.title;
            container.appendChild(title);

            //PRECIO
            const precio= document.createElement('s');
            precio.textContent= photo.id;
            container.appendChild(precio);


            //SALTO DE LINEA
              const ss = document.createElement('br');
              container.appendChild(ss);


            //FOTO
            const img = document.createElement('img');
            img.src = photo.thumbnailUrl;
            img.alt = photo.title;
            container.appendChild(img);

              /**
                //SALTO DE LINEA
              const br = document.createElement('br');
              container.appendChild(br);*/
            });
          }
        })
        .catch(error => console.error(error));
    }

    document.querySelector('form').addEventListener('submit', searchPhotos);//ENVIAA

