import mongoose, {Schema} from "mongoose";

const bottomSchema = new Schema({
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
  availability: String
});

const bottomsSuggestionSchema = new Schema({
  category: String,
  profile: {
    skin_tone: String,
    body_shape: String,
    face_shape: String
  },
  bottoms: [bottomSchema]
});

export const BottomsSuggestion = mongoose.model("BottomsSuggestion", bottomsSuggestionSchema);

const data = {
  category: "bottoms",
  profile: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square"
  },
  bottoms: [
    {
      kit_number: 1,
      recommended_color: "Camel",
      product_name: "",
      url: "https://i.pinimg.com/originals/e1/ef/ae/e1efaeee35955566c10185d5d098d5fd.jpg",
      color: "Camel",
      description: "High-waist wide-leg trousers to add lower-body volume",
      fit: "Wide-leg, balances inverted triangle shape"
    },
    {
      kit_number: 2,
      recommended_color: "Camel",
      product_name: "H&M Camel Wide-Leg Trousers",
      url: "https://tse1.mm.bing.net/th/id/OIP.SOhLE6W12Wnoh4MLtQvI7gAAAA",
      color: "Camel",
      description: "High-rise twill wide-leg trousers to enhance lower-body volume",
      fit: "Wide-leg, balances inverted triangle silhouette"
    },
    {
      kit_number: 3,
      recommended_color: "Emerald",
      product_name: "Lyush Women Emerald Front Dart Palazzo Pants",
      url: "https://i5.walmartimages.com/asr/255f025a-30c3-48b2-a50c-b1a1cf3dcbba.69b09472b8bfa78e22a03cc1ad0b4e99.jpeg",
      color: "Emerald",
      description: "Front-dart palazzo trousers in emerald canton-knit fabric to add volume below the waist",
      fit: "Wide-leg palazzos offer balance for inverted triangle shape",
      price_usd: 11.35,
      currency: "USD",
      availability: "In stock"
    },
    {
      kit_number: 4,
      recommended_color: "Coral",
      product_name: "BAMBOO BREEZE Printed Wide-Leg Palazzos",
      url: "https://th.bing.com/th/id/R.c5ce0e14ff972ef2563d446cd625345f",
      color: "Coral",
      description: "Wide-leg printed palazzos add volume below waist",
      fit: "High-rise, wide-leg for balance with inverted-triangle shape",
      price_inr: 1289,
      currency: "INR",
      availability: "In stock"
    }
  ]
};

export const creatingLowerCollection = async () => {
  const exists = await BottomsSuggestion.findOne({category: "bottoms"});
  if (!exists) {
    try {
        await BottomsSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Dress suggestion: ", error)
    }
  
    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};