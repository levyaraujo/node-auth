import { UserProfileController } from "../application/controllers/UserProfileController";
import { UserProfileUseCase } from "../application/useCases/UserProfileUseCase";

export function makeUserProfileController() {
  const userProfileUseCase = new UserProfileUseCase();
  return new UserProfileController(userProfileUseCase);
}
