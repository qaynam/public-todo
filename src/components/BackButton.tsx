import { useNavigate } from "@solidjs/router";
import { LeftArrowIcon } from "./icons/LeftArrowIcon";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div class="mb-4">
      <button class="btn-dark-outline" onClick={() => navigate(-1, {
        replace: true
      })}>
        <LeftArrowIcon />
      </button>
    </div>
  );
}
