document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Cengkeh",
        img: "1.jpg",
        price: 25000,
        desc: "Cengkih atau cengkeh (Syzygium aromaticum) adalah kuncup bunga kering beraroma dari keluarga pohon Myrtaceae. Cengkih adalah tanaman asli Indonesia, banyak digunakan sebagai bumbu masakan pedas di negara-negara Eropa, dan sebagai bahan utama rokok kretek khas Indonesia.",
      },

      {
        id: 2,
        name: "Jintan",
        img: "2.jpg",
        price: 35000,
        desc: "Jintan (Trachyspermum roxburghianum syn. Carum roxburghianum) merupakan tumbuhan menjalar yang bijinya dapat digunakan sebagai rempah-rempah dan obat-obatan.",
      },

      {
        id: 3,
        name: "Kayu Manis",
        img: "3.jpg",
        price: 15000,
        desc: "Kayu manis atau dengan nama ilmiah Cinnamomum ialah jenis pohon penghasil rempah-rempah. di dalam kamus Biologi, Cinnamomum zeylanicum Termasuk ke dalam jenis rempah-rempah yang dihasilkan dari kulit bagian dalam yang kering, yang amat beraroma, manis, dan pedas.",
      },
      {
        id: 4,
        name: "Bunga Lawang",
        img: "4.jpg",
        price: 45000,
        desc: "Bunga lawang atau Kembang Lawang atau pekak adalah rempah yang memiliki rasa yang mirip dengan Adas manis. Rempah ini memiliki nama ilmiah Illicium verum. Bunga lawang merupakan bunga yang berwarna cokelat gelap dan terdiri atas delapan sisi dengan rasa manis.",
      },
      {
        id: 5,
        name: "Kunir Bubuk",
        img: "5.jpg",
        price: 65000,
        desc: "Kunyit atau kunir, (Curcuma longa Linn. syn. Curcuma domestica Val.), adalah termasuk salah satu tanaman rempah-rempah dan obat asli dari wilayah Asia Tenggara. Kemudian tanaman rempah ini, digunakan sebagai pelengkap bumbu masakan, jamu atau obat untuk menjaga kesehatan dan kecantikan seperti pemakaian dalam perawatan kulit dan wajah.",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada cek apakah barang berbeda
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika ada tambah quantity dan subtotal
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += newItem.price;
            return item;
          }
        });
      }
    },

    remove(id) {
      // ambil item yang di remove berdasaekan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika lebih dari ssatu
      if (cartItem.quantity > 1) {
        // telusuri
        this.items = this.items.map((item) => {
          // jika barang bukan yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});
// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;
const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirimdata
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  window.open("http://wa.me/6285788531938?text=" + encodeURIComponent(message));
});

// format kirim pesan
const formatMessage = (obj) => {
  return `Data Customer 
  Nama: ${obj.name}
  Email: ${obj.email}
  No HP: ${obj.phone}
  Data Pesanan
  ${JSON.parse(obj.items).map(
    (item) =>
      `${item.name} ${item.quantity} x ${rupiah(item.price)} = (${rupiah(
        item.total
      )}) \n`
  )}
  TOTAL : ${obj.total}
    Terima Kasih.`;
};
//konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

document.addEventListener("alpine:init", () => {
  Alpine.data("eye", () => ({
    open: false,

    trigger: {
      ["@click"]() {
        this.open = !this.open;
      },
    },

    content: {
      ["x-show"]() {
        return this.open;
      },
      ["@click.wimdow"]() {
        this.open = false;
      },
    },
  }));
});
