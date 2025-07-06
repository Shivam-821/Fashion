const outfits = [
  {
    type: "Topwear",
    name: "Blue Ruffle Sleeve Top",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/19098128/2023/4/13/39694b82-2d6a-4a0e-a2ea-5cf10f02d7761681376536944SASSAFRASWomenBlueSolidTop1.jpg",
    link: "https://www.myntra.com/tops/sassafras/sassafras-women-blue-solid-ruffle-sleeves-top/19098128/buy"
  },
  {
    type: "Dress",
    name: "Floral A-Line Dress",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22536552/2023/4/17/cd18f26d-fd25-4c9b-86d1-4df9607fefc81681825735144-Athena-Women-Dresses-1791681825734556-1.jpg",
    link: "https://www.myntra.com/dresses/athena/athena-floral-a-line-dress/22536552/buy"
  },
  {
    type: "Shirt",
    name: "White Cotton Casual Shirt",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/18560444/2022/6/28/82e9e7a4-4b3a-4e0c-90e5-4ffbd837f1e61656401247424-Roadster-Women-Shirts-501656401247047-1.jpg",
    link: "https://www.myntra.com/shirts/roadster/roadster-women-white-solid-casual-shirt/18560444/buy"
  }
];

const grid = document.getElementById("outfitGrid");

outfits.forEach(outfit => {
  const card = document.createElement("div");
  card.className = "outfit-card";

  card.innerHTML = `
    <img src="${outfit.image}" alt="${outfit.name}" />
    <div class="outfit-info">
      <h3>${outfit.name}</h3>
      <a href="${outfit.link}" target="_blank">Shop Now</a>
    </div>
  `;

  grid.appendChild(card);
});
