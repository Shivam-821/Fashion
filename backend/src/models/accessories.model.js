import mongoose, {Schema} from "mongoose";

const accessorySchema = new Schema({
  type: String,
  name: String,
  url: String,
  price_inr: Number,
  color_recommendation: String,
});

const outfitSuggestionSchema = new Schema({
  category: String,
  skin_tone: String,
  body_shape: String,
  face_shape: String,
  items: [accessorySchema],
});

export const OutfitSuggestion = mongoose.model(
  "OutfitSuggestion",
  outfitSuggestionSchema
);

const data = {
  category: "accessories",
  skin_tone: "olive",
  body_shape: "inverted triangle",
  face_shape: "square",
  items: [
    {
      type: "earrings",
      name: "Yellow Chimes Gold-Toned Contemporary Drop Earrings",
      url: "https://th.bing.com/th/id/OIP.Kmzx5gNh-2wiethGBK8_KAHaIa?r=0&w=1760&h=2000&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      price_inr: 1400,
      color_recommendation: "gold to soften angular jawline",
    },
    {
      type: "earrings",
      name: "Yellow Chimes Butterfly Drop Earrings",
      url: "https://i.etsystatic.com/31674674/r/il/dfcd7b/3401256553/il_fullxfull.3401256553_66z4.jpg",
      price_inr: 449,
      color_recommendation: "gold-toned for face balance",
    },
    {
      type: "earrings",
      name: "Silver Chimes Hoop Earrings",
      url: "https://th.bing.com/th/id/OIP.eX3eQb4MNta3XDCi_6DoKQHaGS?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      price_inr: 1530,
      color_recommendation: "silver plated to soften features",
    },
    {
      type: "earrings",
      name: " -Chimes Gold-Toned Drop Earrings (Distacart alt)",
      url: "https://th.bing.com/th/id/OIP.mXCv5ziRyuNJ7hyOV4yfYgHaJ3?r=0&w=600&h=799&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      price_inr: 1400,
      color_recommendation: "gold-tone for warmth",
    },

    {
      type: "necklace",
      name: "Simple Gold-Toned Chain Necklace",
      url: "https://i.pinimg.com/originals/49/36/05/49360534fae279e290d81c7b32e56da5.jpg",
      price_inr: 799,
      color_recommendation: "gold to add vertical balance",
    },
    {
      type: "necklace",
      name: "Yellow Chimes Pendant Necklace",
      url: "https://2ddd0fbb7257d31ec55a-36c96542b2a941bbd3ac3e69ed2bff80.ssl.cf2.rackcdn.com/product-original-265456-35427-1384892275-b618579cc8fcd968aa26ad92b20e8169.JPG",
      price_inr: 899,
      color_recommendation: "gold with subtle red crystals",
    },
    {
      type: "necklace",
      name: "Silver Chimes Pendant",
      url: "https://images-na.ssl-images-amazon.com/images/I/91je7U6MkHL.SL1500.jpg",
      price_inr: 1199,
      color_recommendation: "gold + blue for olive pop",
    },
    {
      type: "necklace",
      name: "Yellow Chimes Gold-Toned Layered Necklace",
      url: "https://images-na.ssl-images-amazon.com/images/I/61pFHPDEdaL.SL1500.jpg",
      price_inr: 999,
      color_recommendation: "layered gold for balance",
    },

    {
      type: "sandals",
      name: "Tokyo Talkies Silver Grey Sandeles",
      url: "https://www.craftysandals.com/wp-content/uploads/2017/08/Pictures-of-Silver-Strappy-Sandals.jpg",
      price_inr: 1017,
      color_recommendation: "Sandles for soft face edges",
    },

    {
      type: "sandals",
      name: "Silver with Gradient Sunglasses P253BR1F",
      url: "https://th.bing.com/th/id/OIP.crGznJZWi3pPaTLBQffNhQHaLz?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      price_inr: 1499,
      color_recommendation: "gradient Silver for chic look",
    },
    {
      type: "sandals",
      name: "Women Sunglasses P263BR2",
      url: "https://cdn.shopify.com/s/files/1/0293/9277/files/08-29-23Studio8_CB_LW_13-15-31_38_RADIANCE_Gold_11320_PXF.jpg?v=1693607902&width=614&height=921&crop=center",
      price_inr: 1399,
      color_recommendation: "Golden to match olive skin",
    },
    {
      type: "sandals",
      name: "Women FT Girl Golden Sunglasses",
      url: "https://th.bing.com/th/id/OIP.z6175Braal6mSAR-b9qCEQHaIX?r=0&w=1062&h=1200&rs=1&pid=ImgDetMain&cb=idpwebpc2",
      price_inr: 664,
      color_recommendation: "Soft Golden sandel",
    },

    {
      type: "handbag",
      name: "White Chimes Mini Sling Bag",
      url: "https://i.pinimg.com/originals/64/d3/53/64d3531c5e1cdf9c3fa6a79b1a74f19c.jpg",
      price_inr: 999,
      color_recommendation: "gold accent mini bag",
    },
    {
      type: "handbag",
      name: "White Chimes Nude Handheld Bag",
      url: "https://5.imimg.com/data5/SELLER/Default/2022/11/GM/YR/WL/134066184/450gm-white-hand-bag-1000x1000.jpg",
      price_inr: 1999,
      color_recommendation: "neutral to complement olive tone",
    },
    {
      type: "handbag",
      name: "White Quilted Shoulder Bag",
      url: "https://thumbs.dreamstime.com/b/white-handbag-17767967.jpg",
      price_inr: 1299,
      color_recommendation: "earthy tone for balance",
    },

    {
      type: "handbag",
      name: "White Chimes Golden Mini Sling Bag",
      url: "https://i.etsystatic.com/10962348/r/il/0bcd0b/1640018022/il_570xN.1640018022_a7wg.jpg",
      price_inr: 899,
      color_recommendation: "pastel gold for soft femininity",
    },
  ],
};

export const creatingAccessoriesCollection = async () => {
  const exists = await OutfitSuggestion.findOne({category: "accessories"});
  if (!exists) {
    try {
      await OutfitSuggestion.create(data);
    } catch (error) {
      console.log("Error creating Dress suggestion: ", error);
    }

    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};
