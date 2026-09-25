import { SVGProps } from "react";

declare type IClassName = { className?: string };

export interface IconSvgProps extends SVGProps<SVGSVGElement>, IClassName {}

export * from "./user";
export * from "./otpVerification";
export * from "./chat";
export * from "./message";
