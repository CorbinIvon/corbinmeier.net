import React from "react";
import { Turnstile } from "@marsidev/react-turnstile";

export interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

export const CloudflareTurnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onVerify,
}) => <Turnstile siteKey={siteKey} onSuccess={onVerify} />;
