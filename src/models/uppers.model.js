import mongoose, {Schema} from "mongoose";

const topSchema = new Schema({
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

const topsSuggestionSchema = new Schema({
  category: String,
  profile: {
    skin_tone: String,
    body_shape: String,
    face_shape: String,
  },
  tops: [topSchema],
});

const TopsSuggestion = mongoose.model("TopsSuggestion", topsSuggestionSchema);

const data = {
  category: "tops",
  profile: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square",
  },
  tops: [
    {
      kit_number: 1,
      recommended_color: "Teal",
      product_name: "",
      url: "https://i.etsystatic.com/19162967/r/il/eef68d/2264975832/il_fullxfull.2264975832_i8tl.jpg",
      color: "Teal",
      description:
        "V-neck top with flutter sleeves to soften shoulders and jawline",
      fit: "Flowy and waist-defining",
    },
    {
      kit_number: 2,
      recommended_color: "Rust",
      product_name: "Kotty Rust Square-Neck Peplum Top",
      url: "https://m.media-amazon.com/images/I/71b2oh3XbrL.SY879.jpg",
      color: "Rust",
      description:
        "Square-neck peplum top to soften shoulders and square jawline",
      fit: "Peplum style adds waist definition",
    },
    {
      kit_number: 3,
      recommended_color: "Emerald",
      product_name: "Lyush Women Emerald Rib Front Wrap Top",
      url: "https://imgix.bustle.com/uploads/image/2019/6/14/de5372ea-8790-476b-949d-c11a3434fa52-3991020914_2_5_1.jpg",
      color: "Emerald",
      description:
        "Ribbed front-wrap top in emerald with deep V-neck to soften shoulders and jawline",
      fit: "Slim wrap style enhances mid-section and balances square face",
      price_usd: 8.46,
      currency: "USD",
      availability: "In stock",
    },
    {
      kit_number: 4,
      recommended_color: "Coral",
      product_name: "LEIA Women V-Neck Fitted Top",
      url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1688364498_9082591.jpg",
      color: "Coral",
      description: "V-neck fitted top softens shoulders and square jawline",
      fit: "Semi-fitted, feminine silhouette",
      price_inr: 584,
      currency: "INR",
      availability: "In stock",
    },
  ],
};

export const creatingTopCollection = async () => {
  const exists = await TopsSuggestion.findOne({category: "tops"});
  if (!exists) {
    try {
        await TopsSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Dress suggestion: ", error)
    }
  
    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};