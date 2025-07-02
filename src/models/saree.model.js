import mongoose, {Schema} from "mongoose";

const sareeSchema = new Schema({
  id: String,
  product_name: String,
  image_url: String,
  color: String,
  price: Number,
  currency: String,
  availability: String,
  fabric: String,
  description: String,
  fit_notes: String,
});

const sareeSuggestionSchema = new Schema({
  category: String,
  profile_target: {
    skin_tone: String,
    body_shape: String,
    face_shape: String,
  },
  products: [sareeSchema],
});

const SareeSuggestion = mongoose.model(
  "SareeSuggestion",
  sareeSuggestionSchema
);

const data = {
  category: "sarees",
  profile_target: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square",
  },
  products: [
    {
      id: "SR001",
      product_name: "Noor Black Elegance Poly Silk Saree",
      image_url:
        "https://tse1.mm.bing.net/th/id/OIP.IJfjX8DdNtnOqjJe_DCtdAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Black",
      price: 1099,
      currency: "INR",
      availability: "In stock",
      fabric: "Poly Silk",
      description:
        "Modest poly silk saree with subtle shine, ideal for Muharram gatherings",
      fit_notes: "Classic Nivi drape softens shoulders and defines flow",
    },
    {
      id: "SR002",
      product_name: "Zayra Charcoal Linen Saree",
      image_url: "https://wallpapercave.com/wp/wp7811205.jpg",
      color: "Charcoal Grey",
      price: 1598,
      currency: "INR",
      availability: "In stock",
      fabric: "Linen Blend",
      description:
        "Charcoal-toned saree with minimal zari border, refined and graceful",
      fit_notes: "Crisp fabric reduces upper-body width visually",
    },
    {
      id: "SR003",
      product_name: "Inaya Maroon Mul Cotton Saree",
      image_url:
        "https://tse2.mm.bing.net/th/id/OIP.jvWxakiIqIyKBBRc-HT_UwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Maroon",
      price: 1850,
      currency: "INR",
      availability: "In stock",
      fabric: "Mul Cotton",
      description:
        "Soft and breathable saree with minimal design, ideal for quiet occasions",
      fit_notes: "Lightweight drape adds volume below the waist",
    },
    {
      id: "SR004",
      product_name: "Meher Dark Green Art Silk Saree",
      image_url:
        "https://tse1.mm.bing.net/th/id/OIP.iaKEaL1xN4UFfwNPTxqz3gHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Dark Green",
      price: 1249,
      currency: "INR",
      availability: "In stock",
      fabric: "Art Silk",
      description:
        "Woven dark green art silk with fine gold border, elegant and respectful",
      fit_notes: "Drapes easily and enhances lower-body focus",
    },
  ],
};

export const creatingSareeCollection = async () => {
  const exists = await SareeSuggestion.findOne({category: "sarees"});
  if (!exists) {
    try {
        await SareeSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Dress suggestion: ", error)
    }
  
    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};
