import mongoose, {Schema} from "mongoose";

const kurtiSchema = new Schema({
  kit_number: Number,
  recommended_color: String,
  product_name: String,
  url: String,
  description: String,
  fit: String,
  price_inr: Number,
  currency: String,
  availability: String,
  color: String,
});

const kurtiSuggestionSchema = new Schema({
  category: String,
  profile: {
    skin_tone: String,
    body_shape: String,
    face_shape: String,
  },
  theme: String,
  kurtis: [kurtiSchema],
});

const KurtiSuggestion = mongoose.model(
  "KurtiSuggestion",
  kurtiSuggestionSchema
);

const data = {
  category: "kurti",
  profile: {
    skin_tone: "Olive",
    body_shape: "Inverted Triangle",
    face_shape: "Square",
  },
  theme: "Modest, comfortable, and culturally respectful kurtis",
  kurtis: [
    {
      kit_number: 1,
      recommended_color: "Black",
      product_name: "Libas Women Black Embroidered Straight Kurti",
      url: "https://tse2.mm.bing.net/th/id/OIP.oaLfI2hAmIu_XAr57x5vwAHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      description:
        "Straight-cut black kurti with subtle thread embroidery and 3/4th sleeves",
      fit: "Straight, balances wider shoulders with minimal flare",
      price_inr: 1149,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 2,
      recommended_color: "Navy Blue",
      product_name: "W Navy Blue Printed A-Line Kurti",
      url: "https://tse1.mm.bing.net/th/id/OIP.GzqDHX5YVP0RgbR_SjI7kwHaLH?r=0&w=510&h=765&rs=1&pid=ImgDetMain&o=7&rm=3",
      description:
        "Printed A-line kurti with side slits and modest round neckline",
      fit: "A-line adds volume to lower body, balancing upper body",
      price_inr: 1999,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 3,
      recommended_color: "Olive Green",
      product_name: "Aurelia Olive Ethnic Motif Straight Kurti",
      url: "https://tse2.mm.bing.net/th/id/OIP.VQPvHj6oi3H81Qaj64J1nAAAAA?r=0&w=474&h=711&rs=1&pid=ImgDetMain&o=7&rm=3",
      description: "Minimal ethnic print, elbow sleeves, elegant neckline",
      fit: "Straight cut with a slightly longer hem for modesty",
      price_inr: 799,
      currency: "INR",
      availability: "In stock",
    },
    {
      kit_number: 4,
      recommended_color: "Charcoal",
      product_name: "Soch Charcoal Grey Cotton Kurti with Embroidered Neck",
      url: "https://th.bing.com/th/id/R.406905663f789bb0a75376a3ee1f815d?rik=t4dEEMPJK3NZug&riu=http%3a%2f%2fwww.mariab.pk%2fcdn%2fshop%2fproducts%2fmps-1208-b.jpg%3fv%3d1672332896&ehk=OXWQUoqlODSduXZ0%2b8wum1RJwVzNKRNlJPwTmo3ZJQQ%3d&risl=&pid=ImgRaw&r=0",
      color: "Charcoal Grey",
      description:
        "Plain body with beautifully embroidered yoke, ideal for muted elegance during Muharram",
      fit: "Relaxed straight silhouette",
      price_inr: 1298,
      currency: "INR",
      availability: "In stock",
    },
  ],
};

export const creatingKurtiCollection = async () => {
  const exists = await KurtiSuggestion.findOne({category: "kurti"});
  if (!exists) {
    try {
        await KurtiSuggestion.create(data);
    } catch (error) {
        console.log("Error creating Dress suggestion: ", error)
    }
  
    console.log("Festive Sugesstion added successfully");
  } else {
    return;
  }
};