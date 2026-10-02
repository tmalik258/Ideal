"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import { storefrontCard, storefrontInput, storefrontContainer } from "@/lib/storefront/surface";
import { cn } from "@/lib/utils";

interface ProfileInfoCardProps {
  displayProfile?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export const ProfileInfoCard = ({ displayProfile }: ProfileInfoCardProps) => {
  return (
    <div className={cn(storefrontContainer, "space-y-8 pb-12")}>
      <Card className={storefrontCard}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-foreground">
            <User className="h-6 w-6 text-brand-forest" aria-hidden />
            Profile Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Full Name</Label>
              <Input
                type="text"
                value={displayProfile?.name || ""}
                readOnly
                disabled
                className={cn(storefrontInput, "opacity-80")}
                placeholder="Not provided"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Email</Label>
              <Input
                type="email"
                value={displayProfile?.email || ""}
                readOnly
                disabled
                className={cn(storefrontInput, "opacity-80")}
                placeholder="Not provided"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
