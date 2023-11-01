import CircularProgress from "./animations/CircularProgress";
import { motion, useMotionValue} from "framer-motion"

export default function ConfirmationPage() {
  const progress = useMotionValue(90)
  return (
    <div className="confirmation-container">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 100 }}
        style={{ x: progress }}
        transition={{ duration: 1 }}
      />
      <CircularProgress progress={progress} />
      <h2>Complaint Submitted Successfully!</h2>
      <p>
        Thank you for submitting your complaint. Our team will review it
        shortly.
      </p>
    </div>
  );
}
