import { verification } from "@/constants/verification";
import { IVerificationType } from "@/types";
import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema<IVerificationType>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    verificationType: {
      type: String,
      enum: verification,
      default: "email",
      required: true,
    },
    verificationCode: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true },
);
// for auto delete from database
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationModel =
  (mongoose.models.Verification as mongoose.Model<IVerificationType>) ||
  mongoose.model("Verification", verificationSchema);

export default VerificationModel;
