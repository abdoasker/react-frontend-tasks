  function getApi() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://fakestoreapi.com/products", true);
    xhttp.onload = function () {
      if (this.status === 200) {
        var products = JSON.parse(this.responseText);
        var myTxt = products.map(function (p) {
          return `
            <div class="col-md-4 mb-3">
              <div class="card h-100 p-3">
                <img src="${p.image}" class="card-img-top m-auto"loading="lazy">
                <div class="card-body">
                  <h5 class="card-title">${(p.title).slice(0,10)}</h5>
                  <p class="card-text">${(p.description).slice(0, 100)}...</p>
                  <p class="fw-bold mb-2">$${p.price}</p>
                  <button class="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>`;
        }).join("");
        document.querySelector("#containerCard").innerHTML = myTxt;
      }
    };
    xhttp.send();
  }

  getApi();
