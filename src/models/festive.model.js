import mongoose, {Schema} from "mongoose";

const festiveDressSchema = new Schema({
  kit_number: Number,
  recommended_color: String,
  product_name: String,
  url: String,
  color: String,
  description: String,
  fit: String,
  price_inr: Number,
  currency: String,
  availability: String,
});

const festiveSuggestionSchema = new Schema({
  category: String,
  profile: {
    skin_tone: String,
    body_shape: String,
    face_shape: String,
  },
  festival: String,
  theme: String,
  dresses: [festiveDressSchema],
});

export const FestiveSuggestion = mongoose.model(
  "FestiveSuggestion",
  festiveSuggestionSchema
);

const data = {
  category: "festive_traditional_muharram",
  profile: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square",
  },
  festival: "Muharram",
  theme: "Modest, respectful, elegant traditional wear",
  dresses: [
    {
      kit_number: 1,
      recommended_color: "Black",
      product_name: "W Women Black Solid Anarkali Kurta Set",
      url: "https://i.pinimg.com/originals/13/d5/30/13d530095541659df2b3c12803d08bd8.jpg",
      color: "Black",
      description:
        "Full-length anarkali with churidar and dupatta, solid black, no heavy embroidery",
      fit: "Modest, flared silhouette to balance broader upper body",
      price_inr: 3199,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 2,
      recommended_color: "Deep Green",
      product_name: "Biba Deep Green Embroidered Kurta with Sharara & Dupatta",
      url: "https://tse3.mm.bing.net/th/id/OIP.o81YHCMZrLImqeP0094o7wHaLH?r=0&w=1066&h=1600&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Deep Green",
      description:
        "Elegant green kurta with minimal gold embroidery, paired with sharara and chiffon dupatta",
      fit: "Straight kurta, loose sharara balances shape",
      price_inr: 4599,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 3,
      recommended_color: "Maroon",
      product_name: "Libas Maroon Chikankari Straight Kurta Set",
      url: "https://tse1.explicit.bing.net/th/id/OIP.FKsGIyuEtwdwMFShK5TosAHaKX?r=0&w=740&h=1036&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Maroon",
      description:
        "Chikankari embroidered kurta in maroon with palazzo and dupatta",
      fit: "Straight-cut with wide palazzo adds lower-body flow",
      price_inr: 1749,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 4,
      recommended_color: "Navy Blue",
      product_name: "Aurelia Navy Straight Kurta with Palazzo & Dupatta",
      url: "https://tse3.mm.bing.net/th/id/OIP.xSAEaYLF5V6-mY283A-QCgHaK5?r=0&w=700&h=1030&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Navy Blue",
      description:
        "Minimalist embroidered navy kurta set with soft chiffon dupatta",
      fit: "Straight kurta with palazzos provides balance and elegance",
      price_inr: 2599,
      currency: "INR",
      availability: "In stock",
    },
  ],
};

export const creatingFestiveCollection = async () => {
  const exists = await FestiveSuggestion.findOne({category: "festive_traditional_muharram"});
  if (!exists) {
    try {
        await FestiveSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Festive suggestion :: ERROR :: ", error)
    }
  
    console.log("Festive Muharram dresses inserted successfully");
  } else {
    return;
  }
};

