"use client";

import { User, Phone, Mail, Send, CheckCircle } from "lucide-react";

interface FormIconProps {
  type: "user" | "phone" | "email" | "send" | "success";
  className?: string;
  size?: number;
}

/**
 * Component to render consistent icons in forms
 */
export default function FormIcon({
  type,
  className = "",
  size = 20,
}: FormIconProps) {
  const iconClass = `${className}`;

  switch (type) {
    case "user":
      return <User size={size} className={iconClass} />;
    case "phone":
      return <Phone size={size} className={iconClass} />;
    case "email":
      return <Mail size={size} className={iconClass} />;
    case "send":
      return <Send size={size} className={iconClass} />;
    case "success":
      return <CheckCircle size={size} className={iconClass} />;
    default:
      return null;
  }
}
