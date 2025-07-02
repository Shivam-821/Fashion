import mongoose, {Schema} from "mongoose";

const dressSchema = new Schema({
  kit_number: Number,
  recommended_color: String,
  product_name: String,
  url: String,
  color: String,
  description: String,
  fit: String,
  price_usd: Number,
  price_inr: Number,
  currency: String,
  availability: String,
});

const dressSuggestionSchema = new Schema({
  category: String,
  profile: {
    skin_tone: String,
    body_shape: String,
    face_shape: String,
  },
  dresses: [dressSchema],
});

const DressSuggestion = mongoose.model(
  "DressSuggestion",
  dressSuggestionSchema
);

const data = {
  category: "dresses",
  profile: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square",
  },
  dresses: [
    {
      kit_number: 1,
      recommended_color: "Rust",
      product_name: "",
      url: "https://i.pinimg.com/736x/9d/35/05/9d3505e3fe161cc50a4295d51b1f2494.jpg",
      color: "Rust",
      description: "Fit-and-flare midi dress with flutter sleeves",
      fit: "Defined waist with flared skirt",
    },
    {
      kit_number: 2,
      recommended_color: "Rust",
      product_name: "Empire-Waist Rust Midi Dress",
      url: "https://tse4.mm.bing.net/th/id/OIP.0dFWyM1vvmfTKrX-LELUdgHaKu?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      color: "Rust",
      description:
        "Empire-waist midi dress defines waist and softens shoulder line",
      fit: "Flared skirt balances proportions",
    },
    {
      kit_number: 3,
      recommended_color: "Emerald",
      product_name: "Emerald Green Fit And Flare Dress",
      url: "https://rukminim2.flixcart.com/image/612/612/l3rmzrk0/dress/i/z/g/m-black-bodycon-square-neck-midi-knee-length-puff-sleeve-party-original-imagetg4j2n8bsdz.jpeg?q=70",
      description:
        "Precision-tailored rayon-spandex blend with V-neck and fit-and-flare silhouette, fully lined and wrinkle-resistant",
      fit: "Defines the waist and adds balanced lower-body volume for your silhouette",
      price_usd: 79.0,
      currency: "USD",
      availability: "In stock",
    },
    {
      kit_number: 4,
      recommended_color: "Coral",
      product_name: "LEIA Women Fit and Flare Dress",
      url: "https://foreverpretty.co.in/wp-content/uploads/2021/12/63b87ba0-f78a-4034-9c5a-0f491f3b2b51.jpg",
      color: "Coral",
      description: "Fit-and-flare dress with defined waist and flared skirt",
      fit: "Creates lower-body volume to balance shoulders",
      price_inr: 507.5,
      currency: "INR",
      availability: "In stock",
    },
  ],
};

export const creatingDressCollection = async () => {
  const exists = await DressSuggestion.findOne({category: "dresses"});
  if (!exists) {
    try {
        await DressSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Dress suggestion: ", error)
    }
  
    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};