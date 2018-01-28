interface cfontsOptions {
  font?: string;
  align?: string;
  colors?: Array<string>;
  background?: string;
  letterSpacing?: number;
  lineHeight?: number;
  space?: boolean;
  maxLength?: string;
}

declare module 'cfonts' {
  export function say (text: string, textOptions: cfontsOptions) : void
}