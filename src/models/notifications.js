import mongoose, { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Referencia al remitente
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Referencia al destinatario
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default models.Notifications ||
  model("Notifications", NotificationSchema);
