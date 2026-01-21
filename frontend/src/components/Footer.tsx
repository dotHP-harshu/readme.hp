import {  MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate()
  return (
    <div className="bg-surface-primary-light dark:bg-surface-primary-dark flex justify-between items-center px-20 max-xs:px-6 py-2 border-t-2 border-border-light dark:border-t-border-dark max-sm:flex-col gap-4">
      <div onClick={()=>navigate("/")} className="text-xl flex justify-center items-center gap-0.5 cursor-pointer select-none">
        <span className="font-code">readme</span>
        <span className="inline-block w-2 h-2 bg-primary rounded-full self-baseline-last -translate-y-1/2"></span>
        <span className="font-extrabold font-sans italic">hp</span>
      </div>
      <div>
        <p className="text-center text-text-muted-light dark:text-text-muted-dark text-xs">
          Build with ❤️ by dotHP
        </p>
      </div>
     <div className="select-none w-fit h-fit ">
          <button
            onClick={()=>navigate("/contact")}
            className="flex justify-center items-center gap-2 border-2 border-border-light dark:border-border-dark px-4 py-1 rounded-lg hover:bg-surface-secondary-hover-light dark:hover:bg-surface-secondary-hover-dark transition-colors duration-300 outline-none cursor-pointer
        "
          >
            <span>
              <MessageCircleHeart className="" size={16} />
            </span>
            <span className="text-sm font-semibold">Feedback</span>
          </button>
        </div>
    </div>
  );
}

export default Footer;
