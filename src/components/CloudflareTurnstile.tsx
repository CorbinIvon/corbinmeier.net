import React from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  options?: {
    size?: "normal" | "compact" | "invisible";
    theme?: "light" | "dark" | "auto";
  };
}

export const CloudflareTurnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  options = { theme: "dark", size: "invisible" },
}) => (
  <Turnstile
    siteKey={siteKey}
    onSuccess={onVerify}
    onError={onError}
    onExpire={onExpire}
    options={options}
  />
);

