import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, User } from "lucide-react";
import { UserInitialsAvatar } from "@/components/ui/user-initials-avatar";
import { storefrontCard, storefrontOutlineBtn, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

const actionButtonClass = cn(storefrontOutlineBtn, "rounded-none");

const ProfileOverview = ({
  name,
  email,
  onEditProfileClick,
  onChangePasswordClick,
}: {
  name?: string;
  email?: string;
  onEditProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}) => {
  return (
    <div className={cn(storefrontContainer, "mb-8")}>
      <div className={cn(storefrontCard, "mb-6 p-8 md:p-10")}>
        <div className="mb-6 flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-brand-forest" aria-hidden />
          <h2 className="font-serif text-xl font-semibold text-foreground">Profile Overview</h2>
        </div>

        <div className="mb-6 flex flex-col items-center gap-6 md:flex-row md:items-center">
          <UserInitialsAvatar name={name} email={email} size="xl" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-2 text-2xl font-bold text-foreground">{name}</h1>
            <p className="mb-4 text-foreground/55">{email}</p>
            <div className="hidden gap-3 sm:inline-flex">
              <Button
                variant="outline"
                className={actionButtonClass}
                onClick={onEditProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                variant="outline"
                className={actionButtonClass}
                onClick={onChangePasswordClick}
              >
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:hidden">
          <Button variant="outline" className={actionButtonClass} onClick={onEditProfileClick}>
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button variant="outline" className={actionButtonClass} onClick={onChangePasswordClick}>
            <Lock className="mr-2 h-4 w-4" />
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
